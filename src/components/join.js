import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import UseQuery from './reusable/useQuery';
import { db } from "../services/firebase";


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

export default function Join() {
  const classes = useStyles();

  const [playerName, setPlayerName] = useState('');
  
  const handleEnterRoom = async(e) => {
    var playerObject = {
      name: playerName,
      lie: 'statementThreeInput',
      truth1:'statementOneInput',
      truth2:'statementTwoInput'
    };

    var rooms = db.ref('rooms');
    let fullRoomCode = ''
    db.ref('rooms').orderByChild("roomCode").equalTo(roomCode).once("child_added", function(snapshot) {
        console.log("Full room code", snapshot.key);
        fullRoomCode = snapshot.key;
      }).then((s) => {
        db.ref('rooms/'+ fullRoomCode + '/players/').push(playerObject).then((playerSnapshot) => {
          console.log("Pushing player. Ref:", playerSnapshot.key);
          localStorage.setItem('pInfo', roomCode + playerSnapshot.key);
        });
      });

    
  }

  useEffect(() => {
    // Check URL - it should have a room code
    // If it doesn't - just show an error message or something

    //  Check local storage for playerInfo - get room code and player name from it
    
    // Handle re-joining player
    // If the room code matches the URL ... player is probably re-joining
    // Get their name from the localStorage as well and if it exists in the room - put them in the lobby/game

    // If local storage is empty or room code doesn't match - we are joining a new game. Wipe playerInfo in localStorage
    // Get the player name & statements
    // Push them to DB - store the room code/player name in localStorage
    // Redirect to lobby
  }, []);

  let query = UseQuery();
  const roomCode = query.get('code');
  let pageContent = '';

  if (!roomCode || roomCode === '')
  {
    // They are joining without a code... in the future - let them enter code, but for now - error!
    console.log('No room code - no lobby! >:(');
    pageContent = <div>No room code - no lobby! {'>'}:(</div>
  }
  else {
    const pInfo = localStorage.getItem('pInfo');
    let pInfoRoomCode, pInfoName = '';
    if (pInfo)
    {
      pInfoRoomCode = pInfo.substring(0,4);
      pInfoName = pInfo.substring(4, pInfo.length);

      if (roomCode === pInfoRoomCode)
      {
        // If roomCode == pInfoRoomCode - rejoining player!
        // Otherwise...
        console.log('Rejoining, eh? Tough luck.. not implemented yet lol');
      }
      else
      {
        localStorage.setItem('pInfo', '');
      }
    }

    // This will be either undefined (no pInfo) or blank as it was reset in the code above
    // if (!pInfo || pInfo === '')
    {
      // Great - they want to join! Show them the form with name/statements.
      pageContent = (
        <Card className={classes.root}>
          <CardContent>
            <TextField id="standard-basic" label="Standard" onChange={e => setPlayerName(e.target.value)} />
            <Button variant="contained" onClick={handleEnterRoom}>Join</Button>
          </CardContent>
        </Card>
      );
    }
  }


  return pageContent;
}
