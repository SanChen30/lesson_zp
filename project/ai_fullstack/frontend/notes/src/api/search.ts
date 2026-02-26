import instance from './config';

export const doSearch = (keyword: string) => {
    return instance.get(`/search?keyword=${keyword}`);
}