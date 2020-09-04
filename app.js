const express = require('express');
const app = express();
const server = require('http').Server(app);
const {v4 :uuidv4} = require('uuid');
const { static } = require('express');
app.set('view engine','ejs');
app.use(express.static('viral'));

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
  
})

app.get('/:Chatroom',(req, res)=>{
    res.render('Chatroom',{roomid:req.params.Chatroom})
})






server.listen(3030,()=>console.log('server is up'));