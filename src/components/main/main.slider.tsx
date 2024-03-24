'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from 'react-slick'
import { Box, Button, Divider } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface IProps {
    data: ITrackTop[];
    title: string;
}

const MainSlider = (props: IProps) => {

    const { data, title } = props

    console.log('>>> checkData:', props.data)

    const PrevArrow = (props: any) => {
        return (
            <Button
                color="inherit"
                variant="contained"
                onClick={props.onClick}
                sx={{
                    // border: '1px solid #1c78d3',
                    position: 'absolute',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    top: '25%',
                    left: '-50px',
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronLeftIcon />
            </Button>
        )
    }

    const NextArrow = (props: any) => {
        return (
            <Button
                color="inherit"
                variant="contained"
                onClick={props.onClick}
                sx={{
                    // border: '1px solid #1c78d3',
                    position: 'absolute',
                    transform: 'translateY(-50%)',
                    top: '25%',
                    right: '-50px',
                    zIndex: 1,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronRightIcon />
            </Button>
        )
    }

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    }
    return (
        <Box
            sx={{
                margin: '0 50px',
                '.track': {
                    padding: '0 10px',
                    'img': {
                        height: 150,
                        width: 150
                    }
                },
                'h3': {
                    border: '1px solid #ccc',
                    padding: '20px',
                    margin: '0 10px',
                    height: '192px',
                    textAlign: 'center'
                }
            }}
        >
            <h2>{title}</h2>
            <Slider {...settings}>
                {data.map(track => {
                    return (
                        <div className="track" key={track._id}>
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} />
                            <h4>{track.title}</h4>
                            <h5>{track.description}</h5>
                        </div>
                    )
                })}
                {/* <div className="abc">
                    <h3>1</h3>
                </div> */}
            </Slider>
            <Divider sx={{ marginTop: '50px' }} />

        </Box>
    );
}

export default MainSlider