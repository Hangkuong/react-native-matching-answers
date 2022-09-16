import _styles from "@styles";
import modules from "modules";
import { StyleSheet } from "react-native";


export const BOX_WIDTH = 50
export const BOX_HEIGHT = 25

export const BOX_MARGIN = 12

export const HEADER_HEIGHT = 112

export const WORD_BANK_HEIGHT = modules.VIEW_PORT_HEIGHT / 4

export const BOX_AREA = 20

export const HALF_WINDOW_WIDTH = modules.VIEW_PORT_WIDTH / 2
export const HALF_WINDOW_HEIGHT = modules.VIEW_PORT_HEIGHT / 2

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: modules.WHITE,
    },
    header: {
      top: 0,
      left: 0,
      right: 0,
      position: 'absolute',
    },
    ground: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },
    content: {
        paddingTop: HEADER_HEIGHT,
        flexWrap: 'wrap',
        flexDirection: 'row',
        position: 'absolute',
    },
    view1: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      ..._styles.center,
      backgroundColor: 'red',
    },
    view2: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      ..._styles.center,
      alignSelf: 'flex-end',
      backgroundColor: 'green',
      marginVertical: modules.BODY_HORIZONTAL_12,
    },
    view3: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      ..._styles.center,
      backgroundColor: 'yellow',
    },
  })
