import { Request, Response } from 'express';
import { ServicePostgresRepository } from './service.postgres.repository';

export class ServiceController {
  constructor(private repo: ServicePostgresRepository) {}

  getAll = async (_: Request, res: Response) => {
    const services = await this.repo.getAll();
    res.json(services);
  };
}
