"use client";

import { useState, useRef } from "react";

const Home = () => {
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const options = { mimeType: "video/webm; codecs=vp8,opus" };
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedBlob(event.data);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    }
  };

  const downloadVideo = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h2 style={{ paddingBottom: "30px", fontSize: "28px" }}>
          <b>Recording Stream</b>
        </h2>
        <video ref={videoRef} autoPlay playsInline controls style={{ width: "500px", height: "300px", border: "1px solid #000", borderRadius: "10px", padding: "20px" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20px" }}>
        <h1 style={{ fontSize: "28px" }}>
          <b>Recorded Video</b>
        </h1>
        {recordedBlob && (
          <div style={{ overflow: "auto", maxHeight: "300px", width: "500px", border: "1px solid #000", borderRadius: "10px", padding: "20px" }}>
            <video ref={recordedVideoRef} controls style={{ width: "100%", height: "auto" }}>
              <source src={URL.createObjectURL(recordedBlob)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={downloadVideo} style={{ marginTop: "10px", marginBottom: "10px", color: "blue" }}>
              Download Video
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <button onClick={startRecording} disabled={isRecording} style={{ color: "green", border: "1px solid", borderRadius: "5px", textAlign: "center", padding: "2px 4px", marginRight: "10px" }}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording} style={{ color: "red", border: "1px solid", borderRadius: "5px", textAlign: "center", padding: "2px 4px" }}>
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default Home;
