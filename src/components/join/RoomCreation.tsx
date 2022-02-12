import { ThemeProvider } from '@emotion/react';
import { Checkbox, createTheme, FormControlLabel, FormGroup, Slider, Switch } from '@mui/material'
import { red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { playerContext } from '../../App';
import config from '../../config';
import { createRoom, joinRoom } from '../api/api';
import './RoomCreation.css'

export default function RoomCreation() {
  const sizeMarks = [
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  const lengthMarks = [
    {
      value: 10,
      label: '10',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 60,
      label: '60',
    }
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: red[500]
      }
    }
  });

  const player = useContext(playerContext);
  const [socket, setSocket] = useState<Socket>();
  const [roomConf, setRoomConf] = useState({isOpen: false, size: 3, doodleTime: 30, length: 3, categories: ["person", "activity", "animal", "food", "thing", "movie"]})
  const navigate = useNavigate();

  const onClick = async () => {
    const roomId = (await createRoom(player, roomConf)).id as string;
    navigate('/rooms/'+roomId);
  }

  const onCheckboxChanged = (data: boolean, category: string) => {
    if (data)
      roomConf.categories.push(category);
    else {
      const index = roomConf.categories.indexOf(category);
      if (index > -1)
        roomConf.categories.splice(index, 1);
    }
  }

  return (
    <div className='room-creation hand-written'>
      <ThemeProvider theme={theme}>
        <div className='column'>
          <span className='text'>Size (players)</span>
          <Slider defaultValue={3} className='slider' color='primary' valueLabelDisplay="off" marks={sizeMarks} step={1} min={3} max={10} sx={{width: "15rem", color: "var(--red-accent)"}} onChange={(e, data) => setRoomConf({...roomConf, size: data as number})}/>
          <span className='text'>Length (rounds)</span>
          <Slider defaultValue={5} className='slider' valueLabelDisplay="off" marks={sizeMarks} step={1} min={3} max={10} style={{width: "15rem", color: "var(--red-accent)"}} onChange={(e, data) => setRoomConf({...roomConf, length: data as number})}/>
          <span className='text'>Doodling time (seconds)</span>
          <Slider defaultValue={30} className='slider' valueLabelDisplay="off" marks={lengthMarks} step={5} min={10} max={60} style={{width: "15rem", color: "var(--red-accent)"}} onChange={(e, data) => setRoomConf({...roomConf, doodleTime: data as number})}/>
        </div>
        <div className='column'>
          <span className='text'>Doodle categories:</span>
          <FormGroup className='checkboxes'>
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e, data) => onCheckboxChanged(data, "activity")}/>} label="Activities" />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e, data) => onCheckboxChanged(data, "animal")}/>} label="Animals" />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e, data) => onCheckboxChanged(data, "person")}/>} label="People" />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e, data) => onCheckboxChanged(data, "food")}/>} label="Food" />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e, data) => onCheckboxChanged(data, "movie")}/>} label="Movies" />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e, data) => onCheckboxChanged(data, "thing")}/>} label="Things" />
          </FormGroup>
          <div className='public text'>
            <span>Make the room public?</span>
            <Switch onChange={(e, data) => setRoomConf({...roomConf, isOpen: data})}/>
          </div>
            <button onClick={onClick} className="hand-written">Create</button>
        </div>
      </ThemeProvider>
    </div>
  )
}