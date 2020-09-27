import React, { Component } from "react";
import "./style.css";
import { Grid, Select, MenuItem, Button } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class AddtoList extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
    };
  }

  handleChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.action(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    const { list, currentBase } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs={10} lg={10}>
          <Select
            value={this.state.inputValue}
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
            onChange={this.handleChangeInput}
            MenuProps={MenuProps}
          >
            {list.map(
              (currency) =>
                currency.code !== currentBase &&
                currency.show === false && (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </MenuItem>
                )
            )}
          </Select>
        </Grid>
        <Grid item xs={2} lg={2}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AddtoList;
