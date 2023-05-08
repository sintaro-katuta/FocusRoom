import { useEffect, useRef } from "react";

const SampleVideo = (selectedVideo: MediaDeviceInfo) => {
  // <video>のrefを取得しておく
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef) {
      navigator.mediaDevices
        .getUserMedia({
	  // ここでvideoに選択しているデバイスの情報をそのまま渡す
          video: selectedDevice,
        })
        .then((stream) => {
          if (videoRef?.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((e) => {
          // エラー処理
        });
    }
  }, [videoRef, selectedDevice]);

  return (
    <div>
      <Video ref={videoRef} id="video"></Video>
    </div>
  );
}