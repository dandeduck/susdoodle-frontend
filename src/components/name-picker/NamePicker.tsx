import { useContext, useEffect, useRef, useState } from 'react';
import { Player } from '../api/player';
import { v4 as uuid} from 'uuid';
import gsap from 'gsap';
import './NamePicker.css';
import { playerContext } from '../../App';

export default function NamePicker(props: {setPlayer: (player: Player) => void}) {
  const [playerName, setPlayerName] = useState("");
  
  const onClick = () => {
    gsap.to('.name-picker .container', {
      y: -200,
      opacity: 0,
      duration: 0.3
    })
    gsap.to('.name-picker', {
      opacity: 0,
      duration: 0.3
    })

    setTimeout(() => props.setPlayer({
      name: playerName,
      id: uuid()
    }), 600);
  }

  return (
    <div className='name-picker'>
      <div className='container'>
        <div className='form'>
          <input className='name hand-written' placeholder='Name' onChange={e => {setPlayerName(e.target.value)}}></input>
          <button className='submit hand-written' onClick={onClick}>continue</button>
        </div>
      </div>
    </div>
  )
}