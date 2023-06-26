import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import BoldWoff from './fonts/SFProDisplay-Bold.woff';
import BoldWoff2 from './fonts/SFProDisplay-Bold.woff2';
import MediumWoff from './fonts/SFProDisplay-Medium.woff';
import MediumWoff2 from './fonts/SFProDisplay-Medium.woff2';
import RegularWoff from './fonts/SFProDisplay-Regular.woff';
import RegularWoff2 from './fonts/SFProDisplay-Regular.woff2';
import SemiboldWoff from './fonts/SFProDisplay-Semibold.woff';
import SemiboldWoff2 from './fonts/SFProDisplay-Semibold.woff2';
import AlethiaWoff from './fonts/alethiapro-regular-webfont.woff';
import AlethiaWoff2 from './fonts/alethiapro-regular-webfont.woff2';

export const GlobalStyles = createGlobalStyle`
  ${normalize}
`;

export const SFProDisplay = createGlobalStyle`
    @font-face {
        font-family: 'SFProDisplay';
        src: local('SFProDisplay'),
            url(${BoldWoff}) format('woff'),
            url(${BoldWoff2}) format('woff2');
            font-weight: 700;
            font-style: normal;
    }
    @font-face {
        font-family: 'SFProDisplay';
        src: local('SFProDisplay'),
            url(${SemiboldWoff}) format('woff'),
            url(${SemiboldWoff2}) format('woff2');
            font-weight: 600;
            font-style: normal;
    }
    @font-face {
        font-family: 'SFProDisplay';
        src: local('SFProDisplay'),
            url(${MediumWoff}) format('woff'),
            url(${MediumWoff2}) format('woff2');
            font-weight: 500;
            font-style: normal
    }
    @font-face {
        font-family: 'SFProDisplay';
        src: local('SFProDisplay'),
            url(${RegularWoff}) format('woff'),
            url(${RegularWoff2}) format('woff2');
            font-weight: 400;
            font-style: normal
    }
`;

export const AlethiaPro = createGlobalStyle`
    @font-face {
        font-family: 'AlethiaPro';
        src: local('AlethiaPro'),
            url(${AlethiaWoff}) format('woff'),
            url(${AlethiaWoff2}) format('woff2');
            font-weight: 400;
            font-style: normal;
    }
`;
