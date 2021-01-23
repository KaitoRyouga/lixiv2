import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card, Image, Button } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

function SampleNextArrow(props) {
    const {onClick } = props;
    return (
      <div
        onClick={onClick}
      >
          <Button>
              <RightOutlined />
          </Button>
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
        >
            <Button>
              <LeftOutlined />
          </Button>
        </div>
    );
  }

const CenterMode = (props) => {

    const listImage = []
    const temp = props.product.listimage.split("-")
      
    if (Number.isInteger(temp[0] - 0)) {
      for (let index = temp[0]; index <= temp[temp.length - 1]; index++) {
        listImage.push(Number(index)) 
      }
    }

    const settings = {
      customPaging: () => {
        return (
            <img alt="image" src="/images/giay/adidas/so/adidas_so_4.jpg" style={{ height: "2em", width: "2em" }} />
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div>
        <Slider {...settings} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
        }}>
            {
                listImage.map(count => {
                    const img = props.product.image
                    const head = img.slice(0, img.length - 5)
                    const displayImage = head + count + '.jpg'
                    return(
                        <div key={count}>
                            <Card
                                hoverable
                                style={{ textAlign: "center" }}
                                cover={<Image alt="image" src={displayImage} width={200} />}
                            >
                            </Card>
                        </div>
                    )
                })
            }
        </Slider>
      </div>
    );
  }

export default CenterMode