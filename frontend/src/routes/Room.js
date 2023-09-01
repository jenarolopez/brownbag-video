import React, { useEffect, useRef } from 'react'
import { useNavigation, useParams } from 'react-router';

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
      props.peer.on("stream", stream => {
          ref.current.srcObject = stream;
      })
  }, []);

  return (
      <video playsInline autoPlay ref={ref} />
  );
}

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
};

const Room = (props) => {
  
  const userVideo = useRef();
  const { id : roomId  } = useParams()



  useEffect(()=>{
    const socket = props.socket.current
    if(socket){
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
        userVideo.current.srcObject = stream;
        socket.emit("join room", roomId);
        socket.on('all users', (users) => {
          
        })
      })
    }
    
  },[props.socket])
  console.log(userVideo,'uservideo')
  return (
    <div>
      <video muted ref={userVideo} autoPlay playsInline/>
    </div>
  )
}


export default Room
