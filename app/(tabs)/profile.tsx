import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    trips: 12,
    countries: 8,
    joined: 'March 2024'
  };
  
  // Settings options
  const settingsOptions = [
    { id: 'account', name: 'Account Settings', icon: 'person-circle' },
    { id: 'notifications', name: 'Notifications', icon: 'notifications' },
    { id: 'appearance', name: 'Appearance', icon: 'color-palette' },
    { id: 'privacy', name: 'Privacy & Security', icon: 'shield-checkmark' },
    { id: 'help', name: 'Help & Support', icon: 'help-circle' },
    { id: 'about', name: 'About PackWise', icon: 'information-circle' },
  ];
  
  // Achievement cards
  const achievements = [
    { id: '1', title: 'Globetrotter', description: 'Visited 5+ countries', icon: 'globe', completed: true },
    { id: '2', title: 'Beach Lover', description: 'Completed 3 beach trips', icon: 'umbrella-beach', completed: true },
    { id: '3', title: 'Mountain Explorer', description: 'Completed 2 mountain trips', icon: 'mountain', completed: false },
    { id: '4', title: 'City Slicker', description: 'Visited 10+ cities', icon: 'city', completed: false },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userJoined}>Member since {user.joined}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.trips}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.countries}</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>
      </View>
      
      {/* Settings Options */}
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.settingsOption}>
            <View style={styles.optionIconContainer}>
              <Ionicons name={option.icon} size={22} color="#0099cc" />
            </View>
            <Text style={styles.optionText}>{option.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsList}>
          {achievements.map(achievement => (
            <TouchableOpacity key={achievement.id} style={styles.achievementCard}>
              <View 
                style={[
                  styles.achievementIcon, 
                  achievement.completed ? styles.achievementCompleted : styles.achievementIncomplete
                ]}
              >
                <FontAwesome5 
                  name={achievement.icon} 
                  size={22} 
                  color={achievement.completed ? '#fff' : '#999'} 
                />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
              {achievement.completed && (
                <View style={styles.completedBadge}>
                  <FontAwesome5 name="check" size={12} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      {/* App Version */}
      <Text style={styles.versionText}>PackWise v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileHeader: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  userJoined: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0099cc',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  settingsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  achievementsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  achievementsList: {},
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementCompleted: {
    backgroundColor: '#0099cc',
  },
  achievementIncomplete: {
    backgroundColor: '#f0f0f0',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ff3b30',
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#ff3b30',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#999',
  },
});