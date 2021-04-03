import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Container, TextField, Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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

export default function Lobby()  {
    const [hostOnly, setHostOnly] = useState(false);

    const history = useHistory();
    const routeChange = (newPath) =>{
        history.push(newPath);
    }

    const handleHostOnlyClicked = () => {
      setHostOnly((prev) => !prev);
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
                style={{ minHeight: '100vh', marginTop: '1em', flexWrap: 'nowrap' }}>
                    <Grid item xs={12} style={{width: '100%'}}>
                    <TextField color='primary' type='text' variant='outlined' fullWidth={true} 
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
                      <TextField color='primary' type='text' variant='outlined' fullWidth={true} 
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
                      <TextField color='primary' type='text' multiline variant='outlined' fullWidth={true} 
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
                      <TextField color='primary' type='text' multiline variant='outlined' fullWidth={true} 
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
                      <TextField color='primary' type='text' multiline variant='outlined' fullWidth={true} 
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
                        onClick={() => routeChange('lobby')}>
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