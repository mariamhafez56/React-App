import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";

export default function Cart() {
  let [errorMessage, setErrorMessage] = useState("");
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [reqInterval, setReqInterval] = useState();
  let { setCartNumber } = useContext(CartContext);
  useEffect(() => {
    getUserCartProducts();
  }, []);

  async function getUserCartProducts() {
    setIsLoading(true);
    let res = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
    setIsLoading(false);
    if (res) {
      console.log(res.data.numOfCartItems);
      setCartNumber(res.data.numOfCartItems);
      // setTotalCartPrice(res?.data.data.totalCartPrice);
      setProducts(res?.data.data.products);
      // setCartId(res?.data.data._id);
      // setNumOfCartItems(res?.numOfCartItems);
      console.log(products);
    }
  }

  async function removeCartProduct(productId) {
    setIsLoading(true);
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     setErrorMessage(err.response.data.message);
    //   });
    setIsLoading(false);

    if (res) {
      // setTotalCartPrice(res?.data.data.totalCartPrice);
      setProducts(res?.data.data.products);
      // setCartId(res?.data.data._id);
      // setNumOfCartItems(res?.numOfCartItems);
      console.log(products);
    }
  }
  async function clearCart() {
    setIsLoading(true);
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    if (res) {
      setProducts([]);
    }
  }

  async function updateProductCount(productId, count, index) {
    let newProducts = [...products];
    newProducts[index].count = count;
    setProducts(newProducts);

    clearTimeout(reqInterval);
    setReqInterval(
      setTimeout(async () => {
        let res;
        if (count == 0) {
          removeCartProduct(productId);
        } else {
          res = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
        }

        if (res) {
          //   setTotalCartPrice(res?.data.data.totalCartPrice)
          setProducts(res?.data.data.products);
          //      setNumOfCartItems(res?.numOfCartItems)
        }
        console.log(res);
      }, 500)
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="text-center ">
          <i className="fas fa-spinner fa-spin fa-2x py-3"></i>
        </div>
      ) : (
        <>
          {products.length == 0 ? (
            <div className="alert alert-warning text-center py-3">
              <h3>No products in your cart</h3>
            </div>
          ) : (
            <div className="my-5">
              <button
                onClick={clearCart}
                className="btn btn-outline-danger d-block ms-auto my-3"
              >
                Clear Cart
              </button>
              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="row p-2 my-3 shadow rounded-2 align-items-center"
                  >
                    <div className="col-md-2">
                      <img
                        className="w-100"
                        src={product.product.imageCover}
                        alt=""
                      />
                    </div>
                    <div className="col-md-8">
                      <h2>{product.product.title}</h2>
                      <h5 className="font-sm text-main">
                        {product.product.category.name}
                      </h5>
                      <p>
                        <span className="mx-3">Price: {product.price}EGP</span>
                        <span className="mx-3">
                          <i className="fas fa-star text-main"></i>
                          {product.product.ratingsAverage}
                        </span>
                      </p>
                      <p className="mx-3">
                        <span className="fw-bolder">Total Price </span>
                        {product.count * product.price} EGP
                      </p>
                    </div>
                    <div className="col-md-2">
                      <button
                        onClick={() => {
                          removeCartProduct(product.product._id);
                        }}
                        className="btn text-danger d-block mb-5"
                      >
                        Remove
                      </button>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count - 1,
                              index
                            )
                          }
                          className="btn bg-main mx-2 text-white"
                        >
                          -
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count + 1,
                              index
                            )
                          }
                          className="btn bg-main mx-2 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
