import {
  AddPostIcon,
  BookmarkIcon,
  DiscoverIcon,
  HomeIcon,
  PeopleIcon,
} from "../components/shared/Icons";
import type { INavLink } from "../types";

// ============================== ASSETS
// Ścieżki do plików z /public - używane w wielu komponentach
export const ASSETS = {
  logo: "/assets/images/the-circle-logo.png",
  authSideImage: "/assets/images/side-img.png",
  avatarPlaceholder: "/assets/icons/profile-placeholder.svg",
  avatar: (n: number) => `/assets/images/avatars/avatar-${n}.png`,
  icons: {
    logout: "/assets/icons/logout.svg",
    like: "/assets/icons/like.svg",
    liked: "/assets/icons/liked.svg",
  },
};

// ============================== UPLOADS
// Formaty zdjęć akceptowane przy dodawaniu posta i zmianie avatara
export const ACCEPTED_IMAGE_TYPES = {
  "image/*": [".png", ".jpeg", ".jpg", ".webp", ".heic"],
};

// ============================== NAVIGATION
export const sidebarLinks: INavLink[] = [
  { icon: HomeIcon, route: "/", label: "Home" },
  { icon: DiscoverIcon, route: "/explore", label: "Discover" },
  { icon: PeopleIcon, route: "/all-users", label: "People" },
  { icon: BookmarkIcon, route: "/saved", label: "Saved posts" },
];

export const bottombarLinks: INavLink[] = [
  { icon: HomeIcon, route: "/", label: "Home" },
  { icon: DiscoverIcon, route: "/explore", label: "Explore" },
  { icon: BookmarkIcon, route: "/saved", label: "Saved" },
  { icon: AddPostIcon, route: "/create-post", label: "Create" },
];

// ============================== MOCK DATA
// Atrapa prawego sidebaru - do podmiany na dane z Appwrite (ROADMAP: punkt 11)
export const MOCK_FOLLOW_REQUESTS = [
  { id: "1", name: "James Ford", avatar: ASSETS.avatar(6) },
  { id: "2", name: "Charlie Cooper", avatar: ASSETS.avatar(8) },
];

export const MOCK_SUGGESTIONS = [
  { id: "1", name: "Judy Blair", bio: "I  read people like books. Here to make friends, play smart, and keep...", avatar: ASSETS.avatar(4) },
  { id: "2", name: "Spencer Jones", bio: "Gym, protein shakes, and good vibes only 💪", avatar: ASSETS.avatar(7) },
  { id: "3", name: "Ino Tanaka", bio: "Tea steep level: expert 🍵", avatar: ASSETS.avatar(3) },
  { id: "4", name: "Sofia Márquez", bio: "NY Girl 🍎 Dogs rescuer.", avatar: ASSETS.avatar(5) },
  { id: "5", name: "Jasmine Williams", bio: "CEO of overthinking 🧠", avatar: ASSETS.avatar(2) },
  { id: "6", name: "Sophia Nicks", bio: "Mom of two, here to show the kids how it's done", avatar: ASSETS.avatar(1) },
];
