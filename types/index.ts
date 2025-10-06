// Centralized types for BookSphere app
import { DocumentData } from 'firebase/firestore';

// Base user data interface
export interface UserData {
  displayName: string;
  photoURL: string;
  bio?: string;
  joinedAt: Date;
}

// Book-related interfaces
export interface BookData {
  title: string;
  author: string;
  coverUrl: string;
  description?: string;
  isbn?: string;
  publishedDate?: Date;
  genre?: string[];
}

export interface Book extends BookData {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Video-related interfaces
export interface VideoData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  bookId: string;
  userId: string;
  likes: number;
  comments: number;
  createdAt: Date;
  duration?: number;
  views?: number;
  likedBy?: string[];
}

export interface Video extends VideoData {
  id: string;
  user?: UserData;
  book?: BookData;
}

// Club-related interfaces
export interface ClubData {
  name: string;
  description: string;
  bookId: string;
  createdBy: string;
  memberCount: number;
  createdAt: Date;
  nextMeeting?: {
    date: Date;
    location: string;
    topic: string;
  };
  members?: string[];
  imageUrl?: string;
}

export interface Club extends ClubData {
  id: string;
  creator?: UserData;
  book?: BookData;
}

// Comment-related interfaces
export interface CommentData {
  text: string;
  userId: string;
  createdAt: Date;
  likes?: number;
  likedBy?: string[];
}

export interface Comment extends CommentData {
  id: string;
  userDisplayName: string;
  userPhotoURL?: string;
}

// Notification-related interfaces
export interface NotificationData {
  type: 'like' | 'comment' | 'club_invite' | 'club_update' | 'new_video';
  title: string;
  message: string;
  userId: string;
  targetId?: string;
  targetType?: 'video' | 'club' | 'comment';
  fromUserId?: string;
  fromUserDisplayName?: string;
  fromUserPhotoURL?: string;
  read: boolean;
  createdAt: Date;
}

export interface Notification extends NotificationData {
  id: string;
}

// Report-related interfaces
export interface ReportData {
  contentType: 'video' | 'club' | 'comment' | 'user';
  contentId: string;
  contentTitle: string;
  reason: string;
  description?: string;
  reportedBy: string;
  reportedByDisplayName: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  action?: string;
}

export interface Report extends ReportData {
  id: string;
}

// Search-related interfaces
export interface SearchResult {
  type: 'video' | 'club' | 'book';
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  metadata?: Record<string, any>;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form interfaces
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm extends LoginForm {
  confirmPassword: string;
}

export interface CreateVideoForm {
  title: string;
  description: string;
  bookId: string;
  videoUri: string;
}

export interface CreateClubForm {
  name: string;
  description: string;
  bookTitle: string;
  bookAuthor: string;
  bookCoverUrl?: string;
}

// Error interfaces
export interface AppError {
  code: string;
  message: string;
  details?: string;
  timestamp: Date;
  userId?: string;
  context?: Record<string, unknown>;
}

// Navigation interfaces
export interface NavigationParams {
  id?: string;
  bookId?: string;
  videoId?: string;
  clubId?: string;
}

// Component prop interfaces
export interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface VideoRecorderProps {
  onVideoRecorded: (uri: string) => void;
}

export interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  contentType: 'video' | 'club' | 'comment' | 'user';
  contentId: string;
  contentTitle: string;
}

// Firebase-specific types
export interface FirestoreDocument extends DocumentData {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Theme interfaces
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  white: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeTypography {
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  weights: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: {
    small: object;
    medium: object;
    large: object;
  };
} 