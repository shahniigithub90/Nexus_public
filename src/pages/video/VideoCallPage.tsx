import { useRef, useState } from "react";

function VideoCallPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsCalling(true);
    } catch (error) {
      alert("Camera/Microphone permission denied");
    }
  };

  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setIsCalling(false);
    setStream(null);
  };

  const toggleVideo = () => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = !videoOn;
    });
    setVideoOn(!videoOn);
  };

  const toggleAudio = () => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = !audioOn;
    });
    setAudioOn(!audioOn);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Video Call</h1>

      <div className="bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-96 object-cover"
        />
      </div>

      <div className="flex gap-4">
        {!isCalling ? (
          <button
            onClick={startCall}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Start Call
          </button>
        ) : (
          <>
            <button
              onClick={endCall}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              End Call
            </button>

            <button
              onClick={toggleVideo}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {videoOn ? "Turn Video Off" : "Turn Video On"}
            </button>

            <button
              onClick={toggleAudio}
              className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
              {audioOn ? "Mute" : "Unmute"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoCallPage;