import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

 export default class EditList extends React.Component {
   static navigationOptions = ({navigation}) => ({
     title: navigation.state.params.name,
 });
 constructor (props) {
    console.log(props)
   super ()
    this.state = {
      id    : props.navigation.state.params.data.id,
      title : props.navigation.state.params.data.title,
      subtitle : props.navigation.state.params.data.subtitle,
      coment : props.navigation.state.params.data.coment,
      semuaData : []
  }
}

  componentDidMount(){
    AsyncStorage.getItem('notifications_push').then((value) => {
          const data = JSON.parse(value);
          this.setState({
            semuaData : data
          })


          // d.push({...data,id:JSON.parse(value).length + 1})
          // AsyncStorage.setItem('notifications_push',JSON.stringify(d)).then(() => {
          //    navigate('List', { name: 'LIST' })
          // })
    })
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

  Updatedata (id) {
    const { navigate } = this.props.navigation;
    const arrayData = [];
    const objectEdit = {
    id    : id,
    title : this.state.title,
    subtitle : this.state.subtitle,
    coment : this.state.coment
    }

    const data = this.state.semuaData
    const index = this.props.navigation.state.params.index
    data[index] = objectEdit
    AsyncStorage.setItem('notifications_push',JSON.stringify(data)).then(() => {
       navigate('List', { name: 'LIST' })
    })
    // arrayData.push(data);

}

   render () {
     return (
       <View style={{flex:1}}>
       <View>
         <TextInput
           style ={{height:40, width:340, marginTop: 10, marginLeft:10}}
           value={this.state.title}
           placeholder ="title"
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
             onPress={() => this.Updatedata(this.state.id)}
          >
           <View style={{height:40, width: 340, justifyContent:'center', alignItems:'center', backgroundColor:'#87CEEB', marginLeft:10, borderRadius:10}}>
             <Text>Submit</Text>
           </View>
         </TouchableOpacity >
       </View>
       </View>
     );
   }
 }
