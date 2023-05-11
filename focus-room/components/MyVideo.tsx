import { useState, useEffect, useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import { Switch, Card, CardMedia, Button } from '@mui/material';

export default function MyVideo() {
  const videoRef: any = useRef(null); // ビデオのRefを作成(このRefを変えることで、映像を映したりすることができます)
  const [cameravisible, setCameravisible] = useState(true);
  const [volumevisible, setVolumevisible] = useState(true);

  function share_display(){
    navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
  }
  
  function switch_camera(e: any){
    setCameravisible(!cameravisible)    
    navigator.mediaDevices
    .getUserMedia({
      // ここで、選択したデバイスをセットしています。
      audio: true,
      video: {
        width: {
          min: 640,
          max: 640,
        },
        height: {
          min: 480,
          max: 480,
        }
      }
    })
    .then((stream) => {
      if(e.target.checked){
        if (!videoRef?.current) return;
      // 現在接続されているデバイスを使いストリーミングしています。
      videoRef.current.srcObject = stream;
      videoRef.current.volume = 0;
      videoRef.current.play();
      }else{
        videoRef.current.srcObject = null;
      }
    })
    .catch((e) => {
      // エラー処理
      alert()
    });
  }

  function switch_volume(e: any){
    setVolumevisible(!volumevisible)
    if(e.target.checked){
      videoRef.current.volume = 0;
    }else{
      videoRef.current.volume = 1;
    }
  }

  return (
    <>
        <Card>
          <CardMedia>
            <video ref={videoRef} id="video" height="240"></video>
          </CardMedia>
            {cameravisible ? <Icon.CameraVideoOff className="ms-3" width={20} height={20} /> : <Icon.CameraVideo className="ms-3" width={20} height={20} /> }
            <Switch color="primary" onChange={(e) => switch_camera(e)}/>
            {volumevisible ? <Icon.VolumeMuteFill width={20} height={20} /> : <Icon.VolumeUpFill width={20} height={20} />}
            <Switch color="primary" onChange={(e) => switch_volume(e)}/>
            <Button variant="text" onClick={() => share_display()}>画面共有</Button>
        </Card>
    </>
  );
}