import Typography, {TypographyProps} from "@mui/material/Typography";
import Link from "@mui/material/Link";


export const CopyrightBox = (props: TypographyProps) => {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/edvjask">
                Edvinas Jaskovikas
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}