import React, {useState} from "react";
import {SocketContext} from "../../context/SocketContext";

const AudioPlayer = () => {
    const [stream, userAudio] = useState(SocketContext);
    return (
        <div className="audio">
            {stream && <audio ref={userAudio}></audio>}
        </div>
    )
}

export default AudioPlayer;