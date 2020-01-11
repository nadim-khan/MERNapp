const mongoose=require('mongoose');

const ExcerciseSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
},{
    timestamps:true
});

module.exports=mongoose.model('Excercises',ExcerciseSchema);