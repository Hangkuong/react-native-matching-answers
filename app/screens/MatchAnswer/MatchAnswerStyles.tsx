import { NokoraBold } from "@customs/customFont";
import _styles from "@styles";
import modules from "modules";
import { StyleSheet } from "react-native";

export const PRESS_DURATION = 200

export const BOX_WIDTH = 125
export const BOX_HEIGHT = 125

export const HEADER_HEIGHT = 200

export const BOX_AREA = 30

export const BOX_MARGIN = 12

export const HALF_WINDOW_WIDTH = modules.VIEW_PORT_WIDTH / 2
export const HALF_WINDOW_HEIGHT = modules.VIEW_PORT_HEIGHT / 2

export const STROCK_WIDTH = 5
export const STROCK_COLOR = modules.COLOR_CORRECT

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: modules.WHITE,
    },
    title: {
        ...NokoraBold,
        color: modules.TEXT,
        fontSize: modules.FONT_H5,
        padding: modules.BODY_HORIZONTAL_12,
    },
    content: {
        ..._styles.rows,
        justifyContent: 'space-between',
        // paddingVertical: modules.BODY_HORIZONTAL_24,
    },
    col: {
        paddingHorizontal: modules.BODY_HORIZONTAL_12
    },
    box: {
        width: 125,
        height: 125,
        ..._styles.shadow,
        ..._styles.center,
        backgroundColor: modules.WHITE,
        borderRadius: modules.CARD_RADIUS,
        marginVertical: modules.BODY_HORIZONTAL_12,
    },
    label: {
        ...NokoraBold,
        color: modules.SUB_TEXT,
        fontSize: modules.FONT_H6,
    },

})
