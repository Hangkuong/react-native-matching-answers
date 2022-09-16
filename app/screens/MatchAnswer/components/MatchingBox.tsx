import { NokoraBold } from '@customs/customFont'
import _styles from '@styles'
import modules from 'modules'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { LayoutChangeEvent, Pressable, StyleSheet, Text } from 'react-native'
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { MeasurementSection } from '../MatchAnswerScreen'
import { BOX_HEIGHT, BOX_WIDTH, BOX_MARGIN, STROCK_COLOR, STROCK_WIDTH, HEADER_HEIGHT, PRESS_DURATION } from '../MatchAnswerStyles'

interface Props {
    item: any
    index: number
    color?: string
    section: MeasurementSection
    onPress: () => void
    onToggle: (x: number, y: number) => void
    onMeasurement: (x: number, y: number) => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const MatchingBox = forwardRef(({ item, section, color, index, onToggle, onPress, onMeasurement, }: Props, forwardedRef) => {

    const [y, setY] = useState(0)
    const [x, setX] = useState(0)
    const activeProgress = useSharedValue(0)

    const activeted = () => {
        activeProgress.value = withTiming(1, { duration: 175 }, (isFinish) => {
            if (isFinish) {
                activeProgress.value = withTiming(2, { duration: 175 })
            }
        })
    }

    const deactivated = () => {
        activeProgress.value = withTiming(0, { duration: 175 }, (isFinish) => {
            if (isFinish) {
                activeProgress.value = withTiming(0, { duration: 175 })
            }
        })
    }

    const activeAnimation = useAnimatedStyle(() => {
        return {
            borderColor: interpolateColor(activeProgress.value, [0, 1], [modules.WHITE, color || STROCK_COLOR]),
            transform: [
                { translateY: ((index * (BOX_HEIGHT + BOX_MARGIN)) + BOX_MARGIN) + HEADER_HEIGHT },
                { translateX: section === 'question' ? BOX_MARGIN : -BOX_MARGIN },
                { scale: interpolate(activeProgress.value, [0, 1, 2], [1, 1.1, 1], Extrapolate.CLAMP) }
            ],
        }
    })

    useImperativeHandle(forwardedRef, () => {
        return {
            toggle: (value: boolean) => {
                if (value) {
                    activeted()
                } else {
                    deactivated()
                }
            },
        };
    });

    return (
        <AnimatedPressable
            style={[
                styles.box,
                activeAnimation,
                { alignSelf: section === 'question' ? 'flex-start' : 'flex-end' }
            ]}
            onLayout={(event: LayoutChangeEvent) => {
                const { x } = event.nativeEvent.layout;
                const py = ((index * (BOX_HEIGHT + BOX_MARGIN)) + BOX_MARGIN + (BOX_HEIGHT / 2)) + HEADER_HEIGHT
                const px = x + (BOX_WIDTH / 2) + (section === 'question' ? BOX_MARGIN : -BOX_MARGIN)
                setY(py)
                setX(px)
                onMeasurement(px, py)
            }}
            delayLongPress={PRESS_DURATION}
            onLongPress={() => {
                onToggle(x, y)
                activeted()
            }}
            onPress={onPress}
        >
            <Text style={styles.label}>{`${item.label} (${x}, ${y})`}</Text>
        </AnimatedPressable>
    )
})

export default MatchingBox

const styles = StyleSheet.create({
    box: {
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        ..._styles.shadow,
        ..._styles.center,
        position: 'absolute',
        borderWidth: STROCK_WIDTH,
        backgroundColor: modules.WHITE,
        borderRadius: modules.CARD_RADIUS,
    },
    label: {
        ...NokoraBold,
        color: modules.SUB_TEXT,
        fontSize: modules.FONT_H6,
    },
})
