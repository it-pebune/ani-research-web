import { Button } from '@mui/material';
import styled from 'styled-components';

const CustomButton = styled(Button).attrs({
    variant: 'contained',
})`
    /* theme settings */
    background: ${(p) => p.theme.colorPrimary};
    color: ${(p) => p.theme.colorTextWithBg};
    &:hover {
        background: ${(p) => p.theme.colorSecondary};
        color: ${(p) => p.theme.colorTextWithBg};
    }

    /* individual settings */
    padding: 10px 5px;
    border-radius: 0;
`

export default CustomButton;
