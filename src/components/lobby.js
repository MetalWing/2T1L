import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Grid, Container } from '@material-ui/core';

import { db } from "../services/firebase";

import { makeStyles } from '@material-ui/core/styles';
import RegisterPlayer from './reusable/registerPlayer';

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

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function Lobby()  {
    let query = useQuery();

    const [fullRoomCode, setFullRoomCode] = useState('');
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

    window.addEventListener("storage",(function(e){
      console.log("IT CHANGED");
   }).bind(this));

    useEffect(() => {
        getRoomInfo();
    }, []);

      const getRoomInfo = () => {
        console.log("Trying to get room info");
        try {
          var rooms = db.ref('rooms');
            rooms.orderByChild("roomCode").equalTo(roomCode).once("child_added", function(snapshot) {
                setFullRoomCode(snapshot.key);
                setRoomName(snapshot.val().roomName);
                setRoomObj(snapshot.val());
              });
          } catch (error) {
              console.log('Whoops?');
          }
      }

      const generatePlayerAvatars = () =>{
        console.log("Room obj", roomObj);
        const playersHTML = [];
        for(var key in roomObj?.players) {
          var value = roomObj?.players[key].name;
          console.log("value:", value);
          playersHTML.push(value)
      }
        return playersHTML;
      }

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
                    {generatePlayerAvatars()}
                  </Grid>
                  </Grid>
              </Grid>
      </Container>
    return content;
}