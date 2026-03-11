import {
    MilvusClient,
    DataType,
    IndexType,
    MetricType
} from '@zilliz/milvus2-sdk-node'
import 'dotenv/config'
import {
    OpenAIEmbeddings
} from '@langchain/openai'

const VECTOR_DIM = 1024;
const COLLECTION_NAME = 'ai_diary';

const TOKEN = process.env.MILVUS_TOKEN;
const ADDRESS = process.env.MILVUS_ADDRESS;

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    dimensions: VECTOR_DIM,
})

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
})
// 嵌入模型，将文本转换为向量的函数封装
async function getEmbeddings(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}

async function main() {
    console.log('正在连接Milvus...');
    const checkHealth = await client.checkHealth();
    if (!checkHealth.isHealthy) {
        console.error('Milvus连接失败:', checkHealth.reasons);
        return;
    }
    console.log('连接成功， 集群状态正常...');

    await client.loadCollection({
        collection_name: COLLECTION_NAME,
    })

    const query = "我想看看关于户外活动的日记";
    const queryVector = await getEmbeddings(query);
    const SearchRes = await client.search({
        collection_name: COLLECTION_NAME,
        vector: queryVector,
        limit: 3,
        metric_type: MetricType.COSINE,
        output_fields: ['id', 'content', 'date', 'mood', 'tags'],
    })

    SearchRes.results.forEach(result => {
        console.log(`\n日记ID: ${result.id}`);
        console.log(`内容: ${result.content}`);
        console.log(`日期: ${result.date}`);
        console.log(`心情: ${result.mood}`);
        console.log(`标签: ${result.tags}`);
    })

    console.log(`\n搜索结果:`);
    console.log(`共找到 ${SearchRes.results.length} 条相关日记`);

    // await client.createCollection({
    //     collection_name: COLLECTION_NAME,
    //     fields: [
    //         { name: 'id', data_type: DataType.VarChar, max_length: 50, is_primary_key: true },
    //         { name: 'vector', data_type: DataType.FloatVector, dim: VECTOR_DIM },
    //         { name: 'content', data_type: DataType.VarChar, max_length: 5000 },
    //         { name: 'date', data_type: DataType.VarChar, max_length: 50 },
    //         { name: 'mood', data_type: DataType.VarChar, max_length: 50 },
    //         {
    //             name: 'tags', data_type: DataType.Array, element_type: DataType.VarChar,
    //             max_capacity: 10, max_length: 50
    //         }
    //     ]
    // })

    // await client.createIndex({
    //     collection_name: COLLECTION_NAME,
    //     field_name: 'vector', // 常用的查询字段
    //     index_type: IndexType.IVF_FLAT, // 索引类型
    //     metric_type: MetricType.COSINE, // 相似度计算方式
    //     params: {
    //         nlist: VECTOR_DIM, // 量化参数
    //     }
    // })


    // console.log('\nInserting diary entries...');
    // const diaryContents = [
    //     {
    //         id: 'diary_001',
    //         content: '今天天气很好，去公园散步了，心情愉快。看到了很多花开了，春天真美好。',
    //         date: '2026-01-10',
    //         mood: 'happy',
    //         tags: ['生活', '散步']
    //     },
    //     {
    //         id: 'diary_002',
    //         content: '今天工作很忙，完成了一个重要的项目里程碑。团队合作很愉快，感觉很有成就感。',
    //         date: '2026-01-11',
    //         mood: 'excited',
    //         tags: ['工作', '成就']
    //     },
    //     {
    //         id: 'diary_003',
    //         content: '周末和朋友去爬山，天气很好，心情也很放松。享受大自然的感觉真好。',
    //         date: '2026-01-12',
    //         mood: 'relaxed',
    //         tags: ['户外', '朋友']
    //     },
    //     {
    //         id: 'diary_004',
    //         content: '今天学习了 Milvus 向量数据库，感觉很有意思。向量搜索技术真的很强大。',
    //         date: '2026-01-12',
    //         mood: 'curious',
    //         tags: ['学习', '技术']
    //     },
    //     {
    //         id: 'diary_005',
    //         content: '晚上做了一顿丰盛的晚餐，尝试了新菜谱。家人都说很好吃，很有成就感。',
    //         date: '2026-01-13',
    //         mood: 'proud',
    //         tags: ['美食', '家庭']
    //     }
    // ];

    // console.log('Generating embeddings...');

    // const diaryData = await Promise.all(
    //     diaryContents.map(async (diary) => ({
    //         ...diary,
    //         vector: await getEmbeddings(diary.content),
    //     }))
    // );
    // const inserRes = await client.insert({
    //     collection_name: COLLECTION_NAME,
    //     data: diaryData,
    // })
    // console.log(`插入成功: ${inserRes.insert_cnt} 条数据`);
}

main();

// async function main() {
//     const client = new MilvusClient({
//         address: process.env.MILVUS_ADDRESS,
//         token: process.env.MILVUS_TOKEN,
//     })
//     console.log('正在连接Milvus...');

//     const checkHealth = await client.checkHealth();
//     if (!checkHealth.isHealthy) {
//         console.error('Milvus 连接失败:', checkHealth.reasons);
//         return;
//     }
//     console.log('Milvus 连接成功');

//     // table = collection
//     const COLLECTION_NAME = 'test';
//     const DIMENSION = 4; // 向量维度

//     // try {
//     //     // 创建集合
//     //     await client.createCollection({
//     //         // 集合名称
//     //         collection_name: COLLECTION_NAME,
//     //         // 向量维度
//     //         dimension: DIMENSION,
//     //         // 自动ID
//     //         auto_id: true,
//     //     })
//     //     console.log(`Collection ${COLLECTION_NAME} 创建成功`);
//     //     // 创建索引
//     //     await client.createIndex({
//     //         collection_name: COLLECTION_NAME,
//     //         field_name: 'vector',
//     //         index_type: IndexType.AUTOINDEX,
//     //         metric_type: MetricType.COSINE,
//     //     })
//     //     console.log(`Index ${COLLECTION_NAME} 创建成功`);
//     // } catch (error) {
//     //     console.error(`出错了:`, error);
//     // }

//     // const data = [
//     //     {
//     //         vector: [0.1, 0.2, 0.3, 0.4],
//     //         content: '这是第一条数据'
//     //     },
//     //     {
//     //         vector: [0.5, 0.6, 0.7, 0.8],
//     //         content: '这是第二条数据'
//     //     },
//     // ];
//     // const insertRes = await client.insert({
//     //     collection_name: COLLECTION_NAME,
//     //     data,
//     // })
//     // console.log(`插入成功: ${data.length} 条数据`);

//     const searchRes = await client.search({
//         collection_name: COLLECTION_NAME,
//         data: [[0.1, 0.3, 0.3, 0.4]],
//         limit: 1,
//         output_fields: ['content'],
//     })
//     console.log(`搜索结果：${JSON.stringify(searchRes, null, 2)}`);

// }
// main();