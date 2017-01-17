import React from 'react'
import {Platform} from 'react-native'
import {Router, Scene, Actions} from 'react-native-router-flux'
import MySports from './mySports/mySportsConnect'
import AddSport from './addSports/addSportConnect'
import SportContacts from './sportContacts/sportContactsConnect'

const App = () => (
  <Router sceneStyle={{marginTop: Platform.OS === 'ios' ? 64 : 56}}>
    <Scene key='root'>
      <Scene
        key='mySports'
        component={MySports}
        title='My sports'
        rightTitle='Add'
        onRight={() => Actions.addSport()}
        initial={true}/>
      <Scene key='addSport' component={AddSport} backTitle='Cancel' title='Choose sport'/>
      <Scene
        key='sportContacts'
        component={SportContacts}
        backTitle='My sports'
        getTitle={({sportTitle}) => sportTitle }
      />
    </Scene>
  </Router>
)

export default App
