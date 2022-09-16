import React from 'react'
import { Dimensions } from 'react-native'
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg'
import { LinePath } from '../MatchAnswerScreen';
import { STROCK_COLOR, STROCK_WIDTH } from '../MatchAnswerStyles';

interface Props {
    path: Animated.SharedValue<LinePath>
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedLine = Animated.createAnimatedComponent(Line)

const MatchingLineUI = ({ path }: Props) => {
    const { width, height } = Dimensions.get('window');

    const animatedProps = useAnimatedProps(() => {
        return {
            x1: path.value.x1,
            y1: path.value.y1,
            x2: path.value.x2,
            y2: path.value.y2,
        };
    });

    return (
        <AnimatedSvg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
            <AnimatedLine
                fill="none"
                stroke={STROCK_COLOR}
                strokeWidth={STROCK_WIDTH}
                animatedProps={animatedProps}
            />
        </AnimatedSvg>
    )
}

export default MatchingLineUI
