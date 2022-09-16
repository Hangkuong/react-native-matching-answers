import { Provider } from 'mobx-react';
import * as React from 'react';
import { ActivityIndicator, LogBox, Platform, StatusBar } from 'react-native';
// Lazy load component
const Routes = React.lazy(() => import("routes"))

export interface Props { }

export interface State {
	ready: boolean;
}

LogBox.ignoreLogs(['Warning: componentWill'])
function App(stores: any) {
  return class Setup extends React.Component<Props, State> {
    constructor(props: any) {
      super(props)
      this.state = {
        ready: true,
      }
      Platform.OS === 'android' ? StatusBar.setTranslucent(true) : null
      //   messaging().onMessage(async (remoteMessage) => {
      //     const { title, body, key } = remoteMessage.data || {}
      //     await localNotification(title, body, remoteMessage.data, true)
      //     // await scheduledNotification(title, body, remoteMessage.data)
      //   })
    }

    render() {
      const { ready } = this.state
      if (!ready) return <ActivityIndicator />
      return (
        <Provider {...stores}>
          <React.Suspense fallback={true}>
            <Routes />
          </React.Suspense>
        </Provider>
      )
    }
  }
}

export default App
