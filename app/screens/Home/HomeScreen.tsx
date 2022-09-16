import * as React from 'react'
import { View, Text, SafeAreaView, Button } from 'react-native'
import _styles from '@styles'
import { useNavigation } from '@react-navigation/native'

export interface Props { }

export default function HomeScreen(props: Props): React.ReactElement {

  const navigation = useNavigation()

  return (
    <View style={_styles.flx1}>
      <SafeAreaView>
        <Text>Home Screen</Text>
        <Button title="Drag Drop" onPress={() => navigation.navigate('DragDrop')}/>
        <Button title="Mathcing Answer" onPress={() => navigation.navigate('MatchingAnswer')}/>
      </SafeAreaView>
    </View>
  )
}

