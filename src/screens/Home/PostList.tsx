import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';

import usePosts from '../../hooks/posts.hooks';
import {useFakeApi} from '../../context';

const renderItem =
  (navigation: any, deleteItem: (postId: number) => void) =>
  ({item}: any) =>
    (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Post' as never, {id: item.id} as never)
        }
        style={styles.post}>
        <View style={styles.item}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Text style={styles.deleteIcon}>x</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );

export default function PostList() {
  const {data} = usePosts();

  const {deletePost} = useFakeApi();

  const {mutate} = useMutation(async (postId: number) => deletePost(postId));

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const deleteItem = (postId: number) => {
    mutate(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
      },
    });
  };

  return (
    <FlatList
      data={data || []}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem(navigation, deleteItem)}
      ListHeaderComponent={() => (
        <View style={styles.row}>
          <Text style={styles.header}>all posts</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('AddPost' as never)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
    paddingVertical: 10,
  },
  post: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postTitle: {color: 'white', textTransform: 'capitalize'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'blue',
    fontSize: 30,
  },
  deleteIcon: {
    color: '#fff',
    fontSize: 16,
  },
});
