export interface VideoPost {
  id: string;
  userId: string;
  videoUrl: string;
  title: string;
  description: string;
  userPhotoURL?: string;
  userDisplayName: string;
  likeCount: number;
  commentCount: number;
  likedBy?: string[];
}

// Default export to satisfy Expo Router requirements
export default function Types() {
  return null;
} 