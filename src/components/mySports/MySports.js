import React from 'react'
import {ListView, Text} from 'react-native'

const MySports = ({mySports}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
  return (
    <ListView
      dataSource={ds.cloneWithRows(mySports)}
      renderRow={({title}) => <Text>{title}</Text>}
    />
  )
}

export default MySports
