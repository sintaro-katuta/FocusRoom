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
  let server: any = null
  let peerConnection: any = null

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
    const text = await e.data.text()
    const msg = JSON.parse(text)

    if (msg.type === 'offer') {
      receiveSessionDescription(msg)
      await createAnswer()
      return
    }

    if (msg.type === 'answer') {
      receiveSessionDescription(msg)
      return
    }
  }

  async function wakeupVideo() {
    console.log('Wakeup video')
    const config = { video: true, audio: false }

    const stream = await navigator.mediaDevices.getUserMedia(config)
    let cameraElemet: any = document.querySelector("#video")

    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream)
    })
    cameraElemet.srcObject = stream
    cameraElemet.play()
  }

  function prepareRTCPeerConnection() {
    const config = { 'iceServers': [] }
    peerConnection = new RTCPeerConnection(config)

    peerConnection.ontrack = onTrack
    peerConnection.onicecandidate = onIceCandidate
  }
  async function createOffer() {
    const sessionDescription = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(sessionDescription)
  }

  async function createAnswer() {
    const sessionDescription = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(sessionDescription)
  }

  function sendSessionDescription(description: any) {
    const data = JSON.stringify(description)
    server.send(data)
    console.log("description.sdp", description.sdp)
  }

  async function receiveSessionDescription(description: any) {
    await peerConnection.setRemoteDescription(description)
    console.log("description.sdp", description.sdp)
  }

  function onTrack(e: any) {
    let cameraElemet: any = document.querySelector("#video2")
    let stream = e.streams[0]
    cameraElemet.srcObject = stream
    cameraElemet.play()
  }

  function onIceCandidate(e: any) {
    console.log("onicecandidate")
    if (e.candidate !== null) return
    const description = peerConnection.localDescription
    sendSessionDescription(description)
  }

  function prepare() {
    prepareRTCPeerConnection()
    prepareWebSocket()
    wakeupVideo()
  }

  function connect() {
    createOffer()
  }

  // カメラを切り替えるための関数
  async function switchCamera(e: any) {
    if (e.target.checked) {
      navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 }, audio: false })
        .then((stream) => {
          // 取得した音声ストリームを利用するための処理を記述します
          let cameraElemet: any = document.querySelector("#video")
          cameraElemet.srcObject = stream
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
        <video id="video" src="" controls autoPlay></video>
        <audio id="audio" src=""></audio>
        <br />
        <video id="video2" src="" controls autoPlay></video>
        {cameravisible ? <Icon.CameraVideo className="ms-3" width={20} height={20} /> : <Icon.CameraVideoOff className="ms-3" width={20} height={20} />}
        <Switch color="primary" onChange={(e) => switchCamera(e)} />
        {volumevisible ? <Icon.VolumeUpFill width={20} height={20} /> : <Icon.VolumeMuteFill width={20} height={20} />}
        <Switch color="primary" onChange={(e) => switchMicrophone(e)} />
        <Button variant="text" onClick={() => share_display()}>画面共有</Button>
        <Button variant="text" onClick={() => prepare()}>prepare</Button>
        <Button variant="text" onClick={() => connect()}>connect</Button>
      </Card>
    </>
  );
}