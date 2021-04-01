import React from "react";

import { Button, Grid } from '@material-ui/core';

export default class Home extends React.Component {
    render() {
      return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
      
        <Grid item xl={12}>
            <Button variant="outlined" color="primary">Host</Button>
            <Button variant="outlined" color="primary">Join</Button>
            <Button variant="outlined" color="primary">Rules</Button>
        </Grid>
      </Grid> 
      );
    }
  }