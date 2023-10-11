import { Box } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import RapidAPIFailure from './pages/RapidAPIFailure';

function App() {
  return (
    <Box width='400px' sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/exercise/:id' element={<ExerciseDetail />} />
        <Route path='/rapid-api-failure' element={<RapidAPIFailure />}/>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
