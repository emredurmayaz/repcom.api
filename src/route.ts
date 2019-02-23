import * as Router from 'koa-router';
import { personnelRouters } from './business/personnel-controller';

const router = new Router();

router.use(personnelRouters);

export { router };