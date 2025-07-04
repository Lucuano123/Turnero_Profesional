import { Router } from 'express';
import { ServiceController } from './service.controller';
import { ServicePostgresRepository } from './service.postgres.repository';
import { pool } from '../shared/db';

const repo = new ServicePostgresRepository(pool);
const controller = new ServiceController(repo);

const router = Router();
router.get('/', controller.getAll);

export default router;

//codigo del chat