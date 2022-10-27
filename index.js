import express from "express";
import mongoose from "mongoose";
import booksRouter from "./routes/books.js";

const app = express();
app.use(express.json())

mongoose
  .connect("mongodb://localhost/myBooks")
  .then(console.log("connect to db"))
  .catch(console.log("fail to connect to db"));

app.listen('2023',()=>{
    console.log('server is up')
})


app.get('/',(req,res)=>{
    res.send('Hi milad ,you are my friend, you are bestttttttttttt')
})
app.use('/api/books',booksRouter)