import { useContext, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { playerContext, socketContext } from '../../App';
import { joinRoom, leaveRoom } from '../api/api';
import './Waiting.css'

export default function() {
  const player = useContext(playerContext);
  const socket = useContext(socketContext);
  const { roomId } = useParams();
  
  useEffect(() => {
    joinRoom(player, roomId);
    socket.emit("join", {player: player, room: roomId}, (response: any) => {
      console.log(response);
    });

    return () => {
      leaveRoom(player, roomId);
      socket.emit("leave", {player: player});
    }
  }, []);
  return (
    <div className='waiting'>
      <h1>{roomId}</h1>
    </div>
  )
}