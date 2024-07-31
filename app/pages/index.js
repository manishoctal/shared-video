import { useState, useRef } from "react";
import { saveAs } from "file-saver";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const videoRef = useRef();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);
    recorder.start();
    setMediaRecorder(recorder);
    videoRef.current.srcObject = stream;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      saveAs(blob, "recording.webm");
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setChunks([]);
      setIsRecording(false);
    };
  };

  return (
    <div>
      <h1>Screen Recorder</h1>
      <video ref={videoRef} autoPlay muted style={{ width: "80%", border: "1px solid black" }}></video>
      <div>{!isRecording ? <button onClick={startRecording}>Start Recording</button> : <button onClick={stopRecording}>Stop Recording</button>}</div>
    </div>
  );
}
