import { useParams, Link, useNavigate } from "react-router-dom";
import type { Models } from "appwrite";

import { Button } from "../../components/ui";
import { GridPostList, Loader, PostStats } from "../../components/shared";

import { useGetPostById, useGetUserPosts, useDeletePost } from "../../lib/react-query/queriesAndMutations";
import { formatDateString, multiFormatDateString } from "../../lib/utils";
import { useUserContext } from "../../context/AuthContext";

import { ASSETS } from "../../constants";
import { EditIcon } from "../../components/shared/Icons";
// "Liked by Anna and 4 others" + nakładające się avatary pierwszych osób
const LikedBy = ({ likes }: { likes: Models.DefaultDocument[] }) => {
  if (likes.length === 0) {
    return <p className="small-regular text-gray-400">Be the first to like this post.</p>;
  }

  const [first, ...others] = likes;

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {likes.slice(0, 3).map((liker) => (
          <img
            key={liker.$id}
            src={liker.imageUrl || ASSETS.avatarPlaceholder}
            alt={liker.name}
            className="w-6 h-6 rounded-full object-cover border-2 border-dark-2"
          />
        ))}
      </div>
      <p className="small-regular text-light-2">
        Liked by <span className="font-semibold text-light-1">{first.name}</span>
        {others.length > 0 && (
          <>
            {" "}and <span className="font-semibold text-light-1">{others.length} {others.length === 1 ? "other" : "others"}</span>
          </>
        )}
      </p>
    </div>
  );
};

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator?.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const isOwner = !!post && user.id === post.creator?.$id;

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;

    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="common-container">
      <div className="hidden md:flex max-w-content w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading ? (
        <Loader />
      ) : !post ? (
        <p className="text-gray-400">Post not found.</p>
      ) : (
        <article className="post_details-card">
          {/* Autor + akcje właściciela */}
          <div className="post_details-header">
            <Link
              to={`/profile/${post.creator?.$id}`}
              className="flex items-center gap-3 min-w-0">
              <img
                src={post.creator?.imageUrl || ASSETS.avatarPlaceholder}
                alt="creator"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <p className="base-medium lg:body-bold text-light-1 truncate">
                  {post.creator?.name}
                </p>
                <p className="small-regular text-light-3 truncate">
                  @{post.creator?.username}
                  {post.location && <> • {post.location}</>}
                </p>
              </div>
            </Link>

            {isOwner && (
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  to={`/update-post/${post.$id}`}
                  aria-label="Edit post"
                  className="p-2 rounded-lg transition hover:bg-dark-4">
                  <EditIcon className="text-primary-500" />
                </Link>
                <button
                  type="button"
                  onClick={handleDeletePost}
                  aria-label="Delete post"
                  className="p-2 rounded-lg transition hover:bg-dark-4">
                  <img src={"/assets/icons/delete.svg"} alt="" width={22} height={22} />
                </button>
              </div>
            )}
          </div>

          {/* Pełne zdjęcie - bez kadrowania jak na Home */}
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="post_details-img"
          />

          <div className="post_details-info">
            <PostStats post={post} userId={user.id} />

            <LikedBy likes={post.likes ?? []} />

            <div className="flex flex-col gap-2">
              <p className="small-medium lg:base-regular text-light-1 whitespace-pre-line">
                <span className="font-semibold mr-2">{post.creator?.username}</span>
                {post.caption}
              </p>

              {post.tags?.length > 0 && (
                <ul className="flex flex-wrap gap-x-2 gap-y-1">
                  {post.tags.map((tag: string) => (
                    <li key={tag}>
                      <Link
                        to={`/explore?search=${encodeURIComponent(tag)}`}
                        className="small-regular text-gray-400 transition hover:text-primary-500">
                        #{tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p
              className="subtle-semibold text-light-1 uppercase tracking-wide"
              title={formatDateString(post.$createdAt)}>
              {multiFormatDateString(post.$createdAt)}
            </p>
          </div>
        </article>
      )}

      {post && (
        <section className="w-full max-w-content flex flex-col gap-6">
          <hr className="border-dark-4" />

          <h3 className="body-bold md:h3-bold">
            More from {post.creator?.name}
          </h3>

          {isUserPostLoading ? (
            <Loader />
          ) : relatedPosts && relatedPosts.length > 0 ? (
            <GridPostList posts={relatedPosts} showUser={false} />
          ) : (
            <p className="small-regular text-light-1">No other posts yet.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default PostDetails;
