import React from 'react'
import {ListView, Text, TouchableHighlight} from 'react-native'

const AddSport = ({availableSports, onSportPress, navigator}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
  return (
    <ListView
      dataSource={ds.cloneWithRows(availableSports)}
      renderRow={sport => <TouchableHighlight onPress={() => {
        onSportPress(sport)
        navigator.pop()
      }}>
        <Text>{sport.title}</Text>
      </TouchableHighlight>}
    />
  )
}

AddSport.propTypes = {

}

export default AddSport
