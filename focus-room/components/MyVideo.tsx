import { useState, useEffect, useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import { Switch, Card, CardMedia, Button } from '@mui/material';

export default function MyVideo() {
  const videoRef: any = useRef(null); // ビデオのRefを作成(このRefを変えることで、映像を映したりすることができます)
  const [cameravisible, setCameravisible] = useState(false);
  const [volumevisible, setVolumevisible] = useState(false);

  // カメラを切り替えるための関数
  async function switchCamera(e: any) {
    if (e.target.checked) {
      navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 }, audio: false })
        .then((stream) => {
          // 取得した音声ストリームを利用するための処理を記述します
          let cameraElemet: any = document.querySelector("#video")
          cameraElemet.srcObject = stream
          cameraElemet.play()

        })
        .catch((error) => {
          // マイクへのアクセスが失敗した場合の処理
          console.error('カメラへのアクセスが失敗しました。', error);
        });
    } else {
      let cameraElemet: any = document.querySelector("#video")
      cameraElemet.srcObject = null
    }
  }

  // マイクを切り替えるための関数
  async function switchMicrophone(e: any) {
    if (e.target.checked) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          // 取得した音声ストリームを利用するための処理を記述します
          let cameraElemet: any = document.querySelector("#audio")
          cameraElemet.srcObject = stream
          cameraElemet.play()
        })
        .catch((error) => {
          // マイクへのアクセスが失敗した場合の処理
          console.error('マイクへのアクセスが失敗しました。', error);
        });
    } else {
      let audioElemet: any = document.querySelector("#audio")
      audioElemet.srcObject = null
    }
  }

  function share_display() {
    navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
  }

  return (
    <>
      <Card>
        <video id="video" src=""></video>
        <audio id="audio" src=""></audio>
        <br />
        {cameravisible ? <Icon.CameraVideo className="ms-3" width={20} height={20} /> : <Icon.CameraVideoOff className="ms-3" width={20} height={20} />}
        <Switch color="primary" onChange={(e) => switchCamera(e)} />
        {volumevisible ? <Icon.VolumeUpFill width={20} height={20} /> : <Icon.VolumeMuteFill width={20} height={20} />}
        <Switch color="primary" onChange={(e) => switchMicrophone(e)} />
        <Button variant="text" onClick={() => share_display()}>画面共有</Button>
      </Card>
    </>
  );
}