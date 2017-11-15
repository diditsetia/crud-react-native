/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';




export default class Index extends Component {
  static navigationOptions = {
   title: 'FORM INPUT',
 };

    constructor(){
      super()
      this.state ={
        title: '',
        subtitle: '',
        coment: ''
      }
    }

    changeTitle (title) {
      this.setState({title})
    }

    changeSubtitle (subtitle) {
      this.setState({subtitle})
    }
    changeComent (coment) {
      this.setState({coment})
    }

    buttonPressed () {
      const { navigate } = this.props.navigation;
       const arrayData = [];
      if (this.state.coment && this.state.title && this.state.subtitle) {

          const data = {
            id:1,
            title : this.state.title,
            subtitle : this.state.subtitle,
            coment : this.state.coment
          }
          arrayData.push(data);
          try {
            AsyncStorage.getItem('notifications_push').then((value) => {
              if(value !==null){
                  const d = JSON.parse(value);
                  d.push({...data,id:JSON.parse(value).length + 1})
                  AsyncStorage.setItem('notifications_push',JSON.stringify(d)).then(() => {
                     navigate('List', { name: 'LIST' })
                  })
              }else {
                AsyncStorage.setItem ('notifications_push',JSON.stringify(arrayData)).then(() => {
                    navigate('List', { name: 'LIST' })
                })
              }
            })
          } catch (err) {
            console.log(err)
        }
      } else {
        alert('Data gagal di simpan');
      }
    }
  render() {
      const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <View>
          <TextInput
            style ={{height:40, width:340, marginTop: 10, marginLeft:10}}
            placeholder ="title"
            value={this.state.title}
            onChangeText={(title) => this.changeTitle(title)}
           />
          <TextInput
            style ={{height:40, width:340, marginTop: 10, marginBottom: 10, marginLeft:10}}
            placeholder="subtitle"
            value={this.state.subtitle}
              onChangeText={(subtitle) => this.changeSubtitle(subtitle)}
           />
          <TextInput
            multiline={true}
            style ={{height:40, width:340, marginTop:10, marginBottom:10, marginLeft:10}}
            placeholder="coment"
            value={this.state.coment}
              onChangeText={(coment) => this.changeComent(coment)}
          />
          <TouchableOpacity
              onPress={() => this.buttonPressed()}
           >
            <View style={{height:40, width: 340, justifyContent:'center', alignItems:'center', backgroundColor:'#87CEEB', marginLeft:10, borderRadius:10}}>
              <Text>Send</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity
          onPress={() =>
              navigate('List', { name: 'LIST' })
                }
           >
            <View style={{height:40, width: 340, justifyContent:'center', alignItems:'center', backgroundColor:'#87CEEB', marginTop:10, marginLeft:10, borderRadius:10}}>
              <Text>To List</Text>
            </View>
          </TouchableOpacity >
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

});
