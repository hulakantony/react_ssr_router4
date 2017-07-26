import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../actions/users';

class Users extends Component {
  static fetchData(store) {
    return store.dispatch(fetchUsers());
  }
  // componentDidMount () {
  //   this.props.fetchUsers();
  // }
  render () {
    const  { users } = this.props;
    return (
      <ul>
        { users.map((user, index) => {
          return (
            <li key={index}>
              { user.name }
            </li>
          )
        }) }
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
