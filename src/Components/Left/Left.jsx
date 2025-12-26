import React from 'react'
import "./Left.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
export default function Left() {
    return (
        <div className="Left">
            <div className="Left_box">
                <NavLink to={'/'}><div className="Left_box_item">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Product</p>
                </div> </NavLink>
                <NavLink to={'/list'}><div className="Left_box_item">
                    <img src={assets.parcel_icon} alt="" />
                    <p>List Products</p>
                </div>
                </NavLink>
                <NavLink to={'/orders'}><div className="Left_box_item">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </div> </NavLink>
            </div >
        </div >
    )
}
