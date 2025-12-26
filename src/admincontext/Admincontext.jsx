import { createContext, useEffect, useState } from "react";



export const appcontext = createContext();

export default function Admincontext({ children }) {
    const [Token, setToken] = useState();
    const Data = {
        Token, setToken,
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, [])
    return (
        <appcontext.Provider value={Data}>
            {children}
        </appcontext.Provider>
    )
}
