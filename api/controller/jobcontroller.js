
import Job from "../model/Jobmodel.js";


export const alljobs=async(req,res,next)=>{
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }
    catch(error){
        console.log(error)
    }
} 

export const postjob=async(req,res,next)=>{
    try{
        const jobdata=req.body;  
        const job = await Job.findOne(jobdata);
        if(job){
            res.json("Already Exist");
            return;
        }
        else{
        const newJob=await Job.insertMany(jobdata);
        res.status(201).json(newJob);
    }
}
    catch(error){
        console.log(error);
    }
}


export const updatejob=async(req,res,next)=>{
    try {
        const newData = req.params.id;
        const updatedData = { ...req.body };
    
        const search = await Job.findOneAndUpdate({ id: parseInt(newData) }, updatedData, { new: true });
    
        if (search) {
            res.status(200).json("Updated");
        } else {
            res.status(404).json("Job not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
    
}

export const deletejob=async(req,res,next)=>{
    try{
        const newData=req.params.id;
        const search = await Job.findOneAndDelete({ id: parseInt(newData) }); 
        res.status(200).json("Deleted");
    }
    catch(error){

    }
}

export const getonejob=async(req,res,next)=>{
    try{
        const newData=req.params.id;
        const search = await Job.findOne({ id: parseInt(newData) }); 
        res.json(search);

    }
    catch(error){

    }
}

export const test2=(req,res,next)=>{
    try{
        res.json("TEST2");
    }
    catch(error){

    }
}


