import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card, Image, Button, Row, Col } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'


const CenterMode = (props) => {

    const listImage = []
    const [slider, setSlider] = useState()
    const temp = props.product.listimage.split("-")
      
    if (Number.isInteger(temp[0] - 0)) {
      for (let index = temp[0]; index <= temp[temp.length - 1]; index++) {
        listImage.push(Number(index)) 
      }
    }

    const settings = {
      customPaging: (i) => {
        const img = props.product.image
        const head = img.slice(0, img.length - 5)
        const displayImage = head + (i+1) + '.jpg'
        return (
            <img alt="image" src={displayImage} style={{ height: "2em", width: "2em" }} />
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Row align="middle" justify="center">
        <Col span={3} style={{
          textAlign: "center"
        }}>
            <Button onClick={() => slider.slickPrev()}>
              <LeftOutlined />
            </Button>
        </Col>
        <Col span={18}>
          <Slider ref={c => setSlider(c)} {...settings}>
              {
                  listImage.map(count => {
                      const img = props.product.image
                      const head = img.slice(0, img.length - 5)
                      const displayImage = head + (count) + '.jpg'
                      return(
                          <div key={count}>
                              <Card
                                  hoverable
                                  style={{ textAlign: "center" }}
                                  cover={(
                                    <Image alt="image" src={displayImage} width={200} />
                                  )}
                              >
                              </Card>
                          </div>
                      )
                  })
              }
          </Slider>
        </Col>
        <Col span={3} style={{
          textAlign: "center"
        }}>
          <Button onClick={() => slider.slickNext()}>
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    );
  }

export default CenterMode