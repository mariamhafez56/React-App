import axios from "axios";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Product({ product }) {
  let navigate = useNavigate();
  let { setUserLoggedIn } = useContext(AuthContext);

  async function addProductToCart(productId) {
    console.log(productId);
    let res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        localStorage.removeItem("token");
        setUserLoggedIn(false);
        navigate("/login");
      });
    if (res) {
      toast.success(res.data.message);
    }
  }
  return (
    <div className="col-md-3">
      <div className="product p-3 cursor-pointer">
        <Link to={"/productDetials/" + product._id}>
          <img className="w-100" src={product.imageCover} alt="" />
          <h5 className="font-sm text-main">{product.category.name}</h5>
          <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
          <p className="d-flex justify-content-between">
            <span>{product.price} EGP</span>
            <span>
              <i className="fas fa-star rating-color me-1"></i>
              {product.ratingsAverage}
            </span>
          </p>
        </Link>
        <button
          onClick={() => {
            addProductToCart(product._id);
          }}
          className="btn bg-main  text-white w-100"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
