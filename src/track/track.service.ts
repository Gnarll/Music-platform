import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  async create() {}
  getAll(): string {
    return 'Prikol';
  }
  async getOne() {}
  async delete() {}
}
