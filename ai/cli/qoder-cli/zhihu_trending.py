import requests
import json
from typing import List, Dict, Optional
from bs4 import BeautifulSoup


def get_zhihu_trending() -> Optional[List[Dict[str, str]]]:
    """
    Fetch the top 10 trending questions from Zhihu
    Returns a list of dictionaries containing title and URL of trending items
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
    }
    
    try:
        # Try to get trending data from web scraping as API requires authentication
        url = "https://www.zhihu.com/hot"
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML to extract trending items
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for trending items in the page
        trending_items = []
        
        # Try multiple selectors to find trending items
        hot_list_items = soup.find_all('div', {'class': 'HotItem'}, limit=10)
        
        if not hot_list_items:
            # Alternative selector for trending items
            hot_list_items = soup.find_all('a', href=True, limit=20)
            # Filter for question links
            hot_list_items = [item for item in hot_list_items if '/question' in item.get('href', '')][:10]
        
        for i, item in enumerate(hot_list_items[:10]):
            try:
                # Try to find the title in different possible locations
                title_elem = (item.find('h2') or 
                             item.find('div', {'class': 'HotItem-title'}) or 
                             item.find('span') or 
                             item.find('p') or 
                             item)
                
                if title_elem:
                    # Get text content, prioritizing the most specific title elements
                    title = title_elem.get_text(strip=True)
                    
                    # Clean up the title if needed
                    if title:
                        # Ensure we have a proper URL
                        href = item.get('href', '')
                        if href.startswith('//'):
                            href = 'https:' + href
                        elif href.startswith('/'):
                            href = 'https://www.zhihu.com' + href
                        elif not href.startswith('http'):
                            href = f"https://www.zhihu.com/question/{href.split('/')[-1]}"
                        
                        trending_items.append({
                            'rank': i + 1,
                            'title': title,
                            'url': href
                        })
            except Exception:
                continue  # Skip items that can't be parsed
        
        # If web scraping doesn't work, try an alternative API endpoint
        if len(trending_items) < 3:
            return get_zhihu_trending_alternative_api()
        
        return trending_items
    
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return get_zhihu_trending_alternative_api()
    except Exception as e:
        print(f"Unexpected error: {e}")
        return get_zhihu_trending_alternative_api()


def get_zhihu_trending_alternative_api() -> Optional[List[Dict[str, str]]]:
    """
    Alternative method to get trending items using a different endpoint
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.zhihu.com/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
    
    try:
        # Alternative API endpoint that might be more accessible
        url = "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=20&offset=0"
        response = requests.get(url, headers=headers)
        
        # Some Zhihu API endpoints return data without authentication but with limited info
        if response.status_code == 200:
            data = response.json()
            
            trending_items = []
            for i, item in enumerate(data.get('data', [])[:10]):
                target = item.get('target', {})
                title = target.get('title', 'No Title')
                
                trending_items.append({
                    'rank': i + 1,
                    'title': title,
                    'url': target.get('url', f"https://www.zhihu.com/question/{target.get('id', '')}")
                })
            
            return trending_items
        else:
            # If API still requires auth, return an empty list to trigger web scraping
            return []
    
    except Exception as e:
        print(f"Alternative API error: {e}")
        return []


def print_trending(trending_items: List[Dict[str, str]]) -> None:
    """
    Print the trending items in a formatted way
    """
    if not trending_items:
        print("No trending items found.")
        return
    
    print("=" * 60)
    print("知乎热榜 Top 10")
    print("=" * 60)
    
    for item in trending_items:
        print(f"{item['rank']:2d}. {item['title']}")
        print(f"    链接: {item['url']}")
        print()


def main():
    """
    Main function to run the Zhihu trending crawler
    """
    print("正在获取知乎热榜...")
    trending_items = get_zhihu_trending()
    
    if trending_items:
        print_trending(trending_items)
    else:
        print("获取知乎热榜失败，请检查网络连接或稍后重试。")


if __name__ == "__main__":
    main()