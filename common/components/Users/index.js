import React, { Component } from 'react';
import { fetchUsersIfNeeded } from '../../actions/users';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }
  render () {
    const  { users } = this.props;
    return (
      <ul>
        { users.map((user, index) => {
          return (
            <li key={index}>
              USER: { user.name }
            </li>
          )
        }) }
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.users.list
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchUsersIfNeeded}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
