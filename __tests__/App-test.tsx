/**
 * @format
 */

 import 'react-native'
 import React from 'react'
 import renderer from 'react-test-renderer'
 import App from '../App'
 // Note: test renderer must be required after react-native.
 jest.mock('../node_modules/react-native/Libraries/Animated/src/NativeAnimatedHelper.js')

 it('renders correctly', () => {
     renderer.create(<App />)
 })
