import 'dotenv/config';
import {
    MilvusClient,
    DataType,
    MetricType,
    IndexType,
} from '@zilliz/milvus2-sdk-node';
import {
    OpenAIEmbeddings
} from '@langchain/openai';

const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;
const COLLECTION_NAME = 'ebook';
const VECTOR_DIMENSION = 1024;

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

async function main() {
    try {
        console.log('Connection to Milvus...');
        await client.connectPromise;
        try {
            await client.loadCollection({
                collection_name: COLLECTION_NAME,
            })
        } catch (error) {
            console.log('Collection already loaded');
        }
        const query = '段誉会什么武功？';
        const queryVector = await getEmbeddings(query);
        const searchResult = await client.search({
            collection_name: COLLECTION_NAME,
            vector: queryVector,
            limit: 3,
            metric_type: MetricType.COSINE,
            output_fields: ['id', 'book_id', 'book_name', 'chapter_num', 'index', 'content']
        })
        searchResult.results.forEach((item, index) => {
            console.log(`\n第 ${index + 1} 个结果: Score: ${item.score.toFixed(2)}`);
            console.log(`ID: ${item.id}`);
            console.log(`Book ID: ${item.book_id}`);
            console.log(`Book Name: ${item.book_name}`);
            console.log(`Chapter Number: ${item.chapter_num}`);
            console.log(`Index: ${item.index}`);
            console.log(`Content: ${item.content}`);
        })
    } catch (error) {
        console.error('Connection to Milvus failed:', error.message);
        throw error;
    }
}

main();