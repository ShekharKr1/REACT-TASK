import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />

                </Routes>
            </BrowserRouter>
        </>
    )

};
export default App;