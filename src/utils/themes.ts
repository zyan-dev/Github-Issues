import { dySize } from "./responsive";

const themes = {
  color: {
    black: '#131313',
    white: '#EFEFEF',
    blue: '#4b8eff',
    gray: '#BCBCBC'
  },
  fontSize: {
    small: dySize(10),
    medium: dySize(15),
    large: dySize(20),
    huge: dySize(30),
  }
}

export default themes;