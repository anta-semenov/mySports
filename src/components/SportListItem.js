import React from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

const SportListItem = ({title, onPress, showArrow}) => (
  <TouchableWithoutFeedback  onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.primaryText}>{title}</Text>
      {showArrow && <Icon name='chevron-right' size={45} color='rgb(158, 158, 158)'/>}
    </View>
  </TouchableWithoutFeedback>
)

SportListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  showArrow: React.PropTypes.bool
}

const styles = StyleSheet.create({
  primaryText: {
    fontWeight: '400',
    lineHeight: 24,
    fontSize: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 0,
    height: 48,
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderColor: 'rgb(168, 168, 168)'
  }
})

export default SportListItem
