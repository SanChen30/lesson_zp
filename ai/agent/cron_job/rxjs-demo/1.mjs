import {
    from
} from 'rxjs';

// from 方法，将一个数组转换为 Observable 对象
const stream = from([1,2,3]);
stream.subscribe(v => console.log(v));