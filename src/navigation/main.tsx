import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AddPost, Home, Post} from '../screens';

const MainStack = createStackNavigator();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Post" component={Post} />
    <MainStack.Screen
      name="AddPost"
      component={AddPost}
      options={{headerTitle: 'Add new post'}}
    />
  </MainStack.Navigator>
);
