import gsap from 'gsap';
import { useState } from 'react';
import './Join.css';
import JoinById from './JoinById';
import JoinPublic from './JoinPublic';
import RoomCreation from './RoomCreation';

export default function Join() {
  const [selected, setSelected] = useState(<span/>);

  const onClick = (choice: JSX.Element) => {
    gsap.to ('.selected', {
      width: "30rem"
    });

    setSelected(choice);
  }

  return (
    <div className='join'>
      <div className='buttons'>
        <button className='hand-written' onClick={() => onClick(<JoinById/>)}>Join room by id</button>
        <button className='hand-written' onClick={() => onClick(<RoomCreation/>)}>Create room</button>
        <button className='hand-written' onClick={() => onClick(<JoinPublic/>)}>Join a public room</button>
      </div>
      <div className='selected'>
        {selected}
      </div>
    </div>
  )
}