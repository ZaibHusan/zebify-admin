import React from 'react'
import "./Right.css"
import { Outlet } from 'react-router-dom'
export default function Right() {
  return (
    <div className="Right">
        <Outlet />
    </div>
  )
}
