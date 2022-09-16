import { NokoraBold } from '@customs/customFont'
import _styles from '@styles'
import modules from 'modules'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'
import { Item, Possition } from '../DragDropExerciseScreen'
import { BOX_HEIGHT, BOX_WIDTH, HEADER_HEIGHT } from '../DragDropExerciseStyles'

interface Props {
    item: Item
    measurment: (key: string, x: number, y: number, width: number, height: number) => void
}

const HolderBox = ({ item, measurment }: Props) => {
    const [y, setY] = useState(0)
    const [x, setX] = useState(0)
    return (
        item.status === 'question'
            ?
            <Text style={styles.label}>{item.label || 'unknown'}</Text>
            :
            <View
                style={styles.view2}
                onLayout={(event: LayoutChangeEvent) => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                    const nx = Math.round(x + (BOX_WIDTH / 2))
                    const ny = Math.round(y + (BOX_HEIGHT / 2))
                    setX(nx)
                    setY(ny)
                    measurment(item.key, nx, ny, width, height)
                }}
            >
                <Text>{`key: ${item.key} x: ${x} y: ${y}`}</Text>
            </View>
    )
}

export default HolderBox

const styles = StyleSheet.create({
    label: {
        ...NokoraBold,
        fontSize: modules.FONT_H6,
        margin: modules.BODY_HORIZONTAL_12 / 2,
    },
    view2: {
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        ..._styles.center,
        backgroundColor: 'green',
        margin: modules.BODY_HORIZONTAL_12 / 2,
    },
})
