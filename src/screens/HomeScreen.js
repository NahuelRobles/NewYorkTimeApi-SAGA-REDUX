import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,SafeAreaView, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { actors} from '../reducers/user';
import Icon from 'react-native-vector-icons/FontAwesome';
import { configureStore } from '@reduxjs/toolkit';
import { set } from 'react-native-reanimated';

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
    flex:1,
    fontSize:18
  },
  iconStyles:{
    fontSize: 35,
    alignSelf:'center',
    marginHorizontal: 15
  },
  textAndHeardContainer: {
    flex:1,
    flexDirection:'row'
  },
  positionHeard: {
    position:'absolute',
    left: '100%'
  },
  emptyContainer: {
    backgroundColor: 'red',
    marginLeft: 20, 
    marginRight:20, 
    marginTop:20 
  },
  emptyText: {
    color:'white', 
    alignSelf:'center'
  }
  

});

    class HomeScreen extends React.Component {

        static whyDidYouRender = true

        constructor(props) {
          super(props);
          this.state = {
            favorites:[],
            search: '',
            FilterList:[],
            refresh: false,
            refreshTag: false,
            FilterTagList:[], 
            Emty: true
            
          };
        }
        updateSearch = search => {
          this.setState({ search });
        };
        onpressenter(value){

          const { Listadelibros } = this.props;
          
          if (this.state.FilterList.length === 0 && this.state.FilterTagList.length === 0) {
              this.state.FilterList=Listadelibros;
          }
          
          const newData = this.state.FilterList.filter(item => {      
            const itemData = `${item.book_details[0].title.toUpperCase()}   
            ${item.book_details[0].description.toUpperCase()} `;
                
            const textData = value.nativeEvent.text.toUpperCase();
                  
            return itemData.indexOf(textData) > -1;   
          });
          if (newData.length === 0 ){
            this.setState({ 
              Emty: !this.state.Emty
             })
          }
          this.state.search= ''
          this.state.FilterList=newData
          this.setState({ 
            refresh: !this.state.refresh
           })

           const backgroundColor = 'rgb(' + (Math.random() * 256) + ',' + (Math.random() * 256) + ',' + (Math.random() * 256) + ')'
           const values = value.nativeEvent.text
           const ExisTag = this.state.FilterTagList.filter( vendor => vendor[0].toUpperCase() === values.toUpperCase() )
           if (ExisTag.length === 0){
             this.state.FilterTagList=[...this.state.FilterTagList, [values, backgroundColor]]
           }
           

        }

        async refis(item,description,index ) {
          const { newValueListFavorites, List } = this.props;
          this.state.favorites=[...List]

          await this.onpressbottom(item,description,index )      
          newValueListFavorites(this.state.favorites);
          console.log( "Favorites:", this.state.favorites)
        }

        onpressbottom(title, description, index){
          this.setState( () => {
            const { favorites } = this.state;
            const val = favorites.filter( vendor => vendor['index'] === index )
                return {
                  favorites: val.length > 0
                    ? favorites.filter(title => title['index'] !== index )
                    : [...favorites, {index,title,description}],
                    
                };
              
          });
          
        }


        onpresstrash() {
          const { Listadelibros } = this.props;
          this.state.search= ''
          this.state.FilterList=Listadelibros;
          this.state.FilterTagList=[]
          this.setState({ 
            refreshTag: !this.state.refreshTag, 
            Emty: true
           })
        }

        componentDidMount(){
          const { fetchBooksintoApi} = this.props;
          fetchBooksintoApi();

        };

        componentDidUpdate() {          

        }

        render(){
          
          const { Listadelibros, List } = this.props;
          return (
            <SafeAreaView>
              <View style={styles.background}>
                  <Icon name="search" size={30} color="white" style={styles.iconStyles} />
                  <TextInput 
                    style={styles.inputStyle} 
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    placeholder="Write Filter"
                    onSubmitEditing={(term) => {this.onpressenter(term)}}
                    
                  />
              </View>
               {this.state.FilterTagList.length>0 ?
                  <View >
                  <FlatList
                  horizontal={true}
                  extraData={this.state.refreshTag}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.FilterTagList}
                  renderItem={({ item, index }) => (
                    <View style={{flexDirection:'row', flex:1, marginLeft: 20}}>
                      <View style={{backgroundColor: item[1], height:30,padding:5}}>
                        <Text style={{color:'white'}}>{item[0]}</Text>
                      </View>
                    </View>

                  )}
                  /> 
                  <TouchableOpacity onPress={() => this.onpresstrash()}>
                       <Icon name="trash" size={15} style={{marginLeft: 20, marginTop:5}}  />
                  </TouchableOpacity>
                   

                  </View>
                : null}
              { this.state.Emty ?
               <FlatList
                    extraData={this.state.refresh}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.FilterList.length>0 ?this.state.FilterList : Listadelibros }
                    renderItem={({ item, index }) => (
                    <View style={styles.container}>
                        <View style={styles.geometryCointaner} >
                            <View style={styles.rectaContainer} />
                            <View style={styles.circleContainer} />
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View style={styles.textAndHeardContainer}>
                            <Text>
                              {item.book_details[0].title}
                            </Text> 
                            <TouchableOpacity style={styles.positionHeard} onPress={() => { this.refis(item.book_details[0].title, item.book_details[0].description,index ) }}>
                               <Icon name="heart" size={15} color={List.filter(tree => tree['index'] === index ).length > 0 ? 'red': 'black'} />
                            </TouchableOpacity>
                          </View>   
                          <View>   
                            <Text numberOfLines={1}>
                              {item.book_details[0].description}
                            </Text> 
                          </View>
                        </View>

                    </View>
                    )}
               /> 
            :
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}> Not Match! </Text>
            </View>
            
            }
            </SafeAreaView>
          )
        }
      }

      const mapStateToProps = ({ User }) => {
        return {
           Listadelibros: User.listBook,
           List: User.ListFavorites
        };
      };

      const mapToDispatch = dispatch => ({
        newValueListFavorites: (List) =>
        dispatch({ ...actors.ListFavorites, List }),
        fetchBooksintoApi: () => dispatch({ ...actors.ListBook })
      });
      
      export default connect(
        mapStateToProps,
        mapToDispatch
      )(HomeScreen);


