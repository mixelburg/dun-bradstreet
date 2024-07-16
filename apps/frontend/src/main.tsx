import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {App} from "./app/App";
import './main.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  </StrictMode>
);
