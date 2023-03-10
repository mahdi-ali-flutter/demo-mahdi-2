const express=require('express');
const app=express();
const mongoose = require('mongoose');
app.use(express.json());
const morgan=require('morgan');
app.use(morgan('dev'));

mongoose.connect('mongodb+srv://mahdi:mahdi@cluster0.3lvnvig.mongodb.net/mahdi?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(!err){
       console.log("connected to db");
    }else{
        throw err;
    }
});

//schema
const sch={
    name:String,
    email:String,
    password:Number
}
const mongoModel=mongoose.model("NEWCOL",sch);

//get
app.get('/',async(req,res)=>{

  
   await res.send(req.body.name);
   
  });

//post
app.post('/post',async(req,res)=>{
  console.log("inside post function ");

  const data=new mongoModel({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  });
  const value =await data.save();
  res.json(value);
  console.log(req.body);
});

var port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("connected with port 3000 http://localhost:3000/post ...");
});
