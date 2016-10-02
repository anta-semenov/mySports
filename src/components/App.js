import React from 'react'
import {NavigatorIOS} from 'react-native'
import MySports from './mySports/mySportsConnect'
import AddSport from './addSports/addSportConnect'

class App extends React.Component {
  handlePlusSportPress() {
    this._nav.push({
      component: AddSport,
      title: 'Choose sport',
      leftButtonTitle: 'Cancel',
      onLeftButtonPress: () => this._nav.pop()
    })
  }

  render() {
    return(
      <NavigatorIOS
        ref={ref => {this._nav = ref}}
        initialRoute={{
          component: MySports,
          title: 'My sport',
          rightButtonTitle: 'Add',
          onRightButtonPress: () => this.handlePlusSportPress()
        }}
        style={{flex: 1}}
      />
    )
  }
}

export default App
