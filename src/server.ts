import * as Koa from 'koa';
import { router } from './route';

const app = new Koa();

// router.get('/*', async (ctx) => {
//     ctx.body = 'Hello World! I am vecihi.node';
// });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3042);

console.log('Server running on port 3042');