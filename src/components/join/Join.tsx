import gsap from 'gsap';
import { useState } from 'react';
import './Join.css';
import JoinById from './JoinById';
import JoinPublic from './JoinPublic';
import RoomCreation from './RoomCreation';

export default function Join() {
  const [selected, setSelected] = useState(<span/>);

  const onClick = (e: any, choice: JSX.Element) => {
    // gsap.to('.buttons', {
    //   x: -200
    // });
    gsap.to ('.selected', {
      width: "30rem"
    });

    setSelected(choice);
  }

  return (
    <div className='join'>
      <div className='buttons'>
        <button className='hand-written' onClick={e => onClick(e, <JoinById/>)}>Join room by id</button>
        <button className='hand-written' onClick={e => onClick(e, <RoomCreation/>)}>Create room</button>
        <button className='hand-written' onClick={e => onClick(e, <JoinPublic/>)}>Join a public room</button>
      </div>
      <div className='selected'>
        {selected}
      </div>
    </div>
  )
}