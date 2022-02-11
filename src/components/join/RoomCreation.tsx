import { ThemeProvider } from '@emotion/react';
import { createTheme, Slider, Switch } from '@mui/material'
import { red } from '@mui/material/colors';
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

  return (
    <div className='room-creation hand-written'>
      <ThemeProvider theme={theme}>
        <span className='text'>Size</span>
        <Slider defaultValue={3} className='slider' color='primary' valueLabelDisplay="off" marks={sizeMarks} step={1} min={3} max={10} sx={{width: "15rem", color: "var(--red-accent)"}}/>
        <span className='text'>Doodling time</span>
        <Slider defaultValue={30} className='slider' valueLabelDisplay="off" marks={lengthMarks} step={5} min={10} max={60} style={{width: "15rem", color: "var(--red-accent)"}}/>
        <div className='public text'>
          <span>Make the room public?</span>
          <Switch/>
        </div>
      </ThemeProvider>
      <button>Create</button>
    </div>
  )
}