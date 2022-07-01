import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import Update from './components/Update';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
        <Routes>
        <Route
      path="/"
      element={<div>
        <Header/>
        <Body/>
      </div>}
    />
        <Route
      path="/home"
      element={<div>
        <Header/>
        <Body/>
      </div>}
    />
        <Route
      path="/update-billing/:id"
      element={<div>
        <Header/>
        <Update/>
      </div>}
    />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
