import instance from './config';

export const fetchCommit = async (diff: string) => {
    const res = await instance.post('/ai/git', {diff})
    console.log(res);
    return res.result;
}