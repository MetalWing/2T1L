import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UseQuery from './reusable/useQuery';

import { Grid, Container, Button } from '@material-ui/core';

import PlayerList from './reusable/playerList'
import { db } from "../services/firebase";

import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  input1: {
    height: 48,
    fontSize: 'xxx-large',
    color: theme.palette.primary.main
  },
  specialOutline: {
    borderColor: theme.palette.primary.main,
  }
}));

export default function Game() {
  let query = UseQuery();

  const [roomSnapshot, setRoomSnapshot] = useState();
  const [playerIsHost, setPlayerIsHost] = useState('');

  const history = useHistory();
  const routeChange = (newPath) => {
    history.push(newPath);
  }

  const roomCode = query.get('code');

  console.log("render");

  useEffect(() => {
    async function fetchRoom() {
      await db.ref('rooms').orderByChild("roomCode").equalTo(roomCode).once("child_added").then((s) => {
        db.ref('rooms').child(s.key).get().then((snapshot) => {
          if (snapshot.exists()) {
            setRoomSnapshot(snapshot);
            const pInfo = localStorage.getItem('pInfo');
            const playerName = pInfo?.substring(4, pInfo.length);
            var presenceRef = db.ref(`rooms/${snapshot.key}/players/${playerName}/connected`);
            // Write a string when this client loses connection
            presenceRef.onDisconnect().set(false);

            if (playerName == snapshot.val().hostName) setPlayerIsHost(true);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      });
    };

    fetchRoom();
  }, []);

  // const generatePlayerAvatars = () => {
  //   console.log("Room obj", roomObj);
  //   const playersHTML = [];
  //   for (var key in roomObj?.players) {
  //     var value = roomObj?.players[key].name;
  //     console.log("value:", value);
  //     const html = <p>{value}</p>
  //     playersHTML.push(html)
  //   }
  //   return playersHTML;
  // }
  
  var content =
    <Container maxWidth='md'>
      {roomSnapshot ? <Grid
        container
        spacing={1}
        alignItems='center'
        direction='column'
        justify='center'
        style={{ minHeight: '100vh', flexWrap: 'nowrap' }}>
        <Grid container spacing={1} style={{ width: '100%' }}>
          <Grid item xs={10}>
            <h1>ITS HAPPENING!!</h1>
            <h4>Room name: {roomSnapshot.val().roomName}</h4>
          </Grid>
          <Grid item xs={2}>
            <h4>Code: {roomSnapshot.val().roomCode}</h4>
          </Grid>
          <Grid item sm={12}>
            <h5>Players</h5>
            {/* {generatePlayerAvatars()} */}
            <PlayerList roomRef={roomSnapshot.key} />
          </Grid>
          {playerIsHost && 
          <Grid item sm={12}>
          <Button 
            color='primary' 
            fullWidth={true} 
            variant='outlined'
            onClick={() => ({})}>
                <Grid>
                    <PlayArrowIcon style={{ fontSize: 40 }} /><br />Begin!
                </Grid>
            </Button>
          </Grid>}
        </Grid> 
      </Grid> : <div>eh...</div>}
    </Container>
  return content;
}