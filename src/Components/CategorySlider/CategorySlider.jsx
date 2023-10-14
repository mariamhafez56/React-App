import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";

function CategorySlider() {
  let [categories, setCategories] = useState();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };
  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(data.data);
  }
  return (
    <>
      <Slider {...settings} className=" my-5">
        {categories?.map((category, index) => {
          return (
            <div key={index}>
              <img
                className="img-slider"
                height={250}
                src={category?.image}
                alt={category?.name}
              />
              <h5 className="fs-sm py-1 text-center">{category?.name}</h5>
            </div>
          );
        })}
      </Slider>
    </>
  );
}

export default CategorySlider;
