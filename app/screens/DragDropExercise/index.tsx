import React, { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import DragDropExerciseScreen from './DragDropExerciseScreen'

interface Props extends NavigationV5Props {

}
interface State {

}

class index extends Component<Props, State> {
    state = {}


    render() {
        return <DragDropExerciseScreen />
    }
}

export default index
