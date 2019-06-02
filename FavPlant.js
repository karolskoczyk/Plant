import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
    Button
} from 'react-native';
import styles from "./styles";
import * as firebase from 'firebase';
import {Container, Content, ListItem} from 'native-base';
import { ImagePicker } from 'expo';


var snapshot = []
var currentUser;


class FavPlant extends React.Component {

  state = {
    image: null,
  };

    constructor(props){
        super(props)
     
         this.ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !==r2})
 
         this.state = {
             listViewData : snapshot
         }
     }

     componentDidMount(){
       
      const { navigation } = this.props;
      const keyPlant = navigation.getParam('keyPlant');

      firebase.auth().onAuthStateChanged((user) => {
      
        if (user != null) {
          var that = this

          firebase.database().ref(user.uid).child('plantList').child(keyPlant).on('value', function(snapshot){

            console.log(snapshot.val().namePlant);
      
            var newData = [...that.state.listViewData]
            newData.push(snapshot)
  
            that.setState({ listViewData: newData})

        });
      }
    })
     }


render(){
  let { image } = this.state;
  
     return(
      <ScrollView style={styles.containerxd}>
        <TouchableOpacity style={styles.textStyle}>
          <Image
            source={require('./images/burger.png')}
            style={styles.ImageIconStyle} />
        </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

     <View style={styles.white}>
     <Container>
                <Content>
                    <ListView
                        enableEmptySections
                        dataSource = {this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={snapshot =>
        <View>
      
          <View style={styles.tabHeader}><Text style={styles.textHeader}>Scientific name</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().namePlant}</Text></View>
          
          <View style={styles.tabHeader}><Text style={styles.textHeader}>Common name</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().nameC}</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Moisture use</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().moisture}</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Drought tolerance</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().drought}</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Flower color</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().fcolor}</Text></View>
          
          <View style={styles.tabHeader}><Text style={styles.textHeader}>Life span</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().lifespan}</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Bloom period</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().bloom}</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Growth period</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().gperiod}</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Mature height</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().mheight} cm</Text></View>

          <View style={styles.tabHeader}><Text style={styles.textHeader}>Toxicity</Text></View>
          <View style={styles.tabContent}><Text style={styles.textContent}>{snapshot.val().toxicity}</Text></View>
           </View>   
                </Content>
            </Container>

          <View style={styles.space}/>

      </View>
    </ScrollView>
     );}
     }

     _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
     
export default FavPlant;



