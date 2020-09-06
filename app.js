const express = require('express');
const app = express();
const server = require('http').Server(app);
const io =  require('socket.io')(server);
const {v4 :uuidv4} = require('uuid');

const { ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});
app.set('view engine','ejs');
app.use(express.static('viral'));
app.use('/peerjs',peerServer);

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
  
})

app.get('/:Chatroom',(req, res)=>{
    res.render('Chatroom',{roomid:req.params.Chatroom})
})

io.on('connection',socket => {
    socket.on('join_chatroom',(roomid,userId) => {
        socket.join(roomid);
        socket.to(roomid).broadcast.emit('user_connected',userId);
        socket.on('message',message=>{
            io.to(roomid).emit('createsms', message)
        })
    
    
    })
})




server.listen(3030,()=>console.log('server is up'));