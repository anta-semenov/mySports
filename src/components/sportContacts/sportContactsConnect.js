import {connect} from 'react-redux'
import SportContacts from './SportContacts'

const mapStateToProps = (state, {sportId}) => ({

})

const mapDispatchToProps = dispatch => ({

})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SportContacts)
