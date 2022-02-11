import { useState } from 'react';
import { Player } from '../api/player';
import { v4 as uuid} from 'uuid';
import gsap from 'gsap';
import './NamePicker.css';

export default function NamePicker(props: {setPlayer: (player: Player) => void}) {
  const [playerName, setPlayerName] = useState("");
  
  const onClick = () => {
    if (playerName.length > 2) {
      gsap.to('.name-picker', {
        y: -200,
        opacity: 0,
        duration: 0.3
      })
  
      setTimeout(() => props.setPlayer({
        name: playerName,
        id: uuid()
      }), 300);
    }
    else {
      const timeline = gsap.timeline();

      timeline.to('.name-picker .name', {
        x: -20,
        duration: 0.1
      })
      .to('.name-picker .name', {
        x: 10,
        duration: 0.1
      })
      .to('.name-picker .name', {
        x: 0,
        duration: 0.1
      });
      gsap.to('.name-picker .wrong', {
        opacity: 1
      });
    }
  }

  return (
    <div className='name-picker page'>
      <div className='form'>
        <div className='input'>
          <input className='name hand-written' placeholder='Name' onChange={e => {setPlayerName(e.target.value)}}></input>
          <span className='wrong hand-written'>* Must be at least 3 characters</span>
        </div>
        <button className='submit hand-written' onClick={onClick}>continue</button>
      </div>
    </div>
  )
}