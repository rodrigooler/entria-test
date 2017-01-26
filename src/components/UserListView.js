/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class UserListView extends Component {
    constructor() {
        super();
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([
              'Pikachu',
              'Raichu'
            ])
        };
    }

    render() {
        const {dataSource} = this.state

        return (
          <ListView
            dataSource={dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}/>
          );
    }
}

const styles = StyleSheet.create({});
