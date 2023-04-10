import { useQuery } from 'react-query';
import { useFakeApi } from '../context';

const usePosts = () => {
    const { getPosts } = useFakeApi();
    return useQuery(["posts"], async () => await getPosts(), { suspense: true })
};

// When using suspense mode, status states and error objects are not needed 
// and are then replaced by usage of the React.Suspense

export default usePosts;
