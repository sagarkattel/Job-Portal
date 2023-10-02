import express from 'express';

const router=express.Router();

import {alljobs,postjob,updatejob,deletejob,getonejob, test2} from '../controller/jobcontroller.js';

router.get("/alljobs",alljobs);

router.post("/postjob",postjob);

router.put("/updatejob/:id",updatejob);

router.delete("/deletejob/:id",deletejob);

router.get("/onejob/:id",getonejob);

router.get("/test2",test2)

export default router;