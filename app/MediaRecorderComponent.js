import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

function MediaRecorderComponent() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} autoPlay loop controls></video>
    </div>
  );
}

export default MediaRecorderComponent;
