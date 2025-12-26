import React, { useContext } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { appcontext } from '../../admincontext/Admincontext'

export default function Navbar() {
    const { setToken } = useContext(appcontext);
    const navigation = () => {
        window.location.href = "/";
    }
    return (
        <div className="Navbar">
            <div className="Navbar_logo">
                <img src={assets.logo} onClick={() => navigation()} alt="" />
            </div>
            <button onClick={() => {
                setToken("")
                localStorage.removeItem("token");
            }}>Logout</button>
        </div>
    )
}
