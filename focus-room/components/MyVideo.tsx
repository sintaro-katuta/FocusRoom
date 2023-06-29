import { useState, useEffect, useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import { Switch, Card, CardMedia, Button } from '@mui/material';

export default function MyVideo() {
  const videoRef: any = useRef(null); // ビデオのRefを作成(このRefを変えることで、映像を映したりすることができます)
  let senderConnection: any
  const [cameravisible, setCameravisible] = useState(false);
  const [volumevisible, setVolumevisible] = useState(false);
  let candidates: any

  const WSS_URL = 'ws://localhost:3010/'
  let server = null
  let peerConnection = null

  function prepareWebSocket() {
    server = new WebSocket(WSS_URL)
    server.onopen = onOpen
    server.onerror = onError
    server.onmessage = onMessage
  }

  function onOpen(e: any) {
    console.log('open web socket server')
  }

  function onError(e: any) {
    console.error(e)
  }

  async function onMessage(e: any) {

  }

  function prepareRTCPeerConnection() {
    const config = { 'iceServers': [] }
    peerConnection = new RTCPeerConnection(config)

    peerConnection.ontrack = onTrack
    peerConnection.onicecandidate = onIceCandidate
  }

  function onTrack(e: any) {

  }

  function onIceCandidate(e: any) {

  }

  function prepare() {
    prepareRTCPeerConnection()
    prepareWebSocket()

  }

  // カメラを切り替えるための関数
  async function switchCamera(e: any) {
    if (e.target.checked) {
      navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 }, audio: false })
        .then((stream) => {
          // 取得した音声ストリームを利用するための処理を記述します
          let cameraElemet: any = document.querySelector("#video")
          cameraElemet.srcObject = stream4
          stream.getTracks().forEach((track) => {
            senderConnection.addTrack(track, stream);
          });
          cameraElemet.play()
          return senderConnection.createOffer();
        })

        .then((desc: any) => {
          return senderConnection.setLocalDescription(desc).then(() => desc)
        })

        .then((desc: any) => {
          console.log(JSON.stringify(senderConnection.localDescription))
          alert(
            `sender の sdp offer を log に出力したので sender に入力してください。`
          );
          return desc
        })
        .then(() => {
          const receiverAnswer: any = window.prompt(
            "receiver の SDP answer description を入力してください。"
          );
          console.log("success sdp, peer:", senderConnection);
          return senderConnection.setRemoteDescription(JSON.parse(receiverAnswer));
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
        <Button variant="text" onClick={() => prepare()}>prepare</Button>
      </Card>
    </>
  );
}