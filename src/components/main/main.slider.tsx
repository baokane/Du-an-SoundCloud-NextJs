'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from 'react-slick'
import { Box, Button } from "@mui/material";

const MainSlider = () => {

    const NextArrow = (props: any) => {
        return (
            <Button
                onClick={props.onClick}
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '50%',
                    minWidth: 30,
                    width: 35,
                    padding: 0
                }}
            >
                Next
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button
                onClick={props.onClick}
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    right: 0,
                    top: '50%',
                }}
            >
                Prev
            </Button>
        )
    }

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
    return (
        <Box {...settings}>
            <div >
                <h3 style={{ textAlign: "center" }}>1</h3>
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>2</h3>
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>3</h3>
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>4</h3>
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>5</h3>
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>6</h3>
            </div>
        </Box>
    );
}

export default MainSlider