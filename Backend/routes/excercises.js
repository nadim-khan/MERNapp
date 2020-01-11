const express=require('express');

const router=express.Router();
const Excercise=require('../models/Excercise.model')

//Gets all the Excercise
router.get('/',async(req,res)=>{
    try{
        const Excercises= await Excercise.find();
        res.json(Excercises)
        console.log('\n ==> Request for All the excercise : ',Excercises)
    }catch(err){
        res.json({message:err});
    }
});
//Gets a specific Excercise
router.get('/:excerciseId',async(req,res)=>{
    try{
        const excerciseById= await Excercise.findById(req.params.excerciseId);
        res.json(excerciseById);
        console.log('\n ==> Reques for Excercise with ID [ '+req.params.excerciseId+' ] Required Excercise : ',excerciseById)
    }catch(err){
        res.json({message:err});
    }
});
//Submits a the Excercise
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

router.route('/update/:id').post((req, res) => {
    Excercise.findById(req.params.id)
      .then(excercise => {
        excercise.username = req.body.username;
        excercise.description = req.body.description;
        excercise.duration = Number(req.body.duration);
        excercise.date = Date.parse(req.body.date);
  
        excercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

//Delete Post
router.delete('/:excerciseId',async(req,res)=>{
    try{
        const delExcercise=await Excercise.findByIdAndRemove({_id:req.params.excerciseId});
        res.json(delExcercise);
        console.log('\n ==> Excercise Deleted : ',delExcercise)
    }catch(err){
        res.json({message:err})
    }
})


module.exports=router;