import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RegisterPlayer({handleRegisterPlayer}) {
  const classes = useStyles();

  const [playerName, setPlayerName] = useState('');
  
  const handleEnterRoom = (e) => {
    handleRegisterPlayer(playerName)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField id="standard-basic" label="Standard" onChange={e => setPlayerName(e.target.value)} />
        <Button variant="contained" onClick={handleEnterRoom}>Default</Button>
      </CardContent>
    </Card>
  );
}
