import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighLight
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Index from "./Apk/index";
import List from './Apk/list';
import EditList from './Apk/editlist'

const App = StackNavigator({
  Main : {screen: Index},
  List : {screen: List},
  Editlist : {screen : EditList}

});

export default App;
