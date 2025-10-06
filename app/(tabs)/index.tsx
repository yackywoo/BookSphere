// just for testing intitial features


import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/Themed';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  userDisplayName: string;
  userPhotoURL?: string;
  likes: number;
  comments: number;
}

interface FeaturedClub {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  currentBook: string;
}

export default function HomeScreen() {
  const [featuredVideos, setFeaturedVideos] = useState<FeaturedVideo[]>([]);
  const [featuredClubs, setFeaturedClubs] = useState<FeaturedClub[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      setLoading(true);

      if (!db) {
        console.log('⚠️ Firestore not available, skipping data load');
        setLoading(false);
        return;
      }

      // Load featured videos
      const videosQuery = query(
        collection(db, 'videos'),
        orderBy('likes', 'desc'),
        limit(5)
      );
      const videosSnapshot = await getDocs(videosQuery);
      const videos = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FeaturedVideo[];
      setFeaturedVideos(videos);

      // Load featured clubs
      const clubsQuery = query(
        collection(db, 'clubs'),
        orderBy('memberCount', 'desc'),
        limit(5)
      );
      const clubsSnapshot = await getDocs(clubsQuery);
      const clubs = clubsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FeaturedClub[];
      setFeaturedClubs(clubs);

    } catch (err) {
      console.error('Error loading featured content:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderVideoItem = ({ item }: { item: FeaturedVideo }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => {
        router.push({
          pathname: '/(tabs)/videos',
          params: { id: item.id }
        });
      }}
    >
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.videoThumbnail}
        resizeMode="cover"
      />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoAuthor}>{item.userDisplayName}</Text>
        <View style={styles.videoStats}>
          <View style={styles.stat}>
            <FontAwesome name="heart" size={14} color="#666" />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.stat}>
            <FontAwesome name="comment" size={14} color="#666" />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderClubItem = ({ item }: { item: FeaturedClub }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => router.push(`/clubs/${item.id}`)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.clubImage}
        resizeMode="cover"
      />
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubBook}>{item.currentBook}</Text>
        <View style={styles.clubStats}>
          <View style={styles.stat}>
            <FontAwesome name="users" size={14} color="#666" />
            <Text style={styles.statText}>{item.memberCount} members</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {user ? `Welcome back, ${user.displayName || 'Reader'}!` : 'Welcome to BookSphere!'}
        </Text>
        <Text style={styles.subtitle}>Discover amazing book content</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Videos</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/videos')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Clubs</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/clubs')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredClubs}
          renderItem={renderClubItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/create/video')}
        >
          <FontAwesome name="video-camera" size={24} color="#fff" />
          <Text style={styles.actionText}>Create Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/create/club')}
        >
          <FontAwesome name="book" size={24} color="#fff" />
          <Text style={styles.actionText}>Create Club</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 16,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clubBook: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  clubCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clubImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 150,
    width: 150,
  },
  clubInfo: {
    padding: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  clubStats: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '500',
  },
  stat: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  statText: {
    color: '#666',
    fontSize: 14,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
  },
  videoAuthor: {
    color: '#666',
    fontSize: 14,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoInfo: {
    padding: 16,
  },
  videoStats: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  videoThumbnail: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 150,
    width: 150,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
