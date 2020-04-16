import React from 'react';
import {View} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppContainer = createSwitchNavigator({
  

  mainFlow: createBottomTabNavigator ({
    Home: {  
      screen: HomeScreen,  
      navigationOptions:{  
          tabBarLabel:'List',  
          tabBarIcon: ({focused}) => (  
            focused ? 
              <View>  
                  <Icon name="list" size={30} color="rgb(221,156,64)" />
              </View> :               <View>  
                  <Icon name="list" size={30} color="black" />
              </View> ),  
      },
    },
    Favorites: {  
      screen: FavoritesScreen,  
      navigationOptions:{ 
          tabBarLabel:'Favorite',  
          tabBarIcon: ({focused}) => (  
            focused ? 
              <View>  
                  <Icon name="heart" size={30} color="red" />
              </View> :               <View>  
                  <Icon name="heart" size={30} color="black" />
              </View> ),  
      },
    },


    })
  });

const AppContainerCreator = createAppContainer(AppContainer);

export default () => {
  return (
    <AppContainerCreator/>
  );
};
