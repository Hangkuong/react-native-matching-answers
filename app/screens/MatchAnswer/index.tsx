import React, { Component } from 'react'
import MatchAnswerScreen from './MatchAnswerScreen'

interface Props {
    navigation: any
}
interface State {

}

class index extends Component<Props, State> {
    state = {}

    render() {
        return <MatchAnswerScreen goBack={() => this.props.navigation.goBack()} />
    }
}

export default index
