import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import { ChessList } from './ChessList';
import { ChessSingle } from './ChessSingle';
import { ChessDel } from './ChessDel';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Sakkozók</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ChessList />} />
        <Route path="/chess/:chessId" element={<ChessSingle />} />
        <Route path="/chess-del/:chessId" element={<ChessDel />} />
      </Routes>
    </Router>
  );
}
