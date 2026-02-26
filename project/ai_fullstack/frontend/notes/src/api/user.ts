import instance from './config';
import type { Credentail } from '@/types/index';

export const deLogin = (data: Credentail) => {
    return instance.post('/auth/login', data);
}

export const getAiAvatar = (name: string) => {
    return instance.get(`/ai/avatar?name=${name}`);
}