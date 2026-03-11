import 'dotenv/config';
import { parse } from 'path'; // 用来解析文件路径，获取文件名
import {
    MilvusClient,
    DataType,
    MetricType,
    IndexType
} from '@zilliz/milvus2-sdk-node';
import {
    OpenAIEmbeddings
} from '@langchain/openai';
import {
    EPubLoader
} from '@langchain/community/document_loaders/fs/epub';
import {
    RecursiveCharacterTextSplitter
} from '@langchain/textsplitters';

const COLLECTION_NAME = 'ebook';
const VECTOR_DIMENSION = 1024;
const CHUNK_SIZE = 500;
const EPUB_FILE = './天龙八部.epub';

const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;

const BOOK_NAME = parse(EPUB_FILE).name;
console.log(BOOK_NAME); // 天龙八部

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    dimensions: VECTOR_DIMENSION,
})

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
})

async function getEmbeddings(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}

async function ensureBookCollection(bookId) {
    try {
        const hasCollection = await client.hasCollection({
            collection_name: COLLECTION_NAME,
        })

        if (!hasCollection.value) {
            console.log(`${COLLECTION_NAME} 集合不存在，创建集合`);
            await client.createCollection({
                collection_name: COLLECTION_NAME,
                // schema 结构
                fields: [
                    { name: 'id', data_type: DataType.VarChar, max_length: 50, is_primary_key: true }, // 段落ID
                    { name: 'book_id', data_type: DataType.VarChar, max_length: 100 }, // 电子书ID
                    { name: 'book_name', data_type: DataType.VarChar, max_length: 100 }, // 电子书名称
                    { name: 'chapter_num', data_type: DataType.Int32 }, // 章节序号
                    { name: 'index', data_type: DataType.Int32 }, // 章节内的段落序号
                    { name: 'content', data_type: DataType.VarChar, max_length: 10000 }, // 段落内容
                    { name: 'vector', data_type: DataType.FloatVector, dim: VECTOR_DIMENSION }, // 段落向量
                ]
            });
            console.log('集合创建成功');
            await client.createIndex({
                collection_name: COLLECTION_NAME,
                field_name: 'vector',
                index_type: IndexType.IVF_FLAT,
                metric_type: MetricType.COSINE,
                params: {
                    nlist: VECTOR_DIMENSION,
                }
            });
            console.log('索引创建成功');
        }
        try {
            await client.loadCollection({
                collection_name: COLLECTION_NAME,
            })
            console.log('集合加载成功');
        } catch (error) {
            console.log('集合已处于加载状态');
        }
    } catch (error) {
        console.error('创建集合或索引失败:', error.message);
        throw error;
    }
}

async function loadAndProcessEPubStreaming(bookId) {
    try {
        console.log('开始加载 EPUB 文件');
        const loader = new EPubLoader( // epub 文件转 html 文件
            EPUB_FILE,
            {
                splitChapters: true, // 按章节分割
            }
        );
        const documents = await loader.load(); // 加载 epub 文件
        // console.log(documents); // 返回一个数组，每个元素是一个章节/
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: CHUNK_SIZE,
            chunkOverlap: CHUNK_OVERLAP,
            // separator 分隔符
            // 默认会按「段落\n\n → 换行 → 句号」等优先级用默认分隔符去切
        });
        let totalInserted = 0;
        for(let chapterIndex = 0; chapterIndex < documents.length; chapterIndex++) {
            const chapter = documents[chapterIndex];
            const chapterContent = chapter.pageContent;
            console.log(`处理第 ${chapterIndex+ 1}/${documents.length} 章节`);
            const chunks = await textSplitter.splitText(chapterContent);
        }
    } catch (error) {
        console.log('加载 EPUB 文件失败:', error.message);
        throw error;
    }
}

async function main() {
    try {
        console.log('电子书处理');
        console.log('正在连接Milvus');
        await client.connectPromise; // 等待连接成功
        console.log('连接成功');

        const bookId = 1;
        await ensureBookCollection(bookId);
        await loadAndProcessEPubStreaming(bookId);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();