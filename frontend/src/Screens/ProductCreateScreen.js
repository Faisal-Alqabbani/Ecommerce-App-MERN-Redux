import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductCreateScreen(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createNewProduct({
        name,
        brand,
        description,
        category,
        price,
        countInStock,
      })
    );
  };
  useEffect(() => {
    if (product) {
      props.history.push(`/product/${product.product._id}`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  }, [product, props.history, dispatch]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger"> {error}</MessageBox>
        ) : (
          ""
        )}{" "}
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Prodcut Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              type="text"
              placeholder="Enter Product Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              placeholder="Enter Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="countinstuck">Count In Stock</label>
            <input
              id="countinstuck"
              type="number"
              placeholder="Enter Product countinstuck"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Create Product
            </button>
          </div>
        </>
      </form>
    </div>
  );
}

export default ProductCreateScreen;
