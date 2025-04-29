import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TripsScreen() {
  // Sample trip data (would come from storage in a real app)
  const trips = [
    {
      id: '1',
      destination: 'Bali, Indonesia',
      startDate: '2025-06-10',
      endDate: '2025-06-17',
      tripType: 'beach',
      image: 'https://images.unsplash.com/photo-1573790387438-4da905039392'
    },
    {
      id: '2',
      destination: 'Paris, France',
      startDate: '2025-08-05',
      endDate: '2025-08-10',
      tripType: 'city',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
    }
  ];

  const renderTripCard = ({ item }) => {
    // Calculate number of days
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const dayDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Format dates
    const startFormatted = new Date(item.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    const endFormatted = new Date(item.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    // Get icon based on trip type
    let tripIcon = 'umbrella-beach';
    if (item.tripType === 'city') tripIcon = 'city';
    if (item.tripType === 'mountain') tripIcon = 'mountain';
    if (item.tripType === 'business') tripIcon = 'briefcase';

    return (
      <TouchableOpacity 
        style={styles.tripCard}
        onPress={() => {
          // In a real app, this would navigate to trip details
          console.log('View trip details for:', item.id);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.tripImage} />
        <View style={styles.tripInfo}>
          <Text style={styles.destination}>{item.destination}</Text>
          <View style={styles.tripDetails}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.dateText}>
                {startFormatted} - {endFormatted}
              </Text>
            </View>
            <View style={styles.typeContainer}>
              <FontAwesome5 name={tripIcon} size={14} color="#666" />
              <Text style={styles.typeText}>
                {dayDiff} {dayDiff === 1 ? 'day' : 'days'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/new-trip')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {trips.length > 0 ? (
        <FlatList
          data={trips}
          renderItem={renderTripCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.tripsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="suitcase" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No trips planned yet</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/new-trip')}
          >
            <Text style={styles.createButtonText}>Create Your First Trip</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#0099cc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripsList: {
    padding: 15,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 150,
  },
  tripInfo: {
    padding: 15,
  },
  destination: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#0099cc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});