import instance from './config';

export const ask = async (question: string) => {
    // add
    const res = await instance.post('/ai/rag', { question });
    return res.answer; 
}
