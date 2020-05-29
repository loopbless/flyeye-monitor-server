import * as request from 'request';
const ApplicationTypeHeader = 'application/json;charset=utf-8';
export class DingdingBot {
  private readonly _webhookUrl: string;
  constructor(webhookUrl: string) {
    this._webhookUrl = webhookUrl;
  }

  async pushMsg(data: any) {
    try {
      const options: request.CoreOptions = {
        headers: {
          'Content-Type': ApplicationTypeHeader,
        },
        json: data,
      };
      await request.post(this._webhookUrl, options);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
