var express=require('express');

const router=express.Router();
const User=require('../models/User.model');

router.get('/',async(req,res)=>{
    try{
        const users= await User.find();
        res.json(users)
        console.log('\n ==> Request for All the posts : ',users)
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:userId',async(req,res)=>{
    try{
        const userById= await Post.findById(req.params.userId);
        res.json(userById);
        console.log('\n ==> Reques for post with ID [ '+req.params.userId+' ] Required Post : ',userById)
    }catch(err){
        res.json({message:err});
        console.log({message:err})
    }
});

router.post('/add',async(req,res)=>{
    const username= req.body.username;
    const newUser=new User({username});
      try{
          const savedUser= await newUser.save();
          res.json(savedUser)
          console.log('\n ==> User saved : ',savedUser)
      }catch(err){
          res.json({message:err});
          console.log({message:err})
      }
});

router.patch('/:userId',async(req,res)=>{
    try{
        updateUser=await User.updateOne(
            {_id:req.params.userId},
            {$set: {
                username:req.body.username,
                description:req.body.description,
                duration:req.body.duration,
                date:req.body.date
            }
        });
        res.json(updateUser)
        console.log('\n ==> User Updated : ',updateExcercise)

    }catch(err){
        res.json({message:err});
        console.log({message:err})
    }
})

router.delete('/:userId',async(req,res)=>{
    try{
        const delUser=await Post.findByIdAndRemove({_id:req.params.userId});
        res.json(delUser);
    }catch(err){
        res.json({message:err})
        console.log({message:err})
    }
})

module.exports=router;