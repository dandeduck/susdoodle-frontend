import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import { Player } from './components/api/player';
import NamePicker from './components/name-picker/NamePicker';
import Logo from './components/logo/Logo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './components/join/Join';

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
      <div className='app-container'>
        {player.id == "" ? <NamePicker setPlayer={setPlayer}/> : 
          <playerContext.Provider value={player}>
            <BrowserRouter>
              <Routes>
                <Route path='/*' element={<Join/>}/>
              </Routes>
            </BrowserRouter>
          </playerContext.Provider>
        }
      </div>
    </div>
  );
}

export default App;
