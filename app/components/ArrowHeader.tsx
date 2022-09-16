import { fontGSans, NokoraBold } from '@customs/customFont'
import modules from 'modules'
import React from 'react'
import { StyleSheet , View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import SafeArea from './SafeArea'

interface Props {
    goBack: () => void
    onRightIcon?: () => void
    rightIcon?:string
    title: string
    usedSmallText?: boolean
    noBg?: boolean
    white?: boolean
    isShowRightIcon?: boolean
    disabled?: boolean
    backgroundColor?:string
    textColor?:string

    secondRightIcon?:string
    onSecondRightIcon?:() => void
}
export default function ArrowHeader(props: Props) {
    return (
        <View style = { props.backgroundColor ? {backgroundColor:props.backgroundColor} : null}>
            <SafeArea style={props.noBg ? {} : { backgroundColor: modules.WHITE }} edges="safeTop" />
            <View style={[styles.header, props.noBg ? {} : { backgroundColor: modules.WHITE }]}>
                <TouchableOpacity
                    disabled={props.disabled}
                    onPress={() => props.goBack()}
                    style={styles.backButton}>
                    <Icon color={modules.WHITE} size={modules.FONT_H2} name="chevron-left" />
                </TouchableOpacity>
                <Text numberOfLines={1} style={[styles.screenTitle, props.usedSmallText ? { fontSize: modules.FONT_H6, ...fontGSans } : null, props.textColor ? {color:props.textColor} : { color: props.white ? modules.WHITE : modules.TEXT }]}> {props.title}</Text>
                {
                    props.onSecondRightIcon ?
                        <TouchableOpacity
                            onPress={() => props.onSecondRightIcon && props.onSecondRightIcon()}
                            style={styles.backButton}>
                            <Icon color={modules.WHITE} size={modules.FONT_H4} name={props.secondRightIcon || ""} />
                        </TouchableOpacity>
                        : null
                }
                {
                    props.isShowRightIcon ?
                        <TouchableOpacity
                            onPress={() => props.onRightIcon && props.onRightIcon()}
                            style={styles.backButton}>
                            <Icon color={modules.WHITE} size={modules.FONT_H4} name={props.rightIcon || "sliders"} />
                        </TouchableOpacity>
                        : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        borderRadius: modules.RADIUS_BUTTON,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginRight: modules.BODY_HORIZONTAL_12 / 2,
        backgroundColor:modules.TEXT,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        paddingVertical: modules.BODY_HORIZONTAL_12,

    },
    headerButton: {
        width: 40,
        height: 40,
        backgroundColor: modules.WHITE,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    screenTitle: {
        ...NokoraBold,
        fontSize: modules.FONT_H6,
        color: modules.TEXT,
        marginTop: modules.BODY_HORIZONTAL_12 / 2,
        flex: 1,
        marginRight:modules.BODY_HORIZONTAL_12
    },

})
