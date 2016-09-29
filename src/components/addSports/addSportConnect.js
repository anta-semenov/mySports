import {connect} from 'react-redux'
import AddSport from './AddSport'
import {getAvailableSports} from '../../reducer'
import {addSport} from '../../actions/actionCreators'

const mapStateToProps = state => ({
  availableSports: getAvailableSports(state)
})

const mapDispatchToProps = dispatch => ({
  onSportPress: (sport) => dispatch(addSport(sport))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSport)
