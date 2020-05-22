import * as request from 'request';
const ApplicationTypeHeader = 'application/json;charset=utf-8';
export class DingdingBot {
  private readonly _webhookUrl: string;
  constructor(webhookUrl: string) {
    this._webhookUrl = webhookUrl;
  }

  public pushMsg(data: any): boolean {
    try {
      const options: request.CoreOptions = {
        headers: {
          'Content-Type': ApplicationTypeHeader,
        },
        json: data,
      };
      request.post(this._webhookUrl, options, function(
        error,
        response,
        body,
      ) {});
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
