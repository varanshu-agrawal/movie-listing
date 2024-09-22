import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListingPage from './components/ListingPage/ListingPage';
import { Link, Route, Routes } from 'react-router-dom';
import Global from './components/Layout/Global/Global';
import MovieDetailPage from './components/MovieDetailPage/MovieDetailPage';

function App() {
    return (
        <div className="App bg-black h-full w-full text-white">
            <Routes>
                <Route path='/' Component={Global} >
                    <Route path='/' Component={ListingPage} />
                    <Route path='/:id' Component={MovieDetailPage} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
