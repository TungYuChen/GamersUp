import React from "react";
import AudioPlayer from "./AudioPlayer";
import Notifications from "./Notifications";
import Options from "./Options";

const ChatEntrance = () => {
    return (
        <div class="btn-group-toggle" data-toggle="buttons">
         <label class="btn btn-secondary active">
            <input type="checkbox" checked autocomplete="off"> Checked </input>
        </label>
        <AudioPlayer />
        <Options>
            <Notifications />
        </Options>
        { /* AudioPlayer */ }
        </div>
    )
}

export default ChatEntrance;