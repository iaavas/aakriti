import React from "react";
import { Grid, Paper } from "@mui/material";

import Canvas from "../components/canvas/Canvas";

function Page() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper>
          <p>Players List</p>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper>haha here</Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <p>Round here</p>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <Canvas height={200} width={200} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Page;
