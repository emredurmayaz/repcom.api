import * as Router from 'koa-router';
import { userRouters } from './business/user-controller';

const router = new Router();

router.use(userRouters);

export { router };