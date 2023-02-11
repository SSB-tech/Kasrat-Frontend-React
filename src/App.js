import './App.css';
import Signup from './component/Signup';
import Signin from './component/Signin';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Homepage from './component/Homepage';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
        <Route path = '/' element={<Signup/>}/>
        <Route path ='/SignIn' element={<Signin/>}/>
        <Route path ='/HomePage' element={<Homepage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
