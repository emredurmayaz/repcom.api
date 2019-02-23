import * as Koa from 'koa';
import { router } from './route';
import { dbInit } from './db.init';
var bodyParser = require('koa-bodyparser');

const app = new Koa();

// router.get('/*', async (ctx) => {
//     ctx.body = 'Hello World! I am vecihi.node';
// });

dbInit();
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3042);

console.log('Server running on port 3042');