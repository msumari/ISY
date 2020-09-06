const socket = io('/');

const videoview = document.getElementById('show');
const myvideo = document.createElement('video');
myvideo.muted = true;

var peer = new Peer(undefined, {
    path:'/peerjs',
    host:'/',
    port:'3030'
}); 


let videoshow
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
}).then(stream=>{
    videoshow = stream;
    addvideoshow(myvideo,stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', uservideoshow => {
            addvideoshow(video, uservideoshow);
        })

    })

    socket.on('user_connected', (userId) =>{
        newUser(userId, stream);
    })
}) 

peer.on('open', id => {
socket.emit('join_chatroom', ROOM_ID, id);

})



const newUser = (userId, stream) =>{
   const call = peer.call(userId, stream);
   const video = document.createElement('video');
   call.on('stream', uservideoshow =>{
       addvideoshow(video, uservideoshow);
   })

}



const addvideoshow = (video, stream)=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoview.append(video);
}


let sms = $('input')
console.log(sms)

$('html').keydown((e)=>{
    if(e.which == 13 && sms.val().length !== 0){
        console.log(sms.val())
        socket.emit('message',sms.val());
        sms.val('')

    }
})

socket.on('createsms',message=>{
    console.log("this come from server", message)
})

