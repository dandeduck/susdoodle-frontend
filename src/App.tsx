import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import './App.css';
import { v4 as uuid } from 'uuid';
import { createRoom, joinRoom } from './components/api/api';
import { Player } from './components/api/player';
import NamePicker from './components/name-picker/NamePicker';
import Logo from './components/logo/Logo';

export const playerContext = createContext<Player>({id: "", name: ""});

function App() {
  const [player, setPlayer] = useState<Player>({id: "", name: ""});

  // useEffect(() => {
  //   const socket = io("ws://localhost:4001", {transports: ['websocket']});
  //   const player = {name: "Daniel", id: uuid()};

  //   socket.on("connect", () => {
  //     initGame(player, socket);
  //   });
  // }, []);
  
  // const initGame = async (player: Player, socket: Socket) => {
  //   const roomNumber = (await createRoom(player, {isOpen: true, size: 5, doodleTime: 30, length: 2, categories: ["person", "activity"]})).roomNumber;
  //   await joinRoom(player, roomNumber);
  //   socket.emit("join", {player: player, room: roomNumber}, (response: any) => {
  //     console.log(response);
  //   });
  // }
  useEffect(() => {
    if (player.id === "") {
      const stored = sessionStorage.getItem('player');

      if (stored && stored.length) {
        const parsed = JSON.parse(stored);

        if (parsed.id !== "")
          setPlayer(parsed);
      }
    }
    else
      sessionStorage.setItem('player', JSON.stringify(player));
  }, [player]);

  return (
    <div className="app">
      <Logo/>
      <playerContext.Provider value={player}>
        {player.id == "" ? <NamePicker setPlayer={setPlayer}/> : <span></span>}
      </playerContext.Provider>
    </div>
  );
}

export default App;
