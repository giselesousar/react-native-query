import { useQuery } from 'react-query';
import { useFakeApi } from '../context';

const usePost = (postId: number) => {
    const { getPost } = useFakeApi();
    return useQuery(["posts", postId], () => getPost(postId))
};

export default usePost;