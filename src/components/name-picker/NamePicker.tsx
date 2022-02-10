import { useRef, useState } from 'react';
import { Player } from '../api/player';
import { v4 as uuid} from 'uuid';
import './NamePicker.css';

export default function NamePicker(props: {setPlayer: (player: Player) => void}) {
  const [playerName, setPlayerName] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  
  const onClick = () => {
    props.setPlayer({
      name: playerName,
      id: uuid()
    });
    
    const element = ref.current;
    console.log(element);

    if (element)
      element.style.visibility = 'hidden';
  }

  return (
    <div className='name-picker' ref={ref}>
      <div className='container'>
        <div className='form'>
          <input className='name hand-written' placeholder='Name' onChange={e => {setPlayerName(e.target.value)}}></input>
          <button className='submit hand-written' onClick={onClick}>continue</button>
        </div>
      </div>
    </div>
  )
}