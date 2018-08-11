import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#80d6ff",
      main: "#42a5f5",
      dark: "#0077c2",
      contrastText: "#fafafa"
    },
    secondary: {
      light: "#26c6da",
      main: "#6ff9ff",
      dark: "#0095a8",
      contrastText: "#fafafa"
    },
    root: {
      flexgrow: 1
    }
  }
});

export default theme;
