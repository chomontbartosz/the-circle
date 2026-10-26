import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Models } from 'appwrite';

import Loader from '../../components/shared/Loader';
import PostCard from '../../components/shared/PostCard';
import { useGetRecentPosts } from '../../lib/react-query/queriesAndMutations';


const Home = () => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetRecentPosts();

  // gdy loader na dole listy pojawi się w widoku, dociągamy kolejną stronę
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full">Recent Posts</h2>
          { isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.pages.flatMap((page) => page.documents).map((post: Models.DefaultDocument) => (
                  <PostCard post={post} key={post.$id} />
                ))}
              </ul>
            )
          }

          {hasNextPage && (
            <div ref={ref} className="py-4">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
