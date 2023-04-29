import './App.css';
import CarList from './CarList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" >
              CarShop
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>
      
      <CarList />
    </div>
  );
}

export default App;
