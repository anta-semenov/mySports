import React from 'react'
import {ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import SportListItem from '../SportListItem'

const MySports = ({mySports}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
  return (
    <ListView
      dataSource={ds.cloneWithRows(mySports)}
      renderRow={({title, id}) => <SportListItem
        title={title}
        onPress={() => Actions.sportContacts({sportId: id, sportTitle: title})}
        showArrow={true}
      />}
    />
  )
}

MySports.propTypes = {
  mySports: React.PropTypes.array.isRequired
}

export default MySports
