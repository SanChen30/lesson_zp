import {
    getEncodingNameForModel,
    getEncoding
} from 'js-tiktoken';
// AIGC 生成的文本 要计算 token 数量，按 token 不断推理生成的

// 根据模型名获取该模型使用的分词器名称（如 gpt-4 用 cl100k_base）
const modelName = "gpt-4";
const encodingName = getEncodingNameForModel(modelName);
console.log(encodingName);

// 用编码名创建编码器，后续用它的 encode/decode 做分词。
const enc = getEncoding(encodingName);

// encode() 把字符串转成 token id 数组；.length 即这段文本的 token 数
// 不同语言同一语义可能对应不同 token 数，计费/限长按 token 更准确
console.log("apply", enc.encode("apple"), enc.encode("apple").length);

console.log('pipeapple', enc.encode('pipeapple'), enc.encode('pipeapple').length);

console.log('苹果', enc.encode('苹果'), enc.encode('苹果').length);