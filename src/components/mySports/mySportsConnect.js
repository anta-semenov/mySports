import {connect} from 'react-redux'
import MySports from './MySports'
import {getMySports} from '../../reducer'

const mapStateToProps = state => ({
  mySports: getMySports(state)
})

export default connect(mapStateToProps)(MySports)
