import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  TextInput 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// TripTypeSelector component for selecting the trip type
export const TripTypeSelector = ({ tripTypes, selectedType, onSelect }) => {
  return (
    <View style={styles.tripTypeContainer}>
      <Text style={styles.sectionTitle}>Trip Type</Text>
      <View style={styles.tripTypeList}>
        {tripTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.tripTypeItem,
              selectedType === type.id && styles.selectedTripType,
            ]}
            onPress={() => onSelect(type.id)}
          >
            <FontAwesome5
              name={type.icon}
              size={24}
              color={selectedType === type.id ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.tripTypeText,
                selectedType === type.id && styles.selectedTripTypeText,
              ]}
            >
              {type.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ActivitySelector component for selecting activities
export const ActivitySelector = ({ 
  activities, 
  selectedActivities, 
  onToggleActivity 
}) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <View style={styles.activitiesContainer}>
      <Text style={styles.sectionTitle}>Activities</Text>
      <View style={styles.activitiesList}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[
              styles.activityItem,
              selectedActivities.includes(activity.id) && styles.selectedActivity,
            ]}
            onPress={() => onToggleActivity(activity.id)}
          >
            <FontAwesome5
              name={activity.icon}
              size={20}
              color={selectedActivities.includes(activity.id) ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.activityText,
                selectedActivities.includes(activity.id) && styles.selectedActivityText,
              ]}
            >
              {activity.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// CompanionSelector component for selecting travel companions
export const CompanionSelector = ({ 
  companions, 
  selectedCompanion, 
  onSelectCompanion 
}) => {
  return (
    <View style={styles.companionContainer}>
      <Text style={styles.sectionTitle}>Traveling With</Text>
      <View style={styles.companionList}>
        {companions.map((companion) => (
          <TouchableOpacity
            key={companion.id}
            style={[
              styles.companionItem,
              selectedCompanion === companion.id && styles.selectedCompanion,
            ]}
            onPress={() => onSelectCompanion(companion.id)}
          >
            <FontAwesome5
              name={companion.icon}
              size={20}
              color={selectedCompanion === companion.id ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.companionText,
                selectedCompanion === companion.id && styles.selectedCompanionText,
              ]}
            >
              {companion.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// RelationshipTypeSelector component for selecting relationship type
export const RelationshipTypeSelector = ({ 
  relationshipTypes, 
  selectedRelationship, 
  onSelectRelationship,
  selectedCompanion 
}) => {
  // Only show relationship selector if companion is not solo
  if (selectedCompanion === 'solo') {
    return null;
  }

  return (
    <View style={styles.relationshipContainer}>
      <Text style={styles.sectionTitle}>Relationship Type</Text>
      <View style={styles.relationshipList}>
        {relationshipTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.relationshipItem,
              selectedRelationship === type.id && styles.selectedRelationship,
            ]}
            onPress={() => onSelectRelationship(type.id)}
          >
            <FontAwesome5
              name={type.icon}
              size={20}
              color={selectedRelationship === type.id ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.relationshipText,
                selectedRelationship === type.id && styles.selectedRelationshipText,
              ]}
            >
              {type.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// DurationSelector component for selecting trip duration
export const DurationSelector = ({ duration, onChangeDuration }) => {
  return (
    <View style={styles.durationContainer}>
      <Text style={styles.sectionTitle}>Trip Duration</Text>
      <View style={styles.durationControls}>
        <TouchableOpacity
          style={styles.durationButton}
          onPress={() => onChangeDuration(Math.max(1, duration - 1))}
        >
          <Text style={styles.durationButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.durationValue}>
          <Text style={styles.durationText}>{duration} {duration === 1 ? 'day' : 'days'}</Text>
        </View>
        <TouchableOpacity
          style={styles.durationButton}
          onPress={() => onChangeDuration(duration + 1)}
        >
          <Text style={styles.durationButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// AddCustomItem component for adding custom items to the packing list
export const AddCustomItem = ({ 
  onAddItem, 
  newItemName, 
  setNewItemName, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const categories = [
    'Clothing', 
    'Toiletries', 
    'Electronics', 
    'Documents', 
    'Accessories', 
    'Health', 
    'Equipment',
    'Entertainment',
    'Food',
    'Other'
  ];

  return (
    <View style={styles.customItemContainer}>
      <Text style={styles.sectionTitle}>Add Custom Item</Text>
      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.customItemInput}
          placeholder="Item name"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        
        <View style={styles.categorySelector}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <View style={styles.categoryButtons}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.selectedCategoryText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.addButton,
          (!newItemName || !selectedCategory) && styles.disabledButton
        ]}
        disabled={!newItemName || !selectedCategory}
        onPress={() => {
          onAddItem();
        }}
      >
        <Text style={styles.addButtonText}>Add to Packing List</Text>
      </TouchableOpacity>
    </View>
  );
};

// PackingListItem component for displaying an item in the packing list
export const PackingListItem = ({ item, onToggleCheck }) => {
  return (
    <TouchableOpacity 
      style={styles.packingItem} 
      onPress={() => onToggleCheck(item)}
    >
      <View style={styles.checkboxContainer}>
        <View style={[
          styles.checkbox, 
          item.checked && styles.checkboxChecked
        ]}>
          {item.checked && <FontAwesome5 name="check" size={12} color="#fff" />}
        </View>
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={[
          styles.itemName,
          item.checked && styles.itemNameChecked
        ]}>
          {item.name} {item.quantity > 1 && `(${item.quantity})`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  // Trip Type Styles
  tripTypeContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  tripTypeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  tripTypeItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedTripType: {
    backgroundColor: '#0099cc',
  },
  tripTypeText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedTripTypeText: {
    color: '#fff',
  },
  
  // Activities Styles
  activitiesContainer: {
    marginBottom: 20,
  },
  activitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedActivity: {
    backgroundColor: '#0099cc',
  },
  activityText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  selectedActivityText: {
    color: '#fff',
  },
  
  // Companion Styles
  companionContainer: {
    marginBottom: 20,
  },
  companionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  companionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCompanion: {
    backgroundColor: '#0099cc',
  },
  companionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  selectedCompanionText: {
    color: '#fff',
  },
  
  // Relationship Type Styles
  relationshipContainer: {
    marginBottom: 20,
  },
  relationshipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  relationshipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedRelationship: {
    backgroundColor: '#0099cc',
  },
  relationshipText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  selectedRelationshipText: {
    color: '#fff',
  },
  
  // Duration Styles
  durationContainer: {
    marginBottom: 20,
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0099cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  durationValue: {
    marginHorizontal: 15,
    width: 80,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // Custom Item Styles
  customItemContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputRow: {
    marginBottom: 10,
  },
  customItemInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  categorySelector: {
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    margin: 3,
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#e9e9e9',
  },
  selectedCategoryButton: {
    backgroundColor: '#0099cc',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#0099cc',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Packing List Item Styles
  packingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkboxContainer: {
    width: 30,
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#0099cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0099cc',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default {
  TripTypeSelector,
  ActivitySelector,
  CompanionSelector,
  RelationshipTypeSelector,
  DurationSelector,
  AddCustomItem,
  PackingListItem
};