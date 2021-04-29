import React, { useState, useRef } from 'react';

import { db } from "../../services/firebase";
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

export default function RegisterPlayerForm(props)  {
    const [name, setName] = useState('');
    const [statementOneInput, setStatementOneInput] = useState('');
    const [statementTwoInput, setStatementTwoInput] = useState('');
    const [statementThreeInput, setStatementThreeInput] = useState('');
    const [startClicked, setStartClicked] = useState(false);

    const nameInputRef = useRef();
    const statementOneInputRef = useRef();
    const statementTwoInputRef = useRef();
    const statementThreeInputRef = useRef();
    
    const validateAndGo = (event) => {
      let nameInput = (nameInputRef.current.value !== '');
      let input1 = (statementOneInputRef.current?.value !== '');
      let input2 = (statementTwoInputRef.current?.value !== '');
      let input3 = (statementThreeInputRef.current?.value !=='');
      if (nameInput && input1 && input2 && input3) {
        var playerObject = {
            name: name,
            lie: statementThreeInput,
            truth1:statementOneInput,
            truth2:statementTwoInput};
            props.handleJoin(playerObject);
      }
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
                </Grid>
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
                </Grid>
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
                </Grid>
                <Grid container spacing={1} style={{width: '100%'}}>
                    <Grid item xs={12}>
                    <Button 
                        color='primary' 
                        fullWidth={true} 
                        variant='outlined'
                        onClick={validateAndGo}>
                            <Grid>
                                <PlayArrowIcon style={{ fontSize: 40 }} /><br />Join
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}