import React from "react";

import { Button, Grid, Container, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: "25%"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function Home()  {
    const classes = useStyles();
    return (
        <Container maxWidth="md">
                <Grid 
                container
                spacing={1}
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh', flexWrap: 'nowrap' }}>
                    <Grid item xs={12}>
                        <Button color="primary" fullWidth={true} variant="outlined">
                            <Grid>
                                <PersonIcon /><br />Host
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" fullWidth={true} variant="outlined">
                            <Grid>
                                <PeopleIcon /><br />Join
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" fullWidth={true} variant="outlined">
                            <Grid>
                                <HelpIcon /><br />Help
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
        </Container>
    );
}