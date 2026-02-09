import Mock from 'mockjs'

const tabs = ["前端","后端","职场","AI","副业","面经","算法"];

const posts = Mock.mock({
    'list|45': [ // list 45条数据
        {
            title: '@ctitle(8, 20)', // 随机生成8-20个字符的标题
            brief: '@ctitle(20, 100)' ,
            totalComments: '@integer(1, 30)',
            totalLikes: '@integer(0, 500)',
            publishedAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
            user: {
                id: '@integer(1, 100)',
                name: '@cname(2, 4)',
                avatar: '@image(300x200)',
            },
            tags: () => Mock.Random.pick(tabs, 2),
            thumbnail: '@image(300x200)',
            pics: [
                '@image(300x200)',
                '@image(300x200)',
                '@image(300x200)',
            ],
            id: '@increment(1)'
        }
    ]
}).list // 导出 list 数组
export default [
    {
        url: '/api/posts',
        method: 'get',
        response: ({ query }, res) => {
            console.log(query); // query 是一个对象，包含了 url 中的查询参数，比如：{ page: '1', limit: '10' }
            const { page = '1', limit = '10' } = query;
            const currentPage = parseInt(page, 10);
            const size = parseInt(limit, 10);

            if(isNaN(currentPage) || isNaN(size) || currentPage < 1 || size < 1) {
                return {
                    code: 400,
                    msg: 'Invalid page or pageSize',
                    data: null
                }
            }

            const total = posts.length; // count
            const start = (currentPage - 1) * size;
            const end = start + size;
            const paginatedData = posts.slice(start, end);

            return {
                code: 200,
                msg: 'success',
                items: paginatedData,
                pagination: {
                    current: currentPage,
                    limit: size,
                    total,
                    totalPage: Math.ceil(total / size)
                }
            }
        }
    }
]