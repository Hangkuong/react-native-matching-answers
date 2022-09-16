import React from 'react'
import { Dimensions } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import { LinePath } from '../MatchAnswerScreen';
import { STROCK_COLOR, STROCK_WIDTH } from '../MatchAnswerStyles';

interface Props {
    path: LinePath
    color?: string
}


const MatchingLineJS = ({ path, color }: Props) => {
    const { width, height } = Dimensions.get('window');

    return (
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
            <Line
                fill="none"
                x1={path.x1}
                x2={path.x2}
                y1={path.y1}
                y2={path.y2}
                stroke={color || STROCK_COLOR}
                strokeWidth={STROCK_WIDTH}
            />
        </Svg>
    )
}

export default MatchingLineJS
