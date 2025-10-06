// non functioning notifications feature for now, must have backend support....

import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import { Text } from '../components/Themed';
import UserAvatar from '../components/UserAvatar';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationsScreen() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationPress = (notification: any) => {
    // Mark as read
    markAsRead(notification.id);

    // Navigate based on notification type
    switch (notification.targetType) {
      case 'video':
        router.push({
          pathname: '/(tabs)/videos',
          params: { id: notification.targetId }
        });
        break;
      case 'club':
        router.push(`/clubs/${notification.targetId}`);
        break;
      case 'comment':
        router.push({
          pathname: '/discover/comments',
          params: { videoId: notification.targetId }
        });
        break;
      default:
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'comment';
      case 'club_invite':
        return 'user-plus';
      case 'club_update':
        return 'book';
      case 'new_video':
        return 'video-camera';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like':
        return '#ff4444';
      case 'comment':
        return '#0a7ea4';
      case 'club_invite':
        return '#28a745';
      case 'club_update':
        return '#ffc107';
      case 'new_video':
        return '#6f42c1';
      default:
        return '#666';
    }
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIcon}>
        <FontAwesome
          name={getNotificationIcon(item.type)}
          size={20}
          color={getNotificationColor(item.type)}
        />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          {item.fromUserDisplayName && (
            <UserAvatar
              photoUrl={item.fromUserPhotoURL}
              displayName={item.fromUserDisplayName}
              size={24}
            />
          )}
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </View>
        </View>
        
        <Text style={styles.notificationTime}>
          {new Date(item.createdAt?.toDate()).toLocaleDateString()} at{' '}
          {new Date(item.createdAt?.toDate()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  if (notifications.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
        </View>
        <EmptyState
          icon="bell"
          title="No notifications"
          message="You're all caught up!"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead} style={styles.markAllReadButton}>
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  markAllReadButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllReadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 4,
  },
  notificationIcon: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  notificationItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  notificationMessage: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  notificationText: {
    flex: 1,
    marginLeft: 8,
  },
  notificationTime: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsList: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  unreadDot: {
    backgroundColor: '#0a7ea4',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  unreadNotification: {
    backgroundColor: '#f8f9ff',
  },
}); 