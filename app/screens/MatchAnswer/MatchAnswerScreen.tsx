import _styles from '@styles';
import ArrowHeader from 'components/ArrowHeader';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
import DetailModal from './components/DetailModal';
import MatchingBox from './components/MatchingBox';
import MatchingLineJS from './components/MatchingLineJS';
import MatchingLineUI from './components/MatchingLineUI';
import { BOX_AREA, STROCK_COLOR, styles } from './MatchAnswerStyles'

interface Props {
    goBack: () => void
}

type ContextType = {
    startX: number
    startY: number
    finish: boolean
    active: boolean
}
export type MeasurementSection = 'question' | 'answer'
export interface Possition {
    key: string,
    x: number,
    y: number,
    section: MeasurementSection,
}
export interface MeasurementRef {
    ref: any,
    key: string,
    color: string,
    path: LinePath,
    active: boolean,
    targetKey: string,
    section: MeasurementSection,
}
export interface LinePath {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
}
const answers = [
    {
        key: 'a1',
        label: 'answer 1',
    },
    {
        key: 'a2',
        label: 'answer 2',
    },
    {
        key: 'a3',
        label: 'answer 2',
    },
    {
        key: 'a4',
        label: 'answer 2',
    },
]
const questions = [
    {
        key: 'q1',
        label: 'qustion 1',
    },
    {
        key: 'q2',
        label: 'qustion 2',
    },
    {
        key: 'q3',
        label: 'qustion 3',
    },
    {
        key: 'q4',
        label: 'qustion 4',
    },
]

const MatchAnswerScreen = ({ goBack }: Props) => {

    const path = useSharedValue<LinePath>({ x1: 0, y1: 0, x2: 0, y2: 0 })
    const selectedItem = useSharedValue<Possition>({ key: '', x: 0, y: 0, section: 'question' })

    const [active, setActive] = useState(false)
    const [selectedContent, setSelectedContent] = useState(null)
    const [modalVisible, setmodalVisible] = useState(false)
    const [possitions, setPossitions] = useState<Possition[]>([])
    const [measurments, setMeasurments] = useState<MeasurementRef[]>([])

    const toggleModal = (item: any) => {
        setSelectedContent(item)
        setmodalVisible(!modalVisible)
    }

    const injectRef = (data: any) => {
        const temp: MeasurementRef[] = data.map((i: Possition) => {
            return { ...i, path: { x1: i.x, y1: i.y, x2: i.x, y2: i.y }, ref: React.createRef(), targetKey: '', }
        })
        setMeasurments(temp)
    }

    const onMeasurement = (key: string, x: number, y: number, section: MeasurementSection) => {
        setPossitions(prev => {
            const po = [...prev, { key, x, y, section }]
            injectRef(po)
            return po
        })
    }

    const activatedItem = (key: string, x2: number, y2: number) => {
        const { x, y } = selectedItem.value

        setActive(false)

        setMeasurments(prev => prev
            .map((i) => {
                if (i.targetKey === key && i.key !== selectedItem.value.key) {
                    i.ref.current.toggle(false)
                    return {
                        ...i,
                        targetKey: '',
                        path: { ...i.path, x2: i.path.x1, y2: i.path.y1 },
                    }
                } else if (i.targetKey === selectedItem.value.key) {
                    i.ref.current.toggle(false)
                    return {
                        ...i,
                        targetKey: '',
                        path: { ...i.path, x2: i.path.x1, y2: i.path.y1 },
                    }
                }
                return i
            }))

        measurments.find(m => m?.key === key)?.ref.current.toggle(true)

        setMeasurments(prev => prev
            .map((i) => {
                if (i.key === selectedItem.value.key) {
                    return {
                        ...i,
                        targetKey: key,
                        path: { x1: x, y1: y, x2, y2 },
                    }
                }
                if (i.key === key) {
                    return {
                        ...i,
                        targetKey: selectedItem.value.key,
                        path: { ...i.path, x2: i.path.x1, y2: i.path.y1 },
                    }
                }
                return i
            }))
    }

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (event, ctx) => {
            ctx.startX = event.absoluteX
            ctx.startY = event.absoluteY
        },
        onActive: (event) => {
            if (active) {
                if (selectedItem.value.section === 'question') {
                    possitions
                        .filter(f => f.section === 'answer')
                        .forEach((i) => {
                            const ix = i.x
                            const iy = i.y
                            if (
                                event.absoluteX > ix - BOX_AREA &&
                                event.absoluteX < ix + BOX_AREA &&
                                event.absoluteY > iy - BOX_AREA &&
                                event.absoluteY < iy + BOX_AREA
                            ) {
                                const { x, y } = selectedItem.value
                                path.value = { x1: x, y1: y, x2: x, y2: y }
                                runOnJS(activatedItem)(i.key, ix, iy)
                            }
                        })
                } else if (selectedItem.value.section === 'answer') {
                    possitions
                        .filter(f => f.section === 'question')
                        .forEach((i) => {
                            const ix = i.x
                            const iy = i.y
                            if (
                                event.absoluteX > ix - BOX_AREA &&
                                event.absoluteX < ix + BOX_AREA &&
                                event.absoluteY > iy - BOX_AREA &&
                                event.absoluteY < iy + BOX_AREA
                            ) {
                                const { x, y } = selectedItem.value
                                path.value = { x1: x, y1: y, x2: x, y2: y }
                                runOnJS(activatedItem)(i.key, ix, iy)
                            }
                        })
                }
                path.value = { ...path.value, x2: event.absoluteX, y2: event.absoluteY }
            }
        },
        onEnd: () => {
            runOnJS(setActive)(false)
            const { x, y } = selectedItem.value
            path.value = { x1: x, y1: y, x2: x, y2: y }
        }
    });

    const handlePress = (item: any, x: number, y: number, section: MeasurementSection) => {
        measurments
            .filter(m => m.section === section && m.key !== item.key && m.targetKey === '')
            .map((i) => {
                i?.ref.current.toggle(false)
            })
        setMeasurments(prev => prev
            .map((i) => {
                if (i.key === item.key) {
                    measurments.find(m => m.key === i.targetKey)?.ref.current.toggle(false)
                    return {
                        ...i,
                        path: { ...i.path, x2: i.path.x1, y2: i.path.y1 },
                    }
                }
                return i
            }))
        setMeasurments(prev => prev
            .map((i) => {
                if (i.targetKey === item.key) {
                    return {
                        ...i,
                        path: { ...i.path, x2: i.path.x1, y2: i.path.y1 },
                    }
                }
                return i
            }))
        setActive(true)
        runOnUI(() => {
            selectedItem.value = possitions.find(f => f.key === item.key) as Possition
            path.value = { ...path.value, x1: x, y1: y, x2: x, y2: y }
        })()
    }

    return (
        <View style={styles.container}>
            {/* fake header */}
            <ArrowHeader title="Matching answers" goBack={goBack} />
            <View style={[_styles.absolute, StyleSheet.absoluteFill]}>
                {active && <MatchingLineUI path={path} />}
            </View>

            <Text style={styles.title}>ចូលប្អូនគឺធំចម្លើយដែលត្រឹមត្រូវ</Text>

            {measurments.map((i) => {
                return (
                    <View key={i.key} style={[_styles.absolute, StyleSheet.absoluteFill]}>
                        <MatchingLineJS color={STROCK_COLOR} path={i.path} />
                    </View>
                )
            })}

            <PanGestureHandler
                onGestureEvent={gestureHandler}
            >
                <Animated.View style={[styles.col, StyleSheet.absoluteFill]}>

                    {questions.map((item, index) => {
                        return <MatchingBox
                            item={item}
                            index={index}
                            key={item.key}
                            section="question"
                            onPress={() => toggleModal(item)}
                            ref={measurments.find(f => f.key === item.key)?.ref}
                            color={measurments.find(f => f.key === item.key)?.color}
                            onMeasurement={(x, y) => onMeasurement(item.key, x, y, 'question')}
                            onToggle={(x, y) => handlePress(item, x, y, 'question')}
                        />
                    })}

                    {answers.map((item, index) => {
                        return <MatchingBox
                            item={item}
                            index={index}
                            key={item.key}
                            section="answer"
                            onPress={() => toggleModal(item)}
                            ref={measurments.find(f => f.key === item.key)?.ref}
                            onMeasurement={(x, y) => onMeasurement(item.key, x, y, 'answer')}
                            onToggle={(x, y) => handlePress(item, x, y, 'answer')}
                        />
                    })}

                </Animated.View>
            </PanGestureHandler>

            <View style={_styles.absoluteTop}>
                <ArrowHeader title="Matching answers" goBack={goBack} />
            </View>

            <DetailModal data={selectedContent} isVisible={modalVisible} toggleModal={() => setmodalVisible(false)} />
        </View>
    );
}

export default MatchAnswerScreen
