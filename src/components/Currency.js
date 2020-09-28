import React from "react";
import "./style.css";
import { Grid, Paper, Box, IconButton, Divider } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircle";

function Currency(props) {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  // Format into 2 decimal places
  const rate = parseFloat(props.rate).toFixed(2);
  // Format into comma separated number
  const rateFormatted = Number(rate).toLocaleString("en", options);
  const total = rate * props.value;
  const totalFormatted = Number(total).toLocaleString("en", options);
  return (
    <Grid item lg={12} xs={12}>
      <Paper variant="outlined">
        <Box p={2}>
          <Grid container direction="row" spacing={2}>
            <Grid item container direction="column" lg={10} xs={10}>
              <Grid item container direction="row" justify="space-between">
                <Grid item lg={6} xs={2}>
                  {props.code}
                </Grid>
                <Grid item container lg={6} xs={10} justify="flex-end">
                  {totalFormatted}
                </Grid>
              </Grid>
              <Grid item className="small-text">
                <strong>
                  <i>
                    {props.code} - {props.name}
                  </i>
                </strong>
              </Grid>
              <Grid item className="small-text">
                <i>
                  1 {props.base} = {props.code} {rateFormatted}
                </i>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              item
              container
              lg={1}
              xs={1}
              justify="flex-start"
              alignItems="center"
            >
              <IconButton
                aria-label="add"
                color="secondary"
                onClick={() => props.action(props.code)}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}
export default Currency;
