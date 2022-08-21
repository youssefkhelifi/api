const express = require("express");
const app = express();
const connectDb = require("./Config/connectDb");
require("dotenv").config({ path: "./Config/.env" });
const port =process.env.PORT ||6000;
console.log(process.env.PORT)
app.listen(port,(err)=>{
  (err)?console.log('server is failed'):console.log(`server is running on port ${port}`)
})
connectDb();
const User = require('./models/User.js')
//Midelware globale
app.use(express.json())

app.post('/create', async (req, res) =>{
  const user = req.body;

  try {
    const userFound = await User.findOne({ email: user.email });
    if (userFound) {
      res.status(401).json({ msg: "user already exist" });
    } else {
      const newUser = new User({
        name: user.name,
        age: user.age,
        email: user.email,
        
      });
      await newUser.save();
      res
        .status(200)
        .json({ msg: "user is sucessfylly saved ", user: newUser });
    }
  } catch (error) {
    res.status(200).json({ msg: "saving failed " });
  }
    
 });
 app.get('/find',async(req, res)=>{
  const users = await User.find();
  try {
    const users = await User.find();
    if (users.length == 0) {
      res.status(401).json({ msg: "your database is empty " });
    } else {
      res.status(200).json({ users });
    }
  } catch (error) {
    res.status(400).json({ msg: "somthing is wrong" });
  }
  
 })
 app.put('/update/:id',async(req,res)=>{
  const id = req.params.id;
  const user = req.body;
  try {
    await User.findByIdAndUpdate(id, user);
    res.status(200).json({ msg: "user is sucessfylly updated " });
  } catch (error) {
    res.status(400).json({ msg: "update is failed" });
  }
 })
 app.delete('/delete/:id',async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    const users = await User.find();
    res.status(200).json({ msg: "user is sucessfylly delted ", users });
  } catch (error) {
    res.status(400).json({ msg: "delete is failed" });
  }
})


  



  