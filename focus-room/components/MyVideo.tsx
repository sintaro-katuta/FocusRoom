import { useState, useEffect, useRef } from "react";
import Switch from '@material-ui/core/Switch';
import Card from "@material-ui/core/Card";
import * as Icon from "react-bootstrap-icons";
import { FormGroup, FormControlLabel, } from '@mui/material';

export default function MyVideo({ device }) {
  const videoRef = useRef(null); // ビデオのRefを作成(このRefを変えることで、映像を映したりすることができます)
  const [cameravisible, setCameravisible] = useState(true);
  const [volumevisible, setVolumevisible] = useState(true);
  function switch_camera(e){
    setCameravisible(!cameravisible)
    if(e.target.checked){
      navigator.mediaDevices
      .getUserMedia({
        // ここで、選択したデバイスをセットしています。
        video: device,
      })
      .then((stream) => {
        if (!videoRef?.current) return;
        // 現在接続されているデバイスを使いストリーミングしています。
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((e) => {
        // エラー処理
        alert()
      });
    }else{
        videoRef.current.srcObject = null;
    }
  }

  function switch_volume(e){
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
            <video ref={videoRef} id="video"></video>
        </Card>
        <FormGroup className="ps-3">
          {cameravisible ? <Icon.CameraVideoOff className="mt-2" width={20} height={20} /> : <Icon.CameraVideo className="mt-2" width={20} height={20} /> }
          <FormControlLabel
            control={<Switch color="primary" onChange={(e) => switch_camera(e)}/>}
          />
          {volumevisible ? <Icon.VolumeMuteFill className="mt-2" width={20} height={20} /> : <Icon.VolumeUpFill className="mt-2" width={20} height={20} />}
          <FormControlLabel
            control={<Switch color="primary" onChange={(e) => switch_volume(e)}/>}
          />
        </FormGroup>
    </>
  );
}