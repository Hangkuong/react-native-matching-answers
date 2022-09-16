import _styles from '@styles'
import modules from 'modules'
import React, { useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated'
import { Possition, Tile } from '../DragDropExerciseScreen'
import { BOX_AREA, BOX_HEIGHT, BOX_MARGIN, BOX_WIDTH, HALF_WINDOW_HEIGHT, HALF_WINDOW_WIDTH, WORD_BANK_HEIGHT } from '../DragDropExerciseStyles'

interface Props {
    item: Tile
    index: number
    scrollY: Animated.SharedValue<number>
    possitions: Possition[]
    tileMeasurement: (key: string, x: number, y: number) => void
}

type ContextType = {
    tranformX: number
    tranformY: number
    x: number,
    y: number,
}

const DragBox = ({ possitions, item, index, scrollY, tileMeasurement }: Props) => {

    const [y, setY] = useState(0)
    const [x, setX] = useState(0)
    const [row, setRow] = useState(0)

    const py = useSharedValue(0)
    const tranformX = useSharedValue(0)
    const tranformY = useSharedValue(0)

    const active = useSharedValue(false)

    const panEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, ctx) => {
            ctx.tranformX = tranformX.value
            ctx.tranformY = tranformY.value
        },
        onActive: (event, ctx) => {
            tranformX.value = ctx.tranformX + event.translationX;
            tranformY.value = ctx.tranformY + event.translationY;
        },
        onEnd: (event, ctx) => {
            possitions.map((i) => {
                if (
                    event.absoluteX > i.x - BOX_AREA &&
                    event.absoluteX < i.x + BOX_AREA &&
                    event.absoluteY > i.y - BOX_AREA &&
                    event.absoluteY < i.y + BOX_AREA
                ) {
                    const ax = -x
                    const ay = -y

                    const nx = ax + i.x
                    const ny = ay + i.y

                    active.value = true

                    console.log(`i.x ${i.x}`)
                    console.log(`nx ${nx}, ny ${ny}`)

                    tranformX.value = withSpring(nx)
                    tranformY.value = withSpring(ny)
                } else {
                    if (!active.value) {
                        tranformX.value = withSpring(0)
                        tranformY.value = withSpring(0)
                    }
                }
            })
        }
    });

    const viewPanAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: tranformX.value },
                { translateY: tranformY.value },
            ],
        };
    });


    // const itemAnimation = useAnimatedStyle(() => {
    //     return {
    // transform: [
    //     { translateX: (index * (BOX_WIDTH + BOX_MARGIN) + BOX_MARGIN) },
    // ]
    //     }
    // })

    return (
        <Animated.View
            style={[
                {
                    height: BOX_HEIGHT,
                    backgroundColor: 'pink',
                    // position: 'absolute',
                    marginHorizontal: modules.BODY_HORIZONTAL_12 / 2,
                    transform: [
                        { translateY: 12 + (py.value / 2) },
                    ]

                },
            ]}
            onLayout={(event: LayoutChangeEvent) => {
                const { y } = event.nativeEvent.layout;
                py.value = y
                setRow(y / BOX_HEIGHT)
                const nx = Math.round((index * (BOX_WIDTH + BOX_MARGIN) + BOX_MARGIN)) - ((y / BOX_HEIGHT) * (modules.VIEW_PORT_WIDTH - 80))
                const ny = Math.round(modules.VIEW_PORT_HEIGHT - WORD_BANK_HEIGHT) + (y + ((y / BOX_HEIGHT) * BOX_MARGIN))
                setX(nx + (BOX_WIDTH / 2) + (BOX_MARGIN / 2))
                setY(ny + (BOX_MARGIN * 2))
                tileMeasurement(item.key, nx, ny)
            }}
        >
            <PanGestureHandler onGestureEvent={panEventHandler}>
                <Animated.View
                    style={[
                        styles.view3,
                        viewPanAnimation,
                    ]}
                >
                    <Text>{item.label}</Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

export default DragBox

const styles = StyleSheet.create({
    view3: {
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        ..._styles.center,
        backgroundColor: 'red'
    },
})
