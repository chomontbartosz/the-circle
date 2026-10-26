import type { Models } from "appwrite";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "../../lib/utils";
import { ASSETS } from "../../constants";
import {
useLikePost,
useSavePost,
useDeleteSavedPost,
useGetCurrentUser,
} from "../../lib/react-query/queriesAndMutations";

import { BookmarkFilledIcon, BookmarkIcon } from "./Icons";
type PostStatsProps = {
post: Models.DefaultDocument;
userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
const location = useLocation();
const likesList: string[] = (post.likes ?? []).map((user: Models.DefaultDocument) => user.$id);

const [likes, setLikes] = useState<string[]>(likesList);
// null = brak lokalnej zmiany, pokazujemy stan z serwera
const [savedOverride, setSavedOverride] = useState<boolean | null>(null);

const { mutate: likePost } = useLikePost();
const { mutate: savePost } = useSavePost();
const { mutate: deleteSavePost } = useDeleteSavedPost();

const { data: currentUser } = useGetCurrentUser();

const savedPostRecord = currentUser?.save?.find(
  (record: Models.DefaultDocument) => record.post?.$id === post.$id
);

const isSaved = savedOverride ?? !!savedPostRecord;

const handleLikePost = (
  e: React.MouseEvent
) => {
  e.stopPropagation();

  let likesArray = [...likes];

  if (likesArray.includes(userId)) {
    likesArray = likesArray.filter((Id) => Id !== userId);
  } else {
    likesArray.push(userId);
  }

  setLikes(likesArray);
  likePost({ postId: post.$id, likesArray });
};

const handleSavePost = (
  e: React.MouseEvent
) => {
  e.stopPropagation();

  if (savedPostRecord) {
    setSavedOverride(false);
    return deleteSavePost(savedPostRecord.$id);
  }

  savePost({ userId: userId, postId: post.$id });
  setSavedOverride(true);
};

const containerStyles = location.pathname.startsWith("/profile")
  ? "w-full"
  : "";

return (
  <div
    className={`flex justify-between items-center z-20 ${containerStyles}`}>
    <div className="flex gap-2 mr-5">
      <img
        src={`${
          checkIsLiked(likes, userId)
            ? ASSETS.icons.liked
            : ASSETS.icons.like
        }`}
        alt="like"
        width={20}
        height={20}
        onClick={(e) => handleLikePost(e)}
        className="cursor-pointer"
      />
      <p className="small-medium lg:base-medium">{likes.length}</p>
    </div>

    <div className="flex gap-2">
        <button
          type="button"
          className="cursor-pointer flex items-center justify-center p-1"
          onClick={(e) => handleSavePost(e)}
          aria-label={isSaved ? "Remove from saved" : "Save post"}
          >
          {isSaved ? (
            <BookmarkFilledIcon className="text-primary-500" />
          ) : (
            <BookmarkIcon className="text-primary-500" />
          )}
      </button>
    </div>
  </div>
);
};

export default PostStats;