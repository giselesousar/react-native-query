import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import usePost from '../../hooks/post.hooks';

type Params = {
  post: {
    id: number;
  };
};

export default function Post() {
  const route = useRoute<RouteProp<Params, 'post'>>();

  const {id} = route.params;

  const {data} = usePost(id);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{data?.title}</Text>
      <View style={styles.post}>
        <Text>{data?.body}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'blue',
    paddingVertical: 10,
  },
  post: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
