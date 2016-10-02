import {connect} from 'react-redux'
import SportContacts from './SportContacts'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SportContacts)
