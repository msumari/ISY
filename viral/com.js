const videoview = document.getElementById('show');
const myvideo = document.createElement('video');
myvideo.muted = true;


let videoshow
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    videoshow = stream;
    addvideoshow(myvideo,stream);
}) 

const addvideoshow = (video, stream)=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoview.append(video);
}