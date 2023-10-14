import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  let [categories, setCategories] = useState();

  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(data.data);
    console.log(data.data);
  }
  return (
    <>
      <div className="py-3">
        <div className="row gy-3">
          {categories?.map((category, index) => {
            return (
              <div className="col-md-4 " key={index}>
                <div
                  className=" mx-2 cat
                "
                >
                  <img
                    className="img-slider"
                    height={250}
                    src={category?.image}
                    alt={category?.name}
                  />
                  <h3 className="fs-sm py-3 text-center text-main fw-bolder">
                    {category?.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
