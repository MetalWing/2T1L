import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Grid, Container, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';


import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';

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

export default function Home()  {
    const [join, joinClicked] = useState(false);
    const history = useHistory();
    const routeChange = (newPath) =>{
        history.push(newPath);
    }

    const handleJoinClicked = () => {
      joinClicked((prev) => !prev);
    };

    const classes = useStyles();

    return (
        <Container maxWidth='md'>
                <Grid 
                container
                spacing={1}
                alignItems='center'
                direction='column'
                justify='center'
                style={{ minHeight: '100vh', flexWrap: 'nowrap' }}>
                    <Grid item xs={12} style={{width: '100%'}}>
                        <Button 
                        color='primary' 
                        fullWidth={true} 
                        variant='outlined'
                        onClick={() => routeChange('lobby')}>
                            <Grid>
                                <PersonIcon style={{ fontSize: 40 }} /><br />Host
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{width: '100%'}}>
                        {!join && <Button
                        color='primary' 
                        fullWidth={true}
                        variant='outlined'
                        onClick={handleJoinClicked}>
                            <Grid>
                                <PeopleIcon style={{ fontSize: 40 }} /><br />Join
                            </Grid>
                        </Button>}
                        {join &&
                        <TextField color='primary' type='text' variant='outlined' fullWidth={true} 
                            InputProps={{
                            placeholder: 'Enter room code',
                            startAdornment: (
                              <InputAdornment position='start'>
                                <PeopleIcon color='primary'  style={{ fontSize: 40 }} />
                              </InputAdornment>
                            ),
                            classes: { 
                                input: classes.input1,
                                notchedOutline: classes.specialOutline,
                                focused: classes.specialOutline
                            }
                          }}
                          inputProps={{
                            maxLength: 4
                          }} />}
                    </Grid>
                    <Grid item xs={12} style={{width: '100%'}}>
                        <Button 
                        color='primary' 
                        fullWidth={true} 
                        variant='outlined' 
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