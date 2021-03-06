import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { db } from "../services/firebase";
import md5 from 'md5'

import { Grid, Container, TextField, Button } from '@material-ui/core';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input1: {
        fontSize: 'x-large',
        color: theme.palette.primary.main
      },
      input2: {
        fontSize: 'x-large',
        color: theme.palette.primary.main
      },
    specialOutline: {
        borderColor: theme.palette.primary.main,
    }
  }));

  const BlueSwitch = withStyles({
    switchBase: {
      color: '#3f50b5',
      '&$checked': {
        color: '#3f50b5',
      },
      '&$checked + $track': {
        backgroundColor: '#3f50b5',
        opacity: 0.8
      },
    },
    checked: {},
    track: {},
  })(Switch);

export default function CreateRoom()  {
    const [hostOnly, setHostOnly] = useState(false);
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('')
    const [statementOneInput, setStatementOneInput] = useState('');
    const [statementTwoInput, setStatementTwoInput] = useState('');
    const [statementThreeInput, setStatementThreeInput] = useState('');
    const [startClicked, setStartClicked] = useState(false);

    const nameInputRef = useRef();
    const statementOneInputRef = useRef();
    const statementTwoInputRef = useRef();
    const statementThreeInputRef = useRef();

    const history = useHistory();
    const routeChange = (newPath) =>{
        history.push(newPath);
    }

    const handleHostOnlyClicked = () => {
      setHostOnly((prev) => !prev);
    };

    
    const validateAndGo = (event) => {
      setStartClicked(true);
      let nameInput = (nameInputRef.current.value !== '');
      let input1 = (statementOneInputRef.current?.value !== '');
      let input2 = (statementTwoInputRef.current?.value !== '');
      let input3 = (statementThreeInputRef.current?.value !=='');
      if (nameInput && ((input1 && input2 && input3) || hostOnly)) {
        handleSubmit(event).then((roomCode) => {
          routeChange('lobby?code=' + roomCode);
        });
      }
    }

    const handleSubmit = async(event) => {
      event.preventDefault();

      // Host
      var playerObject = {
          connected: true,
          name: name,
          lie: statementThreeInput,
          truth1:statementOneInput,
          truth2:statementTwoInput};

      var roomObject = {
        roomName: roomName,
        gameInProgress: false,
        hostName: '',
        timestamp: Date.now(),
        players:  []
      };

      // if (!hostOnly)
      // {
      //   let playerRef = roomObject.players.push(playerObject);
      //   console.log("Pushing player. Ref:", playerRef.key);
      // }

      try {
        // Set key to blank
        var key = '';

        // Create the room in DB using roomObject and store the unique key value
        await db.ref('rooms').push(roomObject).then((snapshot) => {
          key = snapshot.key;
        });

        // Generate 4 character room code from the key
        var roomCode = (md5(key)).toString(16).substring(0, 4).toUpperCase();

        // Update the room in DB with the room code
        await db.ref('rooms/'+ key).update({
          roomCode: roomCode,
        });

        // Add the player to the room and store the unique reference to localStorage
        if (!hostOnly)
        {
          await db.ref('rooms/'+ key + '/players').push(playerObject).then((playerSnapshot) => {
            console.log("Pushing player. Ref:", playerSnapshot.key);
            console.log('rooms/' + key + '/hostName');
            db.ref('rooms/' + key + '/hostName').set(playerSnapshot.key);
            localStorage.setItem('pInfo', roomCode + playerSnapshot.key);
          });
        }
        
      } catch (error) {
        console.log('welp...',error.message);
      }
      return roomCode;
    }

    const classes = useStyles();

    return (
        <Container maxWidth='md'>
            <Grid 
            container
            spacing={1}
            alignItems='center'
            direction='column'
            justify='center'
            style={{ minHeight: '100vh', marginTop: '1em', flexWrap: 'nowrap' }}>
                <Grid item xs={12} style={{width: '100%'}}>
                <TextField color='primary' type='text' variant='outlined' fullWidth={true} 
                  value={roomName} onChange={e => setRoomName(e.target.value)}
                        InputProps={{
                        placeholder: 'Room name (optional)',
                        classes: { 
                            input: classes.input1,
                            notchedOutline: classes.specialOutline,
                            focused: classes.specialOutline
                        }
                      }} />
                </Grid>
                <Grid item xs={12} style={{width: '100%'}}>
                  <TextField 
                  inputRef={nameInputRef} 
                  error={startClicked && name === ''} 
                  label={(startClicked && name === '') ? 'Required' : ''}
                  value={name} onChange={e => setName(e.target.value)}
                  color='primary' 
                  type='text' 
                  variant='outlined' 
                  fullWidth={true} 
                        InputProps={{
                        placeholder: 'Your name',
                        classes: { 
                            input: classes.input1,
                            notchedOutline: classes.specialOutline,
                            focused: classes.specialOutline
                        }
                      }} />
                </Grid>
                <Grid item xs={12} style={{width: '100%'}}>
                  <FormControlLabel classes={{label: classes.input2}} control=
                  {<BlueSwitch 
                      checked={hostOnly} classes={classes.switchStyle1}
                      onChange={handleHostOnlyClicked}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />}  label="HOST ONLY" />
                </Grid>
                {!hostOnly && 
                <Grid item xs={12} style={{width: '100%'}}>
                  <TextField inputRef={statementOneInputRef}
                  error={startClicked && statementOneInput === ''} 
                  label={(startClicked && statementTwoInput === '') ? 'Required' : ''}
                  value={statementOneInput} onChange={e => setStatementOneInput(e.target.value)}
                      color='primary' 
                      type='text' 
                      multiline 
                      variant='outlined' 
                      fullWidth={true} 
                      InputProps={{
                      placeholder: 'Statement 1',
                      classes: { 
                          input: classes.input1,
                          notchedOutline: classes.specialOutline,
                          focused: classes.specialOutline
                      }
                  }} />
                </Grid> }
                {!hostOnly &&
                <Grid item xs={12} style={{width: '100%'}}>
                  <TextField inputRef={statementTwoInputRef}
                  error={startClicked && statementTwoInput === ''} 
                  label={(startClicked && statementTwoInput === '') ? 'Required' : ''}
                  value={statementTwoInput} onChange={e => setStatementTwoInput(e.target.value)}
                      color='primary'
                      type='text' 
                      multiline 
                      variant='outlined' 
                      fullWidth={true} 
                        InputProps={{
                        placeholder: 'Statement 2',
                        classes: { 
                            input: classes.input1,
                            notchedOutline: classes.specialOutline,
                            focused: classes.specialOutline
                        }
                      }} />
                </Grid>}
                {!hostOnly &&
                <Grid item xs={12} style={{width: '100%'}}>
                  <TextField inputRef={statementThreeInputRef}
                  error={startClicked && statementThreeInput === ''} 
                  label={(startClicked && statementTwoInput === '') ? 'Required' : ''}
                  value={statementThreeInput} onChange={e => setStatementThreeInput(e.target.value)}
                  color='primary' 
                  type='text' 
                  multiline 
                  variant='outlined' 
                  fullWidth={true} 
                        InputProps={{
                        placeholder: 'Statement 3',
                        classes: { 
                            input: classes.input1,
                            notchedOutline: classes.specialOutline,
                            focused: classes.specialOutline
                        }
                      }} />
                </Grid>}
                <Grid container spacing={1} style={{width: '100%'}}>
                    <Grid item xs={6}>
                    <Button 
                        color='primary' 
                        fullWidth={true} 
                        variant='outlined'
                        onClick={() => routeChange('/')}>
                            <Grid>
                                <ArrowBackIcon style={{ fontSize: 40 }} /><br />Back
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button 
                        color='primary' 
                        fullWidth={true} 
                        variant='outlined'
                        onClick={validateAndGo}>
                            <Grid>
                                <PlayArrowIcon style={{ fontSize: 40 }} /><br />Start
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}