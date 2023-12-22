import React from "react"
import Signup from './component/Signup'
import Login from './component/Login'

import AddList from "./component/AddList"
import List from "./component/List"
import Update from "./component/Update"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return(
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/addList' element={<AddList></AddList>}></Route>
            <Route path='/list' element={<List></List>}></Route>
            <Route path='/update/:id' element={<Update></Update>}></Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;