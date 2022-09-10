import './ImageWithText.css';
import Typography from "@mui/material/Typography";

type ImageWithTextProps = {
    label: string,
    image: string,
    width?: number | string,
    height?: number | string,
}

export const ImageWithText = ({image, label, height = 360, width = 480}: ImageWithTextProps) => {


    return (
        <div className="demo-wrap" style={{
            width: width,
            height: height,
        }}>
            <img
                className="demo-bg"
                src={image}
                alt=""
                width="100%"
                height="100%"
                style={{
                    filter: "grayscale(100%)"
                }}
            />
            <div className="demo-content">
                <Typography variant={'h4'} fontWeight={"bold"}>
                    {label}
                </Typography>
            </div>
        </div>
    )
}