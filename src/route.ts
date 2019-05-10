import * as Router from "koa-router";
import { personnelRouters } from "./business/personnel/personnel-controller";
import { authRouters } from "./business/auth/auth-controller";
import { machineRouters } from "./business/machine/machine-controller";
import { faultTypeRouters } from "./business/faultType/faultType-controller";
import { faultRouters } from "./business/fault/fault-controller";

const router = new Router();

router.use(personnelRouters);
router.use(authRouters);
router.use(machineRouters);
router.use(faultTypeRouters);
router.use(faultRouters);

export { router };
