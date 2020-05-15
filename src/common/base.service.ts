import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class BaseService {
  constructor(
    @Inject(REQUEST) public request: Request
  ) {}
}
