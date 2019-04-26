import * as Router from "koa-router";
import * as firebase from "firebase";
import { getManager } from "typeorm";
import { Personnel } from "../../entity/personnel";

const router = new Router();

const clientConfig = {
  apiKey: "AIzaSyBkk-DRS7YlshPplG7O85oFWeZ6rRSEA74",
  authDomain: "repcomapi.firebaseapp.com",
  databaseURL: "https://repcomapi.firebaseio.com",
  storageBucket: "repcomapi.appspot.com"
};

firebase.initializeApp(clientConfig);

async function authLogin(ctx: any, next: any) {
  const body = ctx.request.body;

  const username = body.username;
  const password = body.password;

  if (username === "" || password === "") {
    return (ctx.status = 400);
  }

  const firebaseUser = (await firebase
    .auth()
    .signInWithEmailAndPassword(username, password)).user;

  const token = await firebaseUser.getIdToken(true);

  ctx.body = {
    token: token
  };
  // ctx.status=200;
}

async function register(ctx: any, next: any) {
  const manager = getManager();
  const body = ctx.request.body;

  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  if (email === "" || password === "" || confirmPassword === "") {
    return (ctx.status = 400);
  }

  if (confirmPassword !== password) {
    return (ctx.status = 400);
  }

  let query = await manager
    .createQueryBuilder(Personnel, "pers")
    .where("pers.isDeleted= false")
    .andWhere("lower(pers.email)=lower('" + email + "')")
    .getQuery();

  query = "select Exists (" + query + ")";
  const checkPersonnel = (await manager.query(query))[0].exists;

  if (checkPersonnel) {
    return (ctx.status = 400);
  }

  const personnel = manager.create(Personnel);
  manager.merge(Personnel, personnel);

  const firebaseUser = (await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)).user;

  const token = await firebaseUser.getIdToken(true);

  ctx.body = {
    token: token
  };
  // ctx.status=200;
}

const authRouters = router.routes();
router.post("/login", authLogin);
router.post("/register", register);

export { authRouters };
