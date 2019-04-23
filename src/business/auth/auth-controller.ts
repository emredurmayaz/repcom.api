import * as Router from 'koa-router';
import * as firebase from "firebase";

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
  
    const username = "anilyildirim12@gmail.com";
    const password = "Test123*";

    const firebaseUser = (await firebase
        .auth()
        .signInWithEmailAndPassword(username, password)).user;

    const token = await firebaseUser.getIdToken(true);

    console.log(token);
    }

const authRouters = router.routes();
router.get("/login",authLogin);

export {authRouters};
