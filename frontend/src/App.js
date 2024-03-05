//import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/signup/signup';
import Login from './components/login/login';


function App() {
  const user = localStorage.getItem("token");
  return(
    <Routes>
      {user && <Route path="/" exact element={<Main/>} />}
      <Route path="/signup" exact element={<Signup/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/" exact element={<Navigate replace to="/login"/>} />
    </Routes>
  );
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

