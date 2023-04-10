import React, {Suspense} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import PostList from './PostList';

export default function Home() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <PostList />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});
