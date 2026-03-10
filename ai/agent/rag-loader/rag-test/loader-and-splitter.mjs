import 'dotenv/config';
import "cheerio"; // 在后端，使用css选择器，像操作前端一样查找DOM节点
import { CheerioWebBaseLoader } from
    "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

const model = new ChatOpenAI({
    modelName: process.env.OPENAI_API_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    temperature: 0,
});

const embeddings = new OpenAIEmbeddings({
    modelName: process.env.EMBEDDING_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
});

const cheerioLoader = new CheerioWebBaseLoader(
    "https://juejin.cn/post/7233327509919547452?searchId=20260302193603120AE3328025B138C1FB",
    {
        selector: '.main-area p'
    }
)

const documents = await cheerioLoader.load();
console.log(documents);

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400, // 每个分块的字符数
    chunkOverlap: 50, // 分块之间的重叠字符数
    seperators: ['。', '，', '！', '？'] // 分割符，优先使用段落分割
})

const splitDocuments = await textSplitter.splitDocuments(documents);
console.log(splitDocuments);
console.log(`文档分割完成，共 ${splitDocuments.length} 个片段`)

console.log("正在创建向量存储...");
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocuments, embeddings);

const retriever = await vectorStore.asRetriever({ k: 2 });

const questions = ["父亲的去世对作者的人生态度产生了怎样的根本性逆转？"];

for (const question of questions) {
    console.log("=".repeat(80));
    console.log(`[问题]: ${question}`);
    console.log("=".repeat(80));

    const retrievedDocs = await retriever.invoke(question);
    const scoreResults = await vectorStore.similaritySearchWithScore(question, 2);

    console.log("\n [检索到的相关文档及相识度评分]");
    retrievedDocs.forEach((doc, i) => {
        const scoreResult = scoreResults.find(([scoreDoc]) => scoreDoc.pageContent === doc.pageContent);
        const score = scoreResult ? scoreResult[1] : null;
        const similarity = score ? (1 - score).toFixed(2) : "N/A";

        console.log(`\n 文档 ${i+1} 相似度: ${similarity}`);
        console.log(`内容: ${doc.pageContent}`);
        if(doc.metadata && Object.keys(doc.metadata).length > 0) {
            console.log(`元数据: ${JSON.stringify(doc.metadata)}`);
        }
    });

    const content = retrievedDocs
        .map((doc, i) => `[片段${i+1}]\n ${doc.pageContent}`)
        .join('\n\n---\n\n');

    const prompt = `
        你是一个文章辅助阅读助手，根据文章内容来解答：
        文章内容:
        ${content}

        问题:
        ${question}

        回答:
    `
    console.log('\n [AI 回答]');
    const response = await model.invoke(prompt);
    console.log(response.content);
}