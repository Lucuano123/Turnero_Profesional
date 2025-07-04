import { Service } from './service.entity';
import { Pool } from 'pg';

export class ServicePostgresRepository {
  constructor(private pool: Pool) {}

  async getAll(): Promise<Service[]> {
    const res = await this.pool.query('SELECT * FROM services');
    return res.rows;
  }

  async getById(id: string): Promise<Service | null> {
    const res = await this.pool.query('SELECT * FROM services WHERE id = $1', [id]);
    return res.rows[0] || null;
  }
}

