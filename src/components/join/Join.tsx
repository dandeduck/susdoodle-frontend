import gsap from 'gsap';
import { useState } from 'react';
import './Join.css';
import JoinById from './JoinById';

export default function Join() {
  const [selected, setSelected] = useState(0);

  const selectedHtml = () => {
    switch (selected) {
      case 1:
        return <JoinById/>
    
      default:
        return <span/>
    }
  }

  const onClick = (e: any, choice: number) => {
    gsap.to('.buttons', {
      x: -200
    });

    setSelected(choice);
  }

  return (
    <div className='join'>
      <div className='buttons'>
        <button className='hand-written' onClick={e => onClick(e, 1)}>Join room by id</button>
        <button className='hand-written' onClick={e => onClick(e, 2)}>Create room</button>
        <button className='hand-written' onClick={e => onClick(e, 3)}>Join open room</button>
      </div>
      {selectedHtml()}
    </div>
  )
}