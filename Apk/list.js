import React , {Component} from 'react';
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Container, Content, Card, } from 'native-base';

export default class List extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
});
  constructor () {
    super ()
        this.state = {
          list : ''
        }
    try {
      AsyncStorage.getItem('notifications_push').then((value) => {
        this.setState({
           list: JSON.parse(value)
        })
      })
    } catch (err) {
      console.log(err)
  }
}

Editdata (id, index) {
  const data = this.state.list
  const filterdataedit = data.filter (dataid => {
    return dataid.id == id
  })
  console.log(filterdataedit)
  const { navigate } = this.props.navigation;
  navigate('Editlist', { name: 'Edit List', data:filterdataedit[0],index })
}

Hapusdata (id) {
   const data = this.state.list
   const data2 = data.filter ( dataid => {
     return dataid.id !== id
  })
  this.setState({
    list : data2
  })
  AsyncStorage.setItem('notifications_push',JSON.stringify(data2)).then(() => {
  })
}
parseData () {

  if (this.state.list){
    return this.state.list.map((data,i) => {
        console.log(data)
      return (
        <View style={{marginBottom:5, marginTop:5,}}
        key={i}>
              <Content>
                <Card>
                    <Text style={{fontWeight:'bold', marginLeft: 12, marginTop: 10, marginBottom:5}}>{`Title = ${data.title}`}</Text>
                    <Text style={{fontWeight:'bold', marginLeft: 12, marginTop: 5, marginBottom:5}}>{`subtitle = ${data.subtitle}`}</Text>
                    <Text style={{fontWeight:'bold', marginLeft: 12, marginTop: 5, marginBottom:10}}>{`Coment = ${data.coment}`}</Text>
                    <TouchableOpacity
                      onPress={() => this.Hapusdata(data.id, i)}
                    >
                    <View style={{height:40, width: 320, justifyContent:'center', alignItems:'center', backgroundColor:'#87CEEB', marginLeft:12, borderRadius:10, marginBottom:10}}>
                      <Text>HAPUS</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.Editdata(data.id,i)}
                    >
                    <View style={{height:40, width: 320, justifyContent:'center', alignItems:'center', backgroundColor:'#87CEEB', marginLeft:12, borderRadius:10, marginBottom:10}}>
                      <Text>EDIT</Text>
                    </View>
                    </TouchableOpacity>
                </Card>
            </Content>
        </View>
      )
    })
  }
}
  render () {
    return (
    <ScrollView>
      <View style ={{flex:1,}}>
        {this.parseData()}
      </View>
    </ScrollView>
    );
  }
}
