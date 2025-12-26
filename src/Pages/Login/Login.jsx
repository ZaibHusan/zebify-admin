import React, { useContext, useRef, useState } from 'react'
import "./Login.css"
import { appcontext } from '../../admincontext/Admincontext';
import { toast } from 'react-toastify';
import { BASE } from '../../utils/api.js';
export default function Login() {
    const [formData, setFormData] = useState({});
    const { Token, setToken } = useContext(appcontext);
    const pRef = useRef();
    const btnRef = useRef();
    const Submit = (e) => {
        e.preventDefault();
        btnRef.current.disabled = true;
        btnRef.current.style.background = "gray";
        if (formData.gmail && formData.password) {
            apiCall();
        } else {
            alert("Please fill all the fields");
        }
    }


    const apiCall = async () => {
        try {
            const { gmail, password } = formData;
            const api_url = `${BASE}/api/admin`
            const call = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gmail, password }),
            })
            const res = await call.json();
            btnRef.current.disabled = false;
            btnRef.current.style.background = "blue";
            if (res.success) {
                setToken(res.token);
                localStorage.setItem("token", res.token);
                toast.success(res.messege);

            } else {
                pRef.current.style.display = "block";
                toast.error(res.messege);
            }

        } catch (error) {
            console.log(error);
        }
    }



    const Handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    return (
        <div className="Login">
            <div className="Login_box">
                <h1>Login</h1>
                <form onSubmit={Submit}>
                    <label htmlFor="gmail">Gmail</label>
                    <input onChange={Handlechange} name='gmail' placeholder='Gmail' type="text" id='gmail' />
                    <label htmlFor="password">Password</label>
                    <input onChange={Handlechange} name='password' placeholder='Password' type="password" id='password' />
                    <button ref={btnRef} type='submit'>Login</button>
                    <p ref={pRef} style={{ color: "red" }} className='invalid'>invalid credentials please try again</p>
                </form>
            </div>
        </div>
    )
}
