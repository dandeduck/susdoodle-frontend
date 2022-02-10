import { createContext, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import './App.css';
import { v4 as uuid } from 'uuid';
import { createRoom, joinRoom } from './components/api/api';
import { Player } from './components/api/player';
import NamePicker from './components/name-picker/NamePicker';
import Logo from './components/logo/Logo';

export const playerContext = createContext({});

function App() {
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    const socket = io("ws://localhost:4001", {transports: ['websocket']});
    const player = {name: "Daniel", id: uuid()};

    socket.on("connect", () => {
      initGame(player, socket);
    });
  });
  
  const initGame = async (player: Player, socket: Socket) => {
    const roomNumber = (await createRoom(player, {isOpen: true, size: 5, doodleTime: 30, length: 2, categories: ["person", "activity"]})).roomNumber;
    await joinRoom(player, roomNumber);
    socket.emit("join", {player: player, room: roomNumber}, (response: any) => {
      console.log(response);
    });
  }

  return (
    <div className="app">
      <Logo/>
      <playerContext.Provider value={[player, setPlayer]}>
        <NamePicker setPlayer={setPlayer}/>
      </playerContext.Provider>
    </div>
  );
}

export default App;
