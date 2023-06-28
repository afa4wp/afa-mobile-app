import {useWindowDimensions } from 'react-native';

export const unitToPixels = (unit: number) => {
    return unit * 4;
}

export const ScreenWidth = () => {
    return useWindowDimensions().width
}

export const ScreenHeight = () => {
    return useWindowDimensions().height
}