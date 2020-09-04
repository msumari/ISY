const express = require('express');
const app = express();
const server = require('http').Server(app);

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('Chatroom');
  
})







server.listen(3030,()=>console.log('server is up'));