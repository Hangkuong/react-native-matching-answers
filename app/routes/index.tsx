import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeContainer from "screens/Home/HomeContainer";
import DragDropExercise from "screens/DragDropExercise";
import MatchAnswer from "screens/MatchAnswer";

const HomeStack = createNativeStackNavigator();

function HOME_STACK() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HOME" component={HomeContainer} />
      <HomeStack.Screen name="DragDrop" component={DragDropExercise} />
      <HomeStack.Screen name="MatchingAnswer" component={MatchAnswer} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HOME_STACK />
    </NavigationContainer>
  );
}
