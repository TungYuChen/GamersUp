import React, { useContext, useState, useStyles } from "react";
import { SoeckContext } from "../../context/SoeckContext";

const Options = ( { children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SoeckContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();
    
    
    return (        
        <div>
            <button onClick={leaveCall}>Leave</button>
            <button onClick={() => callUser(idToCall)}>Call</button>            
            {children}
        </div>
    )
}

export default Options;