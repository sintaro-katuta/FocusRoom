import { useEffect, useRef, useState } from "react";
import Peer from 'skyway-js';
export default function Home() {
    return (
        <p>p2p</p>
    )
    // const peer = new Peer('some-peer-name', { key: '8995d3a4-1aec-429a-9dfb-73023fa739ec' });
    // const [myId, setMyId] = useState('')
    // const [callId, setCallId] = useState('')
    // const localVideo: any = useRef(null)
    // const remoteVideo: any = useRef(null)
    // peer.on('open', () => {
    //     setMyId(peer.id)
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
    //         localVideo.current.srcObject = localStream
    //     })
    // })

    // peer.on('call', mediaConnection => {
    //     mediaConnection.answer(localVideo.current.srcObject)

    //     mediaConnection.on('stream', async stream => {
    //         remoteVideo.current.srcObject = stream
    //     })
    // })

    // const makeCall = () => {
    //     const mediaConnection = peer.call(callId, localVideo.current.srcObject)
    //     mediaConnection.on('stream', async stream => {
    //         remoteVideo.current.srcObject = stream
    //         await remoteVideo.current.play().catch(console.error)
    //     })
    // }
    // return (
    //     <div>
    //         <div>skyway test</div>
    //         <div><video width="400px" autoPlay muted playsInline ref={localVideo}></video></div>
    //         <div>{myId}</div>
    //         <div>
    //             <input value={callId} onChange={e => setCallId(e.target.value)}></input>
    //             <button onClick={makeCall}>発信</button>
    //         </div>
    //         <div><video width="400px" autoPlay muted playsInline ref={remoteVideo}></video></div>
    //     </div>
    // )
}