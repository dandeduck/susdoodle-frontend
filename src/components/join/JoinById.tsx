import gsap from 'gsap';
import { useEffect, useState } from 'react';
import './JoinById.css';

export default function JoinById() {
  const [roomNumber, setRoomNumber] = useState(0);

  const onClick = (e: any) => {

  }

  return (
    <div className='join-room'>
      <input id='id' placeholder='123456' className='hand-written' onChange={e => {
        const val = e.target.value;

        if (val.length < 7)
          setRoomNumber(parseInt(val));
      }} value={roomNumber > 0 ? roomNumber : ""}></input>
      <button onClick={onClick} className="hand-written">Join</button>
    </div>
  )
}