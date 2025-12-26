import React, { use, useContext, useEffect, useRef, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';
import { appcontext } from '../../admincontext/Admincontext';
export default function Add() {
    const { Token } = useContext(appcontext);
    const [Image, setImage] = useState({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
    });

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        category: "Men",
        subCategory: "Topwear",
        isBestseller: false,
    });



    const productDataChange = (e) => {
        const { name, type, checked, value } = e.target;
        setProductData((pre) => ({ ...pre, [name]: type === "checkbox" ? checked : value, }));
    }
    const imageRef1 = useRef(null);
    const imageRef2 = useRef(null);
    const imageRef3 = useRef(null);
    const imageRef4 = useRef(null);

    const fileOpen = (e) => {
        if (e.target.name === "image1") {
            imageRef1.current.click();
        } else if (e.target.name === "image2") {
            imageRef2.current.click();
        } else if (e.target.name === "image3") {
            imageRef3.current.click();
        } else if (e.target.name === "image4") {
            imageRef4.current.click();
        }

        else {
            return;
        }
    }
    const inputChange = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        const type = e.target.type;
        if (type === "checkbox") {
            const value = e.target.checked;
            return
        }
        const value = file;
        setImage((pre) => ({
            ...pre,
            [name]: type === "checkbox" ? e.target.checked : value,
        }))
    }
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!Image.image1 || !Image.image2 || !Image.image3 || !Image.image4) {
            toast.error("Please upload all the images");
            setLoading(false);
            return;
        }

        try {
            const { name, price, description, category, subCategory, isBestseller } = productData;
            let image = [Image.image1, Image.image2, Image.image3, Image.image4];
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller", isBestseller);
            formData.append("date", new Date().getDate());

            for (let i = 0; i < image.length; i++) {
                formData.append(`image${i + 1}`, image[i]);
            }



        // let create a virrable for data fetching?
            const add = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/products/addproducts", {
                headers: {
                    "Authorization": `Bearer ${Token}`
                },
                method: "POST",
                body: formData,
            });
            
            
            const res = await add.json();
            console.log(res);
            if (res.success) {
                toast.success(res.messege)
                setProductData({
                    name: "",
                    price: "",
                    description: "",
                    category: "Topwear",
                    subcategory: "Men",
                    isBestseller: false
                })
                // setImage({
                //     image1: "",
                //     image2: "",
                //     image3: "",
                //     image4: "",
                // })
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(res.messege)
            }
        } catch (error) {

        }

    }

    const [loading, setLoading] = useState(false);

    return (
        <div className="Add">
            {loading && (
                <div className="loader-overlay">
                    <div className="loader-bag">
                        <div className="bag"></div>
                        <div className="handle"></div>
                    </div>
                </div>
            )}


            <form onSubmit={submit}>
                <div className="Add_Upload">
                    <h3>Upload Image</h3>
                    <div className="Upload_images">
                        <img onClick={fileOpen} name="image1" src={Image.image1 ? URL.createObjectURL(Image.image1) : assets.upload_area} alt="" />
                        <input accept='image/*' onChange={inputChange} ref={imageRef1} name="image1" style={{ display: 'none' }} type="file" />


                        <img onClick={fileOpen} name="image2" src={Image.image2 ? URL.createObjectURL(Image.image2) : assets.upload_area} alt="" />
                        <input accept='image/*' onChange={inputChange} ref={imageRef2} name="image2" style={{ display: 'none' }} type="file" />

                        <img onClick={fileOpen} name="image3" src={Image.image3 ? URL.createObjectURL(Image.image3) : assets.upload_area} alt="" />
                        <input accept='image/*' onChange={inputChange} ref={imageRef3} name="image3" style={{ display: 'none' }} type="file" />

                        <img onClick={fileOpen} name="image4" src={Image.image4 ? URL.createObjectURL(Image.image4) : assets.upload_area} alt="" />
                        <input accept='image/*' onChange={inputChange} ref={imageRef4} name="image4" style={{ display: 'none' }} type="file" />
                    </div>
                </div>

                <div className="Add_name">
                    <p>Proudct Name</p>
                    <input required onChange={productDataChange} value={productData.name} name="name" type="text" placeholder='Proudct Name' />
                </div>

                <div className="Add_decription">
                    <p>Decription</p>
                    <textarea minLength={200} maxLength={300} value={productData.description} required onChange={productDataChange} name="description" placeholder='Proudct Decription' />
                </div>

                <div className="Add_price_category">

                    <div className="Add_category">
                        <p>Category</p>
                        <select required defaultValue={productData.category} onChange={productDataChange} name="category">
                            <option value="Men" >Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                    <div className="Add_subcategory">
                        <p>Sub Category</p>
                        <select required defaultValue={productData.subCategory} onChange={productDataChange} name="subCategory">
                            <option value='Topwear'>Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                        </select>
                    </div>
                    <div className="Add_price">
                        <p>Price</p>
                        <input value={productData.price} required onChange={productDataChange} name='price' type="number" placeholder='Proudct Price' />
                    </div>
                </div>
                <div className="Add_isBestseller">
                    <p>Is Bestseller</p>
                    <input onChange={productDataChange} checked={productData.isBestseller} name="isBestseller" type="checkbox" />
                </div>
                <div className="Submit_b">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
