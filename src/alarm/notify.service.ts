import { Injectable } from '@nestjs/common';

@Injectable()
export class NotifyCacheService {

  // 计时器
  timer = null;

  // 消息队列
  msgQueue = [];

  private observers = [];

  private scheduler() {
    this.timer = setTimeout(() => {
      const msgs = this.msgQueue;
      this.msgQueue = [];
      this.observers.forEach(callback => callback(msgs));
      clearTimeout(this.timer);
    }, 5000)
  }

  /**
   * 数据放进队列
   * @param msgData 消息数据
   */
  push(msgData: any) {
    if (msgData) {
      this.msgQueue.push(msgData);
    }
    if(!this.timer) {
      this.scheduler();
    }
  }

  /**
   * 订阅方法
   * @param callback 可以执行的回调
   */
  subscribe(callback: (msgs: any[]) => void) {
    if (callback && typeof callback === 'function') {
      this.observers.push(callback);
    }
  }
}
