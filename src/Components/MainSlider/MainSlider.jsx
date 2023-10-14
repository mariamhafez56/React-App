import React from "react";
import Slider from "react-slick";
import sliderImg1 from "../../Assets/Images/grocery-banner-2.jpeg";
import sliderImg2 from "../../Assets/Images/grocery-banner.png";
import sliderImg3 from "../../Assets/Images/slider-2.jpeg";
import img1 from "../../Assets/Images/slider-image-2.jpeg";
import img2 from "../../Assets/Images/slider-image-3.jpeg";

function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="row">
        <div className="col-md-9 p-0 mb-3">
          <Slider {...settings}>
            <img height={400} className="w-100" src={sliderImg1} alt="" />
            <img height={400} className="w-100" src={sliderImg2} alt="" />
            <img height={400} className="w-100" src={sliderImg3} alt="" />
          </Slider>
        </div>
        <div className="col-md-3 p-0">
          <img height={200} className="w-100" src={img1} alt="" />
          <img height={200} className="w-100" src={img2} alt="" />
        </div>
      </div>
    </>
  );
}

export default MainSlider;
