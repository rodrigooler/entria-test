//@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import Relay from 'react-relay';
import ViewerQuery from '../relay/ViewerQuery';
import { createRenderer } from '../relay/RelayUtils';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class UserList extends Component {
  renderRow = ({node}) => {
    return (
      <TouchableHighlight
        onPress={() => this.goToUserDetail(node)}
        underlayColor="whitesmoke">
        <View style={styles.view}>
          <Text>{node.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { users } = this.props.viewer;
    return (
      <View style={styles.container}>
        <ListView
          pageSize={2}
          scrollRenderAheadDistance={1000}
          initialListSize={2}
          dataSource={dataSource.cloneWithRows(users.edges)}
          renderRow={this.renderRow}
          onEndReached={this.onEndReached}
          renderSeparator={(secID, rowID) => <View style={styles.separator}
            key={rowID}/>}
            enableEmptySections={true}
            removeClippedSubviews={true}/>
      </View>
    );
  }
}

export default createRenderer(UserList, {
  queries: ViewerQuery,
  initialVariables: {
    count: 5
  },
  fragments: {
    viewer: () => Relay.QL `
      fragment on Viewer {
        users(first: $count) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  separator: {
    height: 2,
    backgroundColor: 'rgb(221,221,221)'
  },
  view: {
    margin: 20
  },
})
