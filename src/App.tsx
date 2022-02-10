import React, { useEffect } from 'react';
import logo from './logo.svg';
import { io, Socket } from "socket.io-client";
import './App.css';
import { v4 as uuid } from 'uuid';
import { createRoom, joinRoom } from './components/api/api';
import { Player } from './components/api/player';

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
