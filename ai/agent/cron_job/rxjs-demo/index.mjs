// 观察者模式是经典的设计模式
import {
    Observable
} from 'rxjs';

// 创建了一个 Observable 对象
// 参数是一个回调函数，回调函数接收一个观察者对象
// subscriber 观察者对象，next 方法发送数据，complete 方法完成数据流
const stream = new Observable((subscriber) => {
    // 发送数据
    subscriber.next('hello');
    subscriber.next('world');
    // 完成数据流
    subscriber.complete();
})

// 订阅数据流
stream.subscribe((value) => {
    // 观察者函数，value 是数据流中的数据
    console.log(value);
})
