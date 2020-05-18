import * as crypto from 'crypto';
import { aes } from '@/config';

const defaultKey = Buffer.from(aes.key, 'utf8');
const iv = Buffer.from(aes.iv, 'utf8');
// 加密
export function aesEncrypt(data, key = defaultKey) {
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let crypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  return cipher.final('hex');
}

// 解码
export function aesDecrypt(encrypt, key = defaultKey) {
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encrypt, 'hex', 'utf8');
  return JSON.parse(decipher.final('utf8'));
}


