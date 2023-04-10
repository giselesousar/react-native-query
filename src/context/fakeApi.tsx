import React, {FC, ReactNode, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type ContextProps = {
  getPosts: () => Promise<Post[]>;
  getPost: (postId: number) => Promise<Post | undefined>;
  addPost: (post: Post) => void;
  deletePost: (postId: number) => void;
};

type Post = {
  id?: number;
  title: string;
  body: string;
};

const DURATION = 1000;

const FakeApiContext = createContext({} as ContextProps);

const useFakeApi: () => ContextProps = () => useContext(FakeApiContext);

const FakeApiProvider: FC<{children: ReactNode}> = ({children}) => {
  function wait(duration: number) {
    return new Promise((resolve: any) => setTimeout(resolve, duration));
  }

  const getPosts: () => Promise<Post[]> = async () => {
    return wait(DURATION).then(async () => {
      const jsonValue = await AsyncStorage.getItem('@posts');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    });
  };

  const getPost: (postId: number) => Promise<Post | undefined> = async (
    postId: number,
  ) => {
    return wait(DURATION).then(async () => {
      const jsonValue = await AsyncStorage.getItem('@posts');
      const posts = jsonValue != null ? JSON.parse(jsonValue) : null;
      return posts.find((post: any) => post.id === postId);
    });
  };

  const addPost: (post: Post) => void = async (post: Post) => {
    return wait(DURATION).then(async () => {
      const posts = (await getPosts()) || [];
      const id = (posts.slice(-1)[0].id || 0) + 1;
      await AsyncStorage.setItem(
        '@posts',
        JSON.stringify([...posts, {...post, id}]),
      );
    });
  };

  const deletePost: (postId: number) => void = async (postId: number) => {
    return wait(DURATION).then(async () => {
      const posts = await getPosts();
      await AsyncStorage.setItem(
        '@posts',
        JSON.stringify(posts.filter(post => post.id !== postId)),
      );
    });
  };

  return (
    <FakeApiContext.Provider value={{getPosts, getPost, addPost, deletePost}}>
      {children}
    </FakeApiContext.Provider>
  );
};

export {FakeApiProvider, useFakeApi};
