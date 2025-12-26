import React, { useContext, useEffect, useState } from 'react'
import "./List.css"
import { assets } from '../../assets/assets'
import { appcontext } from '../../admincontext/Admincontext';
import { BASE } from '../../utils/api.js';
export default function List() {

  const [products, setProducts] = useState([]);
  const [productDelete, setProductDelete] = useState(false);
  const [deletIndex, setdeletIndex] = useState();
  const { Token } = useContext(appcontext);
  const fetchinglistproduct = async () => {
    const response = await fetch(`${BASE}/api/products/getproducts`);
    const data = await response.json();
    const productData = data.productData;
    setProducts(productData);
  }

  const deleteProduct = async ({ id, e }) => {
    e.preventDefault();
    setdeletIndex(parseInt(e.target.name))
    setProductDelete(true);

    try {
      const response = await fetch(`${BASE}/api/products/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${Token}`
        }
      });
      const data = await response.json();
      setProductDelete(false);
      if (data.success) {
        fetchinglistproduct();
        toString(data.messege);
      } else {
        alert(data.messege);
      }
    } catch (error) {
      console.log(error)
      toString(data.messege);
    }
  }

  useEffect(() => {
    fetchinglistproduct();
  }, [])
  return (
    <div className="List">
      <p>All Proudct List</p>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Categoy</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td><img src={product.Image[0]} alt="" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <div className="list_button">
                  {productDelete && deletIndex === index ? <>
                    <div className="deletloader">
                      <div className="loader"></div>
                    </div>
                  </> : <button name={index} onClick={(e) => deleteProduct({ id: product._id, e })}>Delete</button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
