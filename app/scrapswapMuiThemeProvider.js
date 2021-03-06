import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green100, green500, green700, cyan500} from 'material-ui/styles/colors';

export default (userAgent) => {
  return getMuiTheme({
    palette: {
      primary1Color: green500,
      primary2Color: green700,
      primary3Color: green100,
      accent1Color: cyan500
    },
  }, {
    avatar: {
      borderColor: null,
    },
    userAgent: userAgent
  });
};
