import React from 'react'
import "./Home.css"
import Navbar from '../Navbar/Navbar'
import Left from '../Left/Left'
import Right from '../Right/Right'
import { Routes, Route } from 'react-router-dom'
import Add from '../../Pages/Add/Add'
import List from '../../Pages/List/List'
import Order from '../../Pages/Orders/Order'
export default function Home() {
    return (
        <div className="Home">
            <Navbar />
            <div className="Home_box">
                <div className="Home_left">
                    <Left />
                </div>
                <div className="Home_right">
                    <Routes>
                        <Route path="/" element={<Right />} >
                            <Route index element={<Add />} />
                            <Route path='list' element={<List />} />
                            <Route path='orders' element={<Order />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
