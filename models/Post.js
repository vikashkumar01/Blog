const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

   title:{
       type:String,
       required:true
   },

   description:{
       type:String,
       required:true
   },

   photo:{
       public_id:String,
       url:String
   },

   username:{
       type:String,
       required:true
   },

},{timestamps:true});

module.exports = mongoose.model("Post", PostSchema);