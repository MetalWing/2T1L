import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, Container } from '@material-ui/core';

import UseQuery from './reusable/useQuery';
import { db } from "../services/firebase";
import RegisterPlayerForm from './reusable/registerPlayerForm';

export default function Join() {
  const [snapshot, setSnapshot] = useState();
  const [showRegisterPlayerForm, setShowRegisterPlayerForm] = useState(false);


  let query = UseQuery();
  const roomCode = query.get('code');

  const history = useHistory();
  const routeChange = (newPath) =>{
      history.push(newPath);
  }

  const getRoomInfo = async () => {
    const dbRef = 'rooms';
    await db.ref('rooms').orderByChild("roomCode").equalTo(roomCode).once("child_added").then((s) => {
      db.ref('rooms').child(s.key).get().then((snapshot) => {
        if (snapshot.exists()) {
          setSnapshot(snapshot);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  };

  if (!snapshot) getRoomInfo();

  const pInfo = localStorage.getItem('pInfo');
  let pInfoRoomCode, pInfoName = '';
  if (pInfo) {
    pInfoRoomCode = pInfo.substring(0, 4);
    pInfoName = pInfo.substring(4, pInfo.length);

    if (roomCode === pInfoRoomCode) {
      // If roomCode == pInfoRoomCode - rejoining player!
      // Otherwise...
      console.log('Rejoining, eh? Tough luck.. not implemented yet lol');
    }
    else {
      localStorage.setItem('pInfo', '');
    }
  }

  // This will be either undefined (no pInfo) or blank as it was reset in the code above
  if ((!pInfo || pInfo === '') && !showRegisterPlayerForm) {
    // Great - they want to join! Show them the form with name/statements.
    setShowRegisterPlayerForm(true);
  }

  const handleJoin = (playerObject) => {
    console.log("join clicked!", playerObject);
    db.ref('rooms/' + snapshot.key + '/players/').push(playerObject).then((playerSnapshot) => {
      console.log("Pushing player. Ref:", playerSnapshot.key);
      localStorage.setItem('pInfo', roomCode + playerSnapshot.key);
      routeChange('lobby?code='+roomCode);
    });
  }

  return (snapshot) ?
    <Container maxWidth='md'>
      <Grid
        container
        spacing={1}
        alignItems='center'
        direction='column'
        justify='center'
        style={{ minHeight: '100vh', marginTop: '1em', flexWrap: 'nowrap' }}>
        <Grid item xs={12} style={{ width: '100%' }}>
          You are joining {snapshot.val().roomName} [{snapshot.val().roomCode}]
            {showRegisterPlayerForm && <RegisterPlayerForm handleJoin={handleJoin} />}
        </Grid>
      </Grid>
    </Container> : <div>lol</div>;
}
