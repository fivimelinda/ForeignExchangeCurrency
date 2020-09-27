import React, { Component } from "react";
import "./style.css";
import Currency from "./Currency.js";
import AddtoList from "./AddtoList";
import { getRate } from "../api/index.js";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Box,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#55185D",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFD524",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
      },
    },
  },
  shape: {
    borderRadius: 25,
  },
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: 10.0,
      base: "USD",
      rateList: {},

      currencyList: [
        { code: "USD", name: "United States Dollar", show: false },
        { code: "CAD", name: "Canadian Dollar", show: false },
        { code: "IDR", name: "Indonesian Rupiah", show: true },
        { code: "GBP", name: "British Pound", show: true },
        { code: "CHF", name: "Swiss Franc", show: false },
        { code: "SGD", name: "Singapore Dollar", show: true },
        { code: "INR", name: "Indian Rupee", show: false },
        { code: "MYR", name: "Malaysian Ringgit", show: false },
        { code: "JPY", name: "Japanese Yen", show: false },
        { code: "KRW", name: "Korean Won", show: false },
        { code: "EUR", name: "Euro", show: true },
      ],

      error: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.getRateList(this.state.base);
  }

  getRateList = (base) => {
    getRate(base)
      .then((res) => {
        this.setState({
          rateList: res.data.rates,
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          errorMessage: err.message,
          rateList: {},
        });
      });
  };

  getBaseName = () => {
    for (let currency of this.state.currencyList) {
      if (currency.code === this.state.base) {
        return currency.name;
      }
    }
    return null;
  };

  handleChangeValue = (e) => {
    var newValue = e.target.value;
    if (newValue < 0) {
      this.setState({
        value: "",
      });
    } else {
      this.setState({
        value: newValue,
      });
    }
  };

  handleChangeBase = (e) => {
    this.setState({
      base: e.target.value,
    });
    this.getRateList(this.state.base);
  };

  addCurrency = (value) => {
    this.setState({
      currencyList: this.state.currencyList.map((currency) =>
        currency.code === value ? { ...currency, show: true } : currency
      ),
      showAddCurrency: false,
    });
  };

  removeCurrency = (value) => {
    this.setState({
      currencyList: this.state.currencyList.map((currency) =>
        currency.code === value ? { ...currency, show: false } : currency
      ),
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <h1 className="title">Foreign Currency Exchange</h1>
          <Grid container align-items="center" justify="center">
            <Grid item xs={12} lg={4}>
              <Paper elevation={2} fullWidth>
                <Box p={2}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item lg={12} xs={12}>
                      <strong>
                        <i>
                          {this.state.base} - {this.getBaseName()}
                        </i>
                      </strong>
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      justify="space-between"
                    >
                      <Grid item lg={4} xs={4}>
                        <Select
                          id="base"
                          value={this.state.base}
                          variant="outlined"
                          size="small"
                          margin="dense"
                          fullWidth
                          defaultValue={this.state.base}
                          onChange={this.handleChangeBase}
                          MenuProps={MenuProps}
                        >
                          {this.state.currencyList.map((currency) => (
                            <MenuItem key={currency.code} value={currency.code}>
                              <strong>{currency.code}</strong>
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item container lg={5} xs={6} justify="flex-end">
                        <TextField
                          id="value"
                          defaultValue={this.state.value}
                          inputProps={{ min: 0 }}
                          variant="outlined"
                          size="small"
                          type="number"
                          onChange={this.handleChangeValue}
                        />
                      </Grid>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <hr />
                    </Grid>

                    {this.state.error && (
                      <Grid container justify="center">
                        <span style={{ color: "red" }}>
                          {this.state.errorMessage}
                        </span>
                      </Grid>
                    )}

                    {/* List of currencies */}
                    {this.state.currencyList.map((currency) =>
                      currency.show && currency.code !== this.state.base ? (
                        <Grid item lg={12} xs={12}>
                          <Currency
                            code={currency.code}
                            base={this.state.base}
                            name={currency.name}
                            value={this.state.value}
                            rate={this.state.rateList[currency.code]}
                            action={this.removeCurrency}
                          />
                        </Grid>
                      ) : null
                    )}

                    {/* Add currencies  */}
                    <AddtoList
                      list={this.state.currencyList}
                      currentBase={this.state.base}
                      action={this.addCurrency}
                    />
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
