import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetials() {
  let params = useParams();
  let [productDetails, setProductDetails] = useState({});
  let [isLoading, setIsLoading] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    getProductDetials(params.id);
  }, []);

  async function getProductDetials(productId) {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + productId
    );
    setProductDetails(data.data);
    setIsLoading(false);
    console.log(productDetails);
  }

  return (
    <>
      {isLoading ? (
        <div className="py-5 my-5 text-center">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
        </div>
      ) : (
        <div className="row align-items-center py-5  w-100">
          <div className="col-md-3">
            <Slider {...settings}>
              {productDetails?.images?.map((img, index) => {
                return (
                  <img
                    key={index}
                    className="w-100"
                    src={img}
                    alt={productDetails?.title}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="col-md-9 px-3">
            <h2 className="mt-2">{productDetails?.title}</h2>
            <h5 className="text-main font-sm">
              {productDetails?.category?.name}
            </h5>
            <p>{productDetails?.description}</p>
            <p
              className="d-flex justify-content-between
        mt-2"
            >
              <span>Price: {productDetails?.price}EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                {productDetails?.ratingsAverage}
              </span>
            </p>
            <button className="btn bg-main text-white w-75 mx-auto d-block">
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
