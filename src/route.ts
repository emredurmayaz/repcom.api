import * as Router from "koa-router";
import { personnelRouters } from "./business/personnel/personnel-controller";
import { authRouters } from "./business/auth/auth-controller";

const router = new Router();

router.use(personnelRouters);
router.use(authRouters);

export { router };
