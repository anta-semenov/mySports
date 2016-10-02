import React from 'react'
import {ListView} from 'react-native'
import SportListItem from '../SportListItem'
import SportContacts from '../sportContacts/sportContactsConnect'

const MySports = ({mySports, navigator}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
  return (
    <ListView
      dataSource={ds.cloneWithRows(mySports)}
      renderRow={({title}) => <SportListItem
        title={title}
        onPress={() => navigator.push({
          component: SportContacts,
          title: title,
          leftButtonTitle: 'Back',
          onLeftButtonPress: () => navigator.pop()
        })}
        showArrow={true}
      />}
    />
  )
}

MySports.propTypes = {
  mySports: React.PropTypes.array.isRequired
}

export default MySports
