import React from 'react'
import "./Order.css"
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react';
import { BASE } from '../../utils/api.js';
export default function Order() {
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const orderfetching = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching from:", `${BASE}/api/order/getorderadmin`);
      const response = await fetch(`${BASE}/api/order/getorderadmin`);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.success) {
        setOrders(data.ordersadmin || []);
        setError(null);
      } else {
        console.error("API error:", data.messege);
        setError(data.messege || "Failed to load orders");
        setOrders([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message || "Failed to connect to server");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  const statuschange = async ({ e, id }) => {
    const status = e.target.value;
    try {
      console.log("Updating order status:", { status, id });
      const response = await fetch(`${BASE}/api/admin/orderstatusupdate`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ status, id })
      })
      const data = await response.json();
      console.log("Status update response:", data);
      
      if (data.success) {
        orderfetching();
      } else {
        setError(data.messege || "Failed to update order status");
        console.error("Status update error:", data.messege);
      }
    } catch (error) {
      setError("Error updating order status: " + error.message);
      console.error("Status change error:", error);
    }
  }

  useEffect(() => {
    orderfetching();
  }, [])

  return (
    <div className="Order">
      <h1>Orders</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && Orders.length === 0 && !error && <p>No orders found</p>}
      
      {Orders.length > 0 && (
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
           {[...Orders].reverse().map((order, index) => (
              <tr key={order._id || index}>
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
      )}
    </div>
  )
}
