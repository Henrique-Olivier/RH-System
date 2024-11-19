import styled from "styled-components";

const font = '"Poppins", sans-serif';
export const styleMapping = {
    variant: {
        'H1': styled.h1`font: 500 44px/128% ${font}`,
        'H2': styled.h2`font: 500 30px/120% ${font}`,
        'H3': styled.h3`font: 600 22px/124% ${font}`,
        'H4': styled.h4`font: 700 18px/132% ${font}`,
        'body-L': styled.p`font: 400 22px/144% ${font}`,
        'body-M': styled.p`font: 300 18px/132% ${font}`,
        'body-M-regular': styled.p`font: 400 18px/132% ${font}`,
        'body-S': styled.p`font: 300 16px/148% ${font}`,
        'body-S-regular': styled.p`font: 400 16px/148% ${font}`,
        'body-XS': styled.p`font: 400 14px/140% ${font}`,
    }
}