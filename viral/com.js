const socket = io('/');

const videoview = document.getElementById('show');
const myvideo = document.createElement('video');
myvideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
});


let videoshow
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    videoshow = stream;
    addvideoshow(myvideo, stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', uservideoshow => {
            addvideoshow(video, uservideoshow);
        })

    })

    socket.on('user_connected', (userId) => {
        newUser(userId, stream);
    })
})

peer.on('open', id => {
    socket.emit('join_chatroom', ROOM_ID, id);

})



const newUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', uservideoshow => {
        addvideoshow(video, uservideoshow);
    })

}



const addvideoshow = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoview.append(video);
}


let sms = $('input')
console.log(sms)

$('html').keydown((e) => {
    if (e.which == 13 && sms.val().length !== 0) {
        console.log(sms.val())
        socket.emit('message', sms.val());
        sms.val('')

    }
})

socket.on('createsms', message => {
    $('ul').append(`<li class="message"<b>user</b></br>${message}</li>`);
    limiter()
})


const limiter = () => {
    let z = $('.chat_window');
    z.scrollTop(z.prop("scrollHeight"));
}


const mutemod = () => {
    const enabled = videoshow.getAudioTracks()[0].enabled;
    if (enabled) {
        videoshow.getAudioTracks()[0].enabled = false;
        unmutebut();
    } else {
        videoshow.getAudioTracks()[0].enabled = true;
        mutebut();
    }
}

const mutebut = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
    `
    document.querySelector('.mute_button').innerHTML = html;

}

const unmutebut = () => {
    const html = `
    <i class=" stop fas fa-microphone-alt-slash"></i>
    <span>Unmute</span>
    `
    document.querySelector('.mute_button').innerHTML = html;
}

const quitmod = () => {
    const enabled = videoshow.getVideoTracks()[0].enabled;
    if (enabled) {
        videoshow.getVideoTracks()[0].enabled = false;
        unquitbut();
    } else {
        videoshow.getVideoTracks()[0].enabled = true;
        quitbut();
    }
}

const quitbut = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Quit video</span>
    `
    document.querySelector('.quit_button').innerHTML = html;

}
const unquitbut = () => {
    const html = `
    <i class=" unmute fas fa-video-slash"></i>
    <span>Show video</span>
    `
    document.querySelector('.quit_button').innerHTML = html;
}


