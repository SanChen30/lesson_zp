import fs from 'fs/promises';
import { client } from './app.service.mjs';
import readline from 'readline'; //命令行获取输入

const data = await fs.readFile('./data/posts-embedding.json', 'utf-8');
const posts = JSON.parse(data);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const cosineSimilarity = (v1, v2) => {
  // 计算向量的点积
  const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0);

  // 计算向量的长度
  const lengthV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr * curr, 0));
  const lengthV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr * curr, 0));

  // 计算余弦相似度
  const similarity = dotProduct / (lengthV1 * lengthV2);

  return similarity;
};

const handleInput = async (input) => {
    // console.log(input);
    const response = await client.embeddings.create({
        model: 'text-embedding-ada-002',
        input,
    });
    const { embedding } = response.data[0]; 
    const result = posts.map((post) => ({
        ...post,
        similarity: cosineSimilarity(embedding, post.embedding),
    }))
    // 从小到大排序
    .sort((a, b) => a.similarity - b.similarity)
    .reverse()
    .slice(0,3)
    .map((item, index) => `${index+1}. ${item.title}, ${item.category}`)
    .join('\n');
    console.log(`\n${result}\n`);
    rl.question('\n 请输入要搜索的内容:', handleInput);
}

rl.question('\n 请输入要搜索的内容:', handleInput);