// import React from 'react'

import React,  {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage.js';
import VideoPlayerPage from './pages/videoPlayerPage.js';

function App() {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<HomePage/>}/>  
                    <Route path = "/video/:videoId" element = {<VideoPlayerPage/>}/>  
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App