import type { Models } from "appwrite";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { useUserContext } from "../../context/AuthContext";
import {
  useFollowUser,
  useGetFollowing,
  useUnfollowUser,
} from "../../lib/react-query/queriesAndMutations";

type FollowButtonProps = {
  targetUserId: string;
  size?: "default" | "sm";
  className?: string;
};

const FollowButton = ({ targetUserId, size = "default", className = "" }: FollowButtonProps) => {
  const { user } = useUserContext();

  // jedna (cache'owana) lista "kogo obserwuję" obsługuje wszystkie przyciski na stronie
  const { data: following, isPending: isLoadingFollowing } = useGetFollowing(user.id);
  const { mutate: followUser, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser();

  if (!user.id || user.id === targetUserId) return null;

  const followRecord = following?.documents.find(
    (record: Models.DefaultDocument) => record.following?.$id === targetUserId
  );
  const isBusy = isLoadingFollowing || isFollowing || isUnfollowing;

  const handleClick = (e: React.MouseEvent) => {
    // przycisk bywa wewnątrz <Link> (UserCard) - nie przechodzimy wtedy na profil
    e.preventDefault();
    e.stopPropagation();

    // funkcje API zwracają undefined przy błędzie (np. brak uprawnień lub zły ID tabeli)
    const onSettled = (result: unknown) => {
      if (!result) toast("Something went wrong. Please try again.");
    };

    if (followRecord) {
      unfollowUser(followRecord.$id, { onSettled });
    } else {
      followUser({ followerId: user.id, followingId: targetUserId }, { onSettled });
    }
  };

  return (
    <Button
      type="button"
      size={size}
      disabled={isBusy}
      onClick={handleClick}
      className={`${followRecord ? "shad-button_dark_4" : "shad-button_primary"} ${className}`}>
      {followRecord ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
