import type { Models } from "appwrite";

import { GridPostList, Loader } from "../../components/shared";
import { useGetCurrentUser } from "../../lib/react-query/queriesAndMutations";

import { BookmarkIcon } from "../../components/shared/Icons";
const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.DefaultDocument) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="common-container">
      <div className="flex gap-2 w-full max-w-content">
        <BookmarkIcon width={36} height={36} />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-content gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;