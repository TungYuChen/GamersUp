import { createContext } from 'react';
import socketIOClient from 'socket.io-client';
const WS = "http://localhost:3000";

const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent = ({ children }) => {
    <RoomContext.Provider value = {{ ws }}>{ children }</RoomContext.Provider>
};
