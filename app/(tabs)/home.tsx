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
import { router } from 'expo-router';

export default function HomeScreen() {
  // Featured trips data (mock data)
  const featuredTrips = [
    {
      id: '1',
      destination: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1573790387438-4da905039392',
      days: 7,
      type: 'Beach'
    },
    {
      id: '2',
      destination: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      days: 5,
      type: 'City'
    },
    {
      id: '3',
      destination: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6',
      days: 6,
      type: 'Mountain'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hello, Traveler</Text>
          <Text style={styles.headerTitle}>Where to next?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={40} color="#0099cc" />
        </TouchableOpacity>
      </View>

      {/* New Trip Button */}
      <TouchableOpacity 
        style={styles.newTripButton}
        onPress={() => router.push('/new-trip')}
      >
        <View style={styles.newTripContent}>
          <View>
            <Text style={styles.newTripTitle}>Plan a New Trip</Text>
            <Text style={styles.newTripSubtitle}>Get AI-powered packing recommendations</Text>
          </View>
          <View style={styles.newTripIcon}>
            <FontAwesome5 name="luggage-cart" size={24} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Featured Trips */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Destinations</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredTripsContainer}
        >
          {featuredTrips.map(trip => (
            <TouchableOpacity key={trip.id} style={styles.featuredTripCard}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: trip.image }} 
                  style={styles.tripImage}
                  resizeMode="cover"
                />
                <View style={styles.tripTypeTag}>
                  <Text style={styles.tripTypeText}>{trip.type}</Text>
                </View>
              </View>
              <View style={styles.tripInfo}>
                <Text style={styles.destinationText}>{trip.destination}</Text>
                <Text style={styles.tripDuration}>{trip.days} days</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Tips */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Packing Tips</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <FontAwesome5 name="lightbulb" size={20} color="#FFC107" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Roll, Don't Fold!</Text>
            <Text style={styles.tipDescription}>
              Rolling your clothes instead of folding them saves space and prevents wrinkles.
            </Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <FontAwesome5 name="lightbulb" size={20} color="#FFC107" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Heavy Items at the Bottom</Text>
            <Text style={styles.tipDescription}>
              Pack heavy items at the bottom of your suitcase to prevent crushing lighter items.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  greetingText: {
    fontSize: 16,
    color: '#666',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  profileButton: {
    padding: 5,
  },
  newTripButton: {
    marginHorizontal: 20,
    backgroundColor: '#0099cc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  newTripContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newTripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  newTripSubtitle: {
    fontSize: 14,
    color: '#e0f7ff',
    marginTop: 5,
  },
  newTripIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuredTripsContainer: {
    paddingRight: 20,
  },
  featuredTripCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  tripImage: {
    width: 200,
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tripTypeTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 153, 204, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  tripTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tripInfo: {
    padding: 12,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tripDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});