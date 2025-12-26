import React from 'react'
import "./Order.css"
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react';
export default function Order() {
  const [Orders, setOrders] = useState([]);
  const orderfetching = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/order/getorderadmin");
      const data = await response.json();
      if (data.success) {
        setOrders(data.ordersadmin);
      } else {
        console.log(data.messege);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const statuschange = async ({ e, id }) => {
    const status = e.target.value;
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orderstatusupdate`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ status, id })
    })
    const data = await response.json();
    if (data.success) {
      orderfetching();
    }
  }

  useEffect(() => {
    orderfetching();
  }, [])
  return (
    <div className="Order">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>total price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {Orders.reverse().map((order, index) => (
            <tr key={index}>
              <td><img src={assets.parcel_icon} alt="" /></td>
              <td>{order.name}</td>
              <td>{order.Unit}</td>
              <td>{order.total}</td>
              <td>
                <select value={order.status} onChange={(e) => statuschange({ e: e, id: order._id })} name="" id="">
                  <option value="pending">pending</option>
                  <option value="packed">packed</option>
                  <option value="shipped">shipped</option>
                  <option value="out for delivery">out for delivery</option>
                  <option value="delivered">delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
