/**
 * @format
 */
import 'react-native-gesture-handler'
import { setCustomText, setCustomTouchableOpacity, setCustomTextInput } from 'react-native-global-props'
import { enableScreens } from 'react-native-screens'
import { AppRegistry } from 'react-native'
import { fontNormal } from './customs/customFont'
import modules from './app/modules'
import App from './App'
import { name as appName } from './app.json'

enableScreens()

const customTextProps = {
  style: {
    fontSize: modules.FONT,
    ...fontNormal,
  },
}
const customTouchableOpacityProps = {
  activeOpacity: 0.9,
}
const customTextInputProps = {
  spellCheck: false,
  autoCorrect: false,
  allowFontScaling: false,
  autoCapitalize: 'none',
  style: {
    margin: 0,
    padding: 0,
  },
}
setCustomText(customTextProps)
setCustomTouchableOpacity(customTouchableOpacityProps)
setCustomTextInput(customTextInputProps)

AppRegistry.registerComponent(appName, () => App)
