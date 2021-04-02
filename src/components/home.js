import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Grid, Container, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fade from '@material-ui/core/Fade';


import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function Home()  {
    const [join, joinClicked] = useState(false);
    const history = useHistory();
    const routeChange = (newPath) =>{
        history.push(newPath);
    }
    const [checked, setChecked] = React.useState(false);

    const handleJoinClicked = () => {
      joinClicked((prev) => !prev);
    };
    return (
        <Container maxWidth="md">
                <Grid 
                container
                spacing={1}
                alignItems="center"
                direction="column"
                justify="center"
                style={{ minHeight: '100vh', flexWrap: 'nowrap' }}>
                    <Grid item xs={12} style={{width: "100%"}}>
                        <Button 
                        color="primary" 
                        fullWidth={true} 
                        variant="outlined"
                        onClick={() => routeChange('lobby')}>
                            <Grid>
                                <PersonIcon style={{ fontSize: 40 }} /><br />Host
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{width: "100%"}}>
                        {!join && <Button
                        color="primary" 
                        fullWidth={true}
                        variant="outlined"
                        onClick={handleJoinClicked}>
                            <Grid>
                                <PeopleIcon style={{ fontSize: 40 }} /><br />Join
                            </Grid>
                        </Button>}
                        <Fade in={join} timeout={{ enter: 1000 }} unmountOnExit>
                        <TextField id="outlined-basic" variant="outlined" fullWidth={true} InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PeopleIcon style={{ fontSize: 40 }} />
                              </InputAdornment>
                            )
                          }} /></Fade>
                    </Grid>
                    <Grid item xs={12} style={{width: "100%"}}>
                        <Button 
                        color="primary" 
                        fullWidth={true} 
                        variant="outlined" 
                        onClick={() => routeChange('help')}>
                            <Grid>
                                <HelpIcon style={{ fontSize: 40 }} /><br />Help
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
        </Container>
    );
}

function showRoomCodePrompt() {
    console.log('%c ayy lmao', 'color: hotpink');
}