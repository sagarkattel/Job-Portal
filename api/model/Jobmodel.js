import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Ensure uniqueness
    },
    company: {
        type: String,
        required: true
    },
    new: {
        type: Boolean
    },
    featured:{
        type:Boolean
    },
    position: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    level:{
        type:String
    },

    postedAt: {
        type: String,
    },
    contract:{
        type:String,
    },
    location:{
        type:String,
    },
    languages:{
        type:Array,
    },
    tools:{
        type:Array
    }
    
});

const JobModel = mongoose.model('Job', JobSchema);


export default JobModel;
