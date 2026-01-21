import axios from './config';
import type { Credentail } from '@/types/index';

export const deLogin = (data: Credentail) => {
    return axios.post('./auth/login', data);
}