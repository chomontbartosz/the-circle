import { useParams } from "react-router-dom";

import { Loader } from "../../components/shared";
import PostForm from "../../components/forms/PostForm";
import { EditIcon } from "../../components/shared/Icons";
import { useGetPostById } from "../../lib/react-query/queriesAndMutations";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-content">
          <EditIcon width={36} height={36} className="text-light-1" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;