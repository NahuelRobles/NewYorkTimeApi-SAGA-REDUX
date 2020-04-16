import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Math} from 'react-native';
import { connect } from 'react-redux';
import { actors, ListFavorites} from '../reducers/user';
import Icon from 'react-native-vector-icons/FontAwesome';
import { configureStore } from '@reduxjs/toolkit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight:50
  },
  geometryCointaner: {
    width: '5%',
    height: 50, 
  },
  rectaContainer: {
    width: '30%', 
    height: 50, 
    backgroundColor: 'gray',
    position: 'absolute', 
    left: '20%'
  },
  circleContainer: {
    width: '70%', 
    height: 14, 
    backgroundColor: 'yellow', 
    position: 'absolute', 
    top: 20, 
    borderRadius: 50
  },
  descriptionContainer: {
    width:'70%' , 
    height: 50, 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  background:{
    marginBottom: 10,
    marginTop:10,
    backgroundColor: '#f0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row'
},
  inputStyle: {
    marginLeft: 10,
    alignSelf: 'center',
    fontSize:18
},
  textAndHeardContainer: {
    flex:1,
    flexDirection:'row'
  },
  positionHeard: {
    position:'absolute',
    left: '100%'
  }
  

});

    class FavoritesScreen extends React.Component {

        static whyDidYouRender = true

        constructor(props) {
          super(props);
          this.state = {
            localFavorites:[],
            refresh: true,
          };
        }
        onpresstrash(item) {
          const { favoriteList } = this.props;
          const index = favoriteList.indexOf(item);
          if (index > -1) {
             const DeleteItem = favoriteList.filter(items => items !== item )
             const { newValueListFavorites  } = this.props;
             newValueListFavorites(DeleteItem);   
         }
        }

        componentDidMount(){
          

        };
        

        componentDidUpdate() {

        }
        render(){
          const { favoriteList } = this.props;
          return (
            <SafeAreaView>
            { favoriteList.length > 0 ?
            <>
              <View style={styles.background}>
                 <Text style={styles.inputStyle}>
                     Favorites
                 </Text>
               </View>
               <FlatList
                    extraData={this.state.refreshTag}
                    keyExtractor={(item, index) => index.toString()}
                    data={favoriteList}
                    renderItem={({ item, index }) => (
                    <View style={styles.container}>
                        <View style={styles.geometryCointaner} >
                            <View style={styles.rectaContainer} />
                            <View style={styles.circleContainer} />
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View style={styles.textAndHeardContainer}>
                            <Text>
                              {item.title}
                            </Text> 
                            <TouchableOpacity style={styles.positionHeard} onPress={() => this.onpresstrash(item)}>
                               <Icon name="trash" size={15}  />
                            </TouchableOpacity>
                            </View>   
                          <View>   
                            <Text numberOfLines={1}>
                              {item.description}
                            </Text> 
                          </View>
                        </View>

                    </View>
                    )}
               /> 
               </>
            :<View style={styles.background}>
                 <Text style={styles.inputStyle}>
                    Empty List!

                 </Text>
            </View>}
  
            </SafeAreaView>
          )
        }
      }
      const mapToDispatch = dispatch => ({
        newValueListFavorites: (List) =>
        dispatch({ ...actors.ListFavorites, List}),

      });
      const mapStateToProps = ({ User }) => {
        return {
           
           favoriteList: User.ListFavorites
        };
      };
      
      export default connect(
        mapStateToProps,
        mapToDispatch,
      )(FavoritesScreen);


