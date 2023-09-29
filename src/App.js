
import {
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Routes/Home/home.component';
import Login from './components/Login/login.component';

const App = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />}>
        
      </Route>
    </Routes>
  );
}

export default App;
