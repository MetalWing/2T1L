import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Grid, Container } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';



export default function Home()  {
    const history = useHistory();

    const routeChange = (newPath) =>{
        history.push(newPath);
    }
    return (
        <Container maxWidth="md">
                <Grid 
                container
                spacing={1}
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh', flexWrap: 'nowrap' }}>
                    <Grid item xs={12}>
                        <Button 
                        color="primary" 
                        fullWidth={true} 
                        variant="outlined"
                        onClick={() => routeChange('lobby')}>
                            <Grid>
                                <PersonIcon /><br />Host
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        color="primary" 
                        fullWidth={true} 
                        variant="outlined">
                            <Grid>
                                <PeopleIcon /><br />Join
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                        color="primary" 
                        fullWidth={true} 
                        variant="outlined" 
                        onClick={() => routeChange('help')}>
                            <Grid>
                                <HelpIcon /><br />Help
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
        </Container>
    );
}