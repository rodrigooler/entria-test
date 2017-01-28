//@flow

import React, { Component } from 'react';
import Relay from 'react-relay';
import UserList from './components/UserList';
import RelayStore from './relay/RelayStore';

RelayStore.reset(
  new Relay.DefaultNetworkLayer('http://192.168.1.104:5000/graphql')
);

export default class EntriaTest extends Component {
  render() {
    return (
      <UserList/>
    );
  }
}
