import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Modal,
  FlatList,
  Share,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

// Import trip types and activities
import { 
  tripTypes, 
  activityOptions, 
  companionOptions,
  relationshipTypes 
} from './new-trip/constants';

// Import packing algorithm
import { getPackingItems } from './new-trip/packing-algorithm';

// Import components
import {
  TripTypeSelector,
  ActivitySelector,
  CompanionSelector,
  RelationshipTypeSelector,
  DurationSelector,
  AddCustomItem,
  PackingListItem
} from './new-trip/components';

const NewTrip = () => {
  // Trip details state
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)); // Default 3 days
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState('beach');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState('solo');
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [duration, setDuration] = useState(3);
  
  // Packing list state
  const [packingList, setPackingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('details'); // 'details' or 'packing-list'
  
  // Custom item state
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Other');
  
  // Share modal state
  const [shareModalVisible, setShareModalVisible] = useState(false);
  
  // Handle date changes
  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
    
    // Ensure end date is not before start date
    if (endDate < currentDate) {
      setEndDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
    }
    
    // Update duration
    updateDuration(currentDate, endDate);
  };
  
  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    
    // Update duration
    updateDuration(startDate, currentDate);
  };
  
  // Calculate duration between two dates
  const updateDuration = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDuration(diffDays);
  };
  
  // Handle trip type selection
  const handleTripTypeSelect = (tripType) => {
    setSelectedTripType(tripType);
    // Reset activities when trip type changes
    setSelectedActivities([]);
  };
  
  // Handle activity toggle
  const handleToggleActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };
  
  // Handle companion selection
  const handleCompanionSelect = (companionId) => {
    setSelectedCompanion(companionId);
    
    // Reset relationship type if solo is selected
    if (companionId === 'solo') {
      setSelectedRelationship(null);
    } else if (!selectedRelationship) {
      // Default relationship type based on companion
      switch (companionId) {
        case 'friend': 
          setSelectedRelationship('friends');
          break;
        case 'partner':
          setSelectedRelationship('couple');
          break;
        case 'family':
          setSelectedRelationship('family');
          break;
        default:
          setSelectedRelationship(null);
      }
    }
  };
  
  // Handle relationship type selection
  const handleRelationshipSelect = (relationshipId) => {
    setSelectedRelationship(relationshipId);
  };
  
  // Generate packing list
  const handleGeneratePackingList = async () => {
    if (!destination) {
      Alert.alert('Missing Information', 'Please enter a destination.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const generatedList = await getPackingItems(
        selectedTripType,
        selectedActivities,
        selectedCompanion,
        selectedRelationship,
        duration
      );
      
      setPackingList(generatedList);
      setCurrentStep('packing-list');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate packing list.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add custom item to packing list
  const handleAddCustomItem = () => {
    if (!newItemName.trim() || !selectedCategory) return;
    
    // Check if category already exists
    let updatedList = [...packingList];
    const categoryIndex = updatedList.findIndex(cat => cat.category === selectedCategory);
    
    const newItem = {
      id: \`custom-\${Date.now()}\`,
      name: newItemName.trim(),
      category: selectedCategory,
      checked: false
    };
    
    if (categoryIndex >= 0) {
      // Add to existing category
      updatedList[categoryIndex].items = [
        ...updatedList[categoryIndex].items,
        newItem
      ];
    } else {
      // Create new category
      updatedList.push({
        category: selectedCategory,
        items: [newItem]
      });
      
      // Sort categories alphabetically
      updatedList.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    setPackingList(updatedList);
    setNewItemName('');
  };
  
  // Toggle item checked status
  const handleToggleItemCheck = (item) => {
    const updatedList = packingList.map(category => ({
      ...category,
      items: category.items.map(i => 
        i.id === item.id ? { ...i, checked: !i.checked } : i
      )
    }));
    
    setPackingList(updatedList);
  };
  
  // Create trip and save to storage
  const handleCreateTrip = () => {
    const trip = {
      id: Date.now().toString(),
      destination,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tripType: selectedTripType,
      activities: selectedActivities,
      companion: selectedCompanion,
      relationshipType: selectedRelationship,
      duration,
      packingList,
      createdAt: new Date().toISOString(),
    };
    
    // Here you would save the trip to your storage (AsyncStorage, Redux, etc.)
    console.log('Trip created:', trip);
    
    // Navigate back to trips list
    router.replace('/(tabs)/trips');
  };
  
  // Share packing list
  const handleShare = async (method) => {
    setShareModalVisible(false);
    
    // Format packing list as text
    let packingListText = \`Packing List for \${destination}\\n\\n\`;
    
    packingList.forEach(category => {
      packingListText += \`\${category.category}:\\n\`;
      
      category.items.forEach(item => {
        packingListText += \`${item.checked ? '✓' : '☐'} \${item.name}\${
          item.quantity > 1 ? ` (${item.quantity})` : ''
        }\\n\`;
      });
      
      packingListText += '\\n';
    });
    
    switch (method) {
      case 'whatsapp':
        // This would open WhatsApp - in a real app you'd use a proper linking library
        Alert.alert('Share via WhatsApp', 'This would open WhatsApp with your packing list.');
        break;
        
      case 'email':
        // This would open email - in a real app you'd use a proper linking library
        Alert.alert('Share via Email', 'This would open email with your packing list.');
        break;
        
      case 'copy':
        await Clipboard.setStringAsync(packingListText);
        Alert.alert('Copied', 'Packing list copied to clipboard!');
        break;
        
      case 'pdf':
        try {
          // Generate HTML for PDF
          let htmlContent = \`
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  h1 { color: #0099cc; }
                  h2 { color: #333; margin-top: 20px; }
                  .item { margin: 5px 0; }
                  .checked { text-decoration: line-through; color: #999; }
                </style>
              </head>
              <body>
                <h1>Packing List for \${destination}</h1>
          \`;
          
          packingList.forEach(category => {
            htmlContent += \`<h2>\${category.category}</h2>\`;
            
            category.items.forEach(item => {
              htmlContent += \`
                <div class="item \${item.checked ? 'checked' : ''}">
                  \${item.checked ? '✓' : '☐'} \${item.name}\${
                    item.quantity > 1 ? ` (${item.quantity})` : ''
                  }
                </div>
              \`;
            });
          });
          
          htmlContent += \`
                <p style="margin-top: 30px; color: #666;">
                  Generated by PackWise Travel App
                </p>
              </body>
            </html>
          \`;
          
          // Create PDF
          const { uri } = await Print.printToFileAsync({ html: htmlContent });
          
          // Share PDF
          if (Platform.OS === 'ios') {
            await Sharing.shareAsync(uri);
          } else {
            const pdfName = \`packinglist-\${destination.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf\`;
            const newUri = \`\${FileSystem.documentDirectory}\${pdfName}\`;
            await FileSystem.moveAsync({
              from: uri,
              to: newUri
            });
            await Sharing.shareAsync(newUri);
          }
        } catch (error) {
          console.error('Error generating PDF:', error);
          Alert.alert('Error', 'Failed to generate PDF.');
        }
        break;
        
      default:
        try {
          await Share.share({
            message: packingListText,
            title: \`Packing List for \${destination}\`,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
    }
  };
  
  // Render trip details form
  const renderTripDetailsForm = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Trip</Text>
      </View>
      
      <View style={styles.formContainer}>
        {/* Destination Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Destination</Text>
          <TextInput
            style={styles.input}
            placeholder="Where are you going?"
            value={destination}
            onChangeText={setDestination}
          />
        </View>
        
        {/* Date Selection */}
        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {startDate.toLocaleDateString()}
              </Text>
              <Ionicons name="calendar" size={20} color="#666" />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
          
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {endDate.toLocaleDateString()}
              </Text>
              <Ionicons name="calendar" size={20} color="#666" />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
                minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
              />
            )}
          </View>
        </View>
        
        {/* Trip Type Selection */}
        <TripTypeSelector
          tripTypes={tripTypes}
          selectedType={selectedTripType}
          onSelect={handleTripTypeSelect}
        />
        
        {/* Activities Selection */}
        {activityOptions[selectedTripType] && (
          <ActivitySelector
            activities={activityOptions[selectedTripType]}
            selectedActivities={selectedActivities}
            onToggleActivity={handleToggleActivity}
          />
        )}
        
        {/* Companion Selection */}
        <CompanionSelector
          companions={companionOptions}
          selectedCompanion={selectedCompanion}
          onSelectCompanion={handleCompanionSelect}
        />
        
        {/* Relationship Type Selection */}
        <RelationshipTypeSelector
          relationshipTypes={relationshipTypes}
          selectedRelationship={selectedRelationship}
          onSelectRelationship={handleRelationshipSelect}
          selectedCompanion={selectedCompanion}
        />
        
        {/* Duration Selection */}
        <DurationSelector
          duration={duration}
          onChangeDuration={setDuration}
        />
        
        {/* Generate Button */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGeneratePackingList}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.generateButtonText}>Generate AI Packing List</Text>
              <FontAwesome5 name="magic" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  
  // Render packing list
  const renderPackingList = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep('details')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Packing List</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => setShareModalVisible(true)}
        >
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tripInfoBanner}>
        <Text style={styles.destinationText}>{destination}</Text>
        <Text style={styles.tripDuration}>
          {duration} {duration === 1 ? 'day' : 'days'} · {
            tripTypes.find(type => type.id === selectedTripType)?.name
          }
        </Text>
      </View>
      
      {/* Add custom item section */}
      <AddCustomItem
        onAddItem={handleAddCustomItem}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      {/* Packing List */}
      {packingList.length > 0 ? (
        <ScrollView style={styles.packingListContainer}>
          {packingList.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              {category.items.map((item) => (
                <PackingListItem
                  key={item.id}
                  item={item}
                  onToggleCheck={handleToggleItemCheck}
                />
              ))}
            </View>
          ))}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setCurrentStep('details')}
            >
              <Text style={styles.editButtonText}>Edit Trip</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleCreateTrip}
            >
              <Text style={styles.saveButtonText}>Save Trip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="luggage-cart" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No packing items yet.</Text>
        </View>
      )}
      
      {/* Share Modal */}
      <Modal
        visible={shareModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share Packing List</Text>
            
            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleShare('whatsapp')}
            >
              <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
              <Text style={styles.shareOptionText}>WhatsApp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleShare('email')}
            >
              <FontAwesome5 name="envelope" size={24} color="#D44638" />
              <Text style={styles.shareOptionText}>Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleShare('copy')}
            >
              <FontAwesome5 name="copy" size={24} color="#666" />
              <Text style={styles.shareOptionText}>Copy to Clipboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleShare('pdf')}
            >
              <FontAwesome5 name="file-pdf" size={24} color="#FF0000" />
              <Text style={styles.shareOptionText}>Export as PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShareModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
  
  return currentStep === 'details' ? renderTripDetailsForm() : renderPackingList();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInputContainer: {
    width: '48%',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#0099cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tripInfoBanner: {
    padding: 15,
    backgroundColor: '#f0f9ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  destinationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tripDuration: {
    fontSize: 16,
    color: '#666',
    marginTop: 3,
  },
  packingListContainer: {
    flex: 1,
    padding: 15,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0099cc',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 50,
  },
  editButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#0099cc',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  shareOptionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default NewTrip;