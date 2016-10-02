import React from 'react'
import {ListView} from 'react-native'
import SportList from '../SportListItem'


const AddSport = ({availableSports, onSportPress, navigator}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
  return (
    <ListView
      dataSource={ds.cloneWithRows(availableSports)}
      renderRow={sport => <SportList
        title={sport.title}
        onPress={() => {
          onSportPress(sport)
          navigator.pop()
        }}
      />}
    />
  )
}

AddSport.propTypes = {

}

export default AddSport
