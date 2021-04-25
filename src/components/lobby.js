import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UseQuery from './reusable/useQuery';

import { Grid, Container } from '@material-ui/core';

import PlayerList from './reusable/playerList'
import { db } from "../services/firebase";

import { makeStyles } from '@material-ui/core/styles';

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

export default function Lobby()  {
    let query = UseQuery();

    const [fullRoomCode, setFullRoomCode] = useState('');
    const [loading, isLoading] = useState(true);
    const [roomName, setRoomName] = useState('');
    const [players, setPlayers] = useState([]);
    const [roomObj, setRoomObj] = useState();
    const [playerName, setPlayerName] = useState('');

    const history = useHistory();
    const routeChange = (newPath) =>{
        history.push(newPath);
    }

    const roomCode = query.get('code');
    console.log("Got room code", roomCode);

    useEffect(() => {
        async function fetchRoom() {
          try {
            await db.ref('rooms').orderByChild("roomCode").equalTo(roomCode).once("value", function(snapshot) {
                const key = Object.keys(snapshot.val())[0];
                const roomObject = snapshot.val()[key];
                setFullRoomCode(Object.keys(snapshot.val())[0]);
                console.log("Lobby code", Object.keys(snapshot.val())[0]);
                setRoomName(roomObject.roomName);
                setRoomObj(roomObject);
                console.log("Room obj", roomObject);
              });
            } catch (error) {
                console.log('Whoops?');
            }
        };
    
        fetchRoom().then(() => {
          isLoading(false);
        })
    }, []);

      const generatePlayerAvatars = () =>{
        console.log("Room obj", roomObj);
        const playersHTML = [];
        for(var key in roomObj?.players) {
          var value = roomObj?.players[key].name;
          console.log("value:", value);
          const html = <p>{value}</p>
          playersHTML.push(html)
      }
        return playersHTML;
      }

      console.log("Loading", loading);
      var content = 
      <Container maxWidth='md'>
              <Grid 
              container
              spacing={1}
              alignItems='center'
              direction='column'
              justify='center'
              style={{ minHeight: '100vh', flexWrap: 'nowrap' }}>
                <Grid container spacing={1} style={{width: '100%'}}>
                  <Grid item xs={10}>
                    <h4>Room name: {roomName}</h4>
                  </Grid>
                  <Grid item xs={2}>
                    <h4>Code: {roomCode}</h4>
                  </Grid>
                  <Grid item sm={12}>
                    <h5>Players</h5>
                    {/* {generatePlayerAvatars()} */}
                    {!loading && <PlayerList roomRef={fullRoomCode} />}
                  </Grid>
                  </Grid>
              </Grid>
      </Container>
    return content;
}