// pages/index.js
import { useEffect, useState } from "react";
import VideoStream from "./MediaRecorderComponent";

const Home = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    };

    startVideo();

    // Setup WebRTC connection here
    // Use RTCPeerConnection to handle the connection
    // Setup ICE candidates and media streams
  }, []);

  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <div>
        <h2>Local Stream</h2>
        <VideoStream stream={localStream} />
      </div>
      <div>
        <h2>Remote Stream</h2>
        <VideoStream stream={remoteStream} />
      </div>
    </div>
  );
};

export default Home;
