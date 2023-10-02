import express from 'express';

import {login,register,test,allusers} from '../controller/usercontroller.js';

// import { Auth } from '../middleware/auth.js';

const router = express.Router();

router.get("/users",allusers);

router.post("/login",login);

router.post("/register",register);

router.get("/test",test);

export default router;




