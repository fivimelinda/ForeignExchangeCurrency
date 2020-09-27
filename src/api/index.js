import axios from "axios";

const URL = "https://api.exchangeratesapi.io/latest?base=";

export function getRate(base) {
  return axios.get(URL + base);
}
