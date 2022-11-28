import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './providers/AuthProvider/AuthProvider';
import NavBar from './components/NavBar';
import AppDrawer from './components/AppDrawer';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterMoment}>
          <AuthProvider>
              <NavBar />
              <Box sx={{ display: 'flex'}}>
                  <AppDrawer />
                  <AppRouter />
              </Box>
            <ToastContainer theme="colored" />
          </AuthProvider>
          </LocalizationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
