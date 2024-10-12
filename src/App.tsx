import './App.css';
import Kurdle from './Kurdle/Kurdle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Kurdle></Kurdle>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;