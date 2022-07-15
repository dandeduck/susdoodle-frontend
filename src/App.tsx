import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import { Player } from './components/api/player';
import NamePicker from './components/name-picker/NamePicker';
import Logo from './components/logo/Logo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './components/join/Join';
import Waiting from './components/waiting/Waiting';
import { io, Socket } from 'socket.io-client';
import config from './config';

export const playerContext = createContext<Player>({id: "", name: ""});
export const socketContext = createContext<Socket>(io(config.apiSocket, {transports: ['websocket']}));

function App() {
  const [player, setPlayer] = useState<Player>({id: "", name: ""});

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
                <Route path='/rooms/:roomId' element={<Waiting/>}/>
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
