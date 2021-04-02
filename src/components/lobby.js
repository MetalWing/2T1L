// import React from "react";

// export default class Lobby extends React.Component {
//     render() {
//       return <h1>Hello, {this.props.name}</h1>;
//     }
//   }

  import React from 'react';
import Switch from '@material-ui/core/Switch';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '@material-ui/core';



export default function Lobby() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div >
      <div>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Fade  in={checked}>
        <TextField id="outlined-basic" size="large" variant="outlined" fullWidth={true} />
        </Fade>
      </div>
    </div>
  );
}
