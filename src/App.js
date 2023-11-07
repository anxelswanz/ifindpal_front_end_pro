import { useRoutes } from 'react-router-dom'
import routes from './router/index'
import './index.css'
import { ThemeProvider, createTheme } from '@material-ui/core';
function App() {
  const element = useRoutes(routes)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff'
      },
      secondary: {
        main: '#6B2ECB'
      }
    },
    typography: {
      fontFamily: 'Playpen+Sans',
      fontWeightLight: 400
    }
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        {element}
      </ThemeProvider>
    </>
  );
}

export default App;
