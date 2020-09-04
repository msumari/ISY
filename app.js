const express = require('express');
const app = express();
const server = require('http').Server(app);
const io =  require('socket.io')(server);
const {v4 :uuidv4} = require('uuid');
const { static } = require('express');
app.set('view engine','ejs');
app.use(express.static('viral'))

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
  
})

app.get('/:Chatroom',(req, res)=>{
    res.render('Chatroom',{roomid:req.params.Chatroom})
})

io.on('connection',socket => {
    socket.on('join_chatroom',() => {
        console.log("welcome");
    })
})




server.listen(3030,()=>console.log('server is up'));