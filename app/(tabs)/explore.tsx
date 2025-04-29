import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Categories for exploration
  const categories = [
    { id: 'beach', name: 'Beach', icon: 'umbrella-beach' },
    { id: 'mountain', name: 'Mountain', icon: 'mountain' },
    { id: 'city', name: 'City', icon: 'city' },
    { id: 'adventure', name: 'Adventure', icon: 'compass' },
    { id: 'food', name: 'Food', icon: 'utensils' },
    { id: 'culture', name: 'Culture', icon: 'landmark' },
  ];
  
  // Popular destinations
  const popularDestinations = [
    {
      id: '1',
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      category: 'beach'
    },
    {
      id: '2',
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      category: 'city'
    },
    {
      id: '3',
      name: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6',
      category: 'mountain'
    },
    {
      id: '4',
      name: 'Cairo, Egypt',
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
      category: 'culture'
    },
  ];
  
  // Trending experiences
  const trendingExperiences = [
    {
      id: '1',
      name: 'Bali Cooking Class',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Northern Lights Safari',
      location: 'Tromsø, Norway',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
      rating: 4.8
    },
    {
      id: '3',
      name: 'Tuscan Wine Tour',
      location: 'Tuscany, Italy',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b',
      rating: 4.7
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryItem}
            >
              <View style={styles.categoryIcon}>
                <FontAwesome5 name={category.icon} size={18} color="#0099cc" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Popular Destinations */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsList}
        >
          {popularDestinations.map(destination => (
            <TouchableOpacity 
              key={destination.id} 
              style={styles.destinationCard}
            >
              <Image 
                source={{ uri: destination.image }} 
                style={styles.destinationImage}
              />
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Trending Experiences */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Trending Experiences</Text>
        {trendingExperiences.map(experience => (
          <TouchableOpacity 
            key={experience.id} 
            style={styles.experienceCard}
          >
            <Image 
              source={{ uri: experience.image }} 
              style={styles.experienceImage}
            />
            <View style={styles.experienceInfo}>
              <Text style={styles.experienceName}>{experience.name}</Text>
              <View style={styles.experienceDetails}>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.locationText}>{experience.location}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFC107" />
                  <Text style={styles.ratingText}>{experience.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    margin: 20,
    marginTop: 0,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  destinationsList: {
    paddingRight: 20,
  },
  destinationCard: {
    width: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationImage: {
    width: 200,
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  experienceCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  experienceImage: {
    width: 100,
    height: 100,
  },
  experienceInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  experienceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  experienceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});