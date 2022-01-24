import { Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CustomTypographyStyledWithBg = styled(Typography).attrs({})`
    /* theme settings */
    font-family: ${(p) => p.theme.fontFamily};
    color: ${(p) => p.theme.colorTextWithBg};
    &:hover {
        color: ${(p) => p.theme.colorTextWithBg};
    }

    /* individual settings */

`

const CustomTypographyStyledWithNoBg = styled(Typography).attrs({})`
    /* theme settings */
    font-family: ${(p) => p.theme.fontFamily};
    color: ${(p) => p.theme.colorTextWithNoBg};
    &:hover {
        color: ${(p) => p.theme.colorTextWithNoBg};
    }

    /* individual settings */
    
`

interface CustomTypographyProps {
    transKey: string
    withBg?: boolean
    sx?: object
}

const CustomTypography = (props: CustomTypographyProps) => {
    const { t } = useTranslation(); 

    if (props.withBg == true)
        return (<CustomTypographyStyledWithBg sx={props.sx}>{t(props.transKey)}</CustomTypographyStyledWithBg>);
    else
        return (<CustomTypographyStyledWithNoBg sx={props.sx}>{t(props.transKey)}</CustomTypographyStyledWithNoBg>);

    
}

export default CustomTypography;
