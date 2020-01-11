const express=require('express');

const router=express.Router();
const Excercise=require('../models/Excercise.model')

//Gets all the POSTS
router.get('/',async(req,res)=>{
    try{
        const posts= await Excercise.find();
        res.json(posts)
        console.log('\n ==> Request for All the excercise : ',Excercise)
    }catch(err){
        res.json({message:err});
    }
});
//Gets a specific post
router.get('/:excerciseId',async(req,res)=>{
    try{
        const excerciseById= await Post.findById(req.params.excerciseId);
        res.json(excerciseById);
        console.log('\n ==> Reques for post with ID [ '+req.params.excerciseId+' ] Required Post : ',excerciseById)
    }catch(err){
        res.json({message:err});
    }
});
//Submits a the POSTS
router.post('/add',async(req,res)=>{
  const excercise= new Excercise({
      username:req.body.username,
      description:req.body.description,
      duration:req.body.duration,
      date:req.body.date
  });
    try{
        const savedExcercise= await excercise.save();
        res.json(savedExcercise)
        console.log('\n ==> Excercise saved : ',savedExcercise)
    }catch(err){
        res.json({message:err});
    }

});

//Update Post
router.patch('/:excerciseId',async(req,res)=>{
    try{
        const updateExcercise= await Excercise.updateOne(
            {_id:req.params.excerciseId},
            {$set: {
                username:req.body.username,
                description:req.body.description,
                duration:req.body.duration,
                date:req.body.date
            }}
        );
        res.json(updateExcercise)
        console.log('\n ==> Excercise Updated : ',updateExcercise)
    }catch(err){
        res.json({message:err})
        console.log('\n ==> Excercise Updated err: ',err)
    }   
})

//Delete Post
router.delete('/:excerciseId',async(req,res)=>{
    try{
        const delPost=await Post.findByIdAndRemove({_id:req.params.excerciseId});
        res.json(delPost);
    }catch(err){
        res.json({message:err})
    }
})


module.exports=router;