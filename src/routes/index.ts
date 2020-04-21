import { Router } from 'express';
import UserRouter from './Users';
import QBRouter from './quickbooks'
const router = Router();

router.use('/users', UserRouter);
router.use('/qb', QBRouter);

export default router;
