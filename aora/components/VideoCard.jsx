import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({ video: { title, thumbnail, video, user: { username, avatar } } }) => {
  const [play, setPlay] = useState(false);

  if (!video || !video.user) {
    return (
      <View style={styles.missingDataContainer}>
        <Text style={styles.missingDataText}>Video data is missing or incomplete.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <Image
            source={icons.menu}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          style={styles.video}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.thumbnailContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6c757d', // Adjust to match "secondary" color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  username: {
    fontSize: 12,
    color: '#b3b3b3',
    fontWeight: '400',
  },
  menuContainer: {
    paddingTop: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  thumbnailContainer: {
    width: '100%',
    height: 240, // Adjust height to match "h-60" (60 * 4px)
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  video: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginTop: 12,
  },
  missingDataContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingDataText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VideoCard;
