// Smart packing algorithm that generates packing items based on trip parameters
export const getPackingItems = (
  tripType, 
  activities = [], 
  companion = 'solo', 
  relationshipType = null,
  duration = 3
) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Base essential items everyone should pack
      const essentialItems = [
        { id: '1', name: 'Passport', category: 'Documents', checked: false },
        { id: '2', name: 'ID/Driver\'s License', category: 'Documents', checked: false },
        { id: '3', name: 'Wallet with Cash/Cards', category: 'Documents', checked: false },
        { id: '4', name: 'Phone', category: 'Electronics', checked: false },
        { id: '5', name: 'Phone Charger', category: 'Electronics', checked: false },
        { id: '6', name: 'Travel Insurance', category: 'Documents', checked: false },
        { id: '7', name: 'Toothbrush', category: 'Toiletries', checked: false },
        { id: '8', name: 'Toothpaste', category: 'Toiletries', checked: false },
        { id: '9', name: 'Deodorant', category: 'Toiletries', checked: false },
        { id: '10', name: 'Shampoo', category: 'Toiletries', checked: false },
        { id: '11', name: 'Underwear', category: 'Clothing', checked: false, quantity: Math.min(duration, 7) },
        { id: '12', name: 'Socks', category: 'Clothing', checked: false, quantity: Math.min(duration, 7) },
        { id: '13', name: 'T-shirts', category: 'Clothing', checked: false, quantity: Math.ceil(duration / 2) },
        { id: '14', name: 'Pants/Shorts', category: 'Clothing', checked: false, quantity: Math.ceil(duration / 3) },
      ];

      // Items specific to trip type
      const tripTypeItems = {
        beach: [
          { id: 'beach1', name: 'Swimsuit', category: 'Clothing', checked: false, quantity: 2 },
          { id: 'beach2', name: 'Beach Towel', category: 'Accessories', checked: false },
          { id: 'beach3', name: 'Sunscreen', category: 'Toiletries', checked: false },
          { id: 'beach4', name: 'Sunglasses', category: 'Accessories', checked: false },
          { id: 'beach5', name: 'Hat/Cap', category: 'Clothing', checked: false },
          { id: 'beach6', name: 'Flip Flops', category: 'Clothing', checked: false },
          { id: 'beach7', name: 'Beach Bag', category: 'Accessories', checked: false },
        ],
        city: [
          { id: 'city1', name: 'City Map/Guide', category: 'Documents', checked: false },
          { id: 'city2', name: 'Comfortable Walking Shoes', category: 'Clothing', checked: false },
          { id: 'city3', name: 'Day Bag/Backpack', category: 'Accessories', checked: false },
          { id: 'city4', name: 'Umbrella', category: 'Accessories', checked: false },
          { id: 'city5', name: 'Camera', category: 'Electronics', checked: false },
          { id: 'city6', name: 'Travel Adapter', category: 'Electronics', checked: false },
        ],
        mountain: [
          { id: 'mtn1', name: 'Hiking Boots', category: 'Clothing', checked: false },
          { id: 'mtn2', name: 'Water Bottle', category: 'Accessories', checked: false },
          { id: 'mtn3', name: 'Backpack', category: 'Accessories', checked: false },
          { id: 'mtn4', name: 'First Aid Kit', category: 'Health', checked: false },
          { id: 'mtn5', name: 'Jacket/Fleece', category: 'Clothing', checked: false },
          { id: 'mtn6', name: 'Hiking Pants', category: 'Clothing', checked: false },
          { id: 'mtn7', name: 'Trekking Poles', category: 'Equipment', checked: false },
        ],
        business: [
          { id: 'bus1', name: 'Business Cards', category: 'Documents', checked: false },
          { id: 'bus2', name: 'Suit/Formal Attire', category: 'Clothing', checked: false },
          { id: 'bus3', name: 'Dress Shoes', category: 'Clothing', checked: false },
          { id: 'bus4', name: 'Laptop', category: 'Electronics', checked: false },
          { id: 'bus5', name: 'Laptop Charger', category: 'Electronics', checked: false },
          { id: 'bus6', name: 'Notebook/Planner', category: 'Documents', checked: false },
          { id: 'bus7', name: 'Portable Power Bank', category: 'Electronics', checked: false },
        ],
        adventure: [
          { id: 'adv1', name: 'Insect Repellent', category: 'Health', checked: false },
          { id: 'adv2', name: 'Multi-tool', category: 'Equipment', checked: false },
          { id: 'adv3', name: 'First Aid Kit', category: 'Health', checked: false },
          { id: 'adv4', name: 'Flashlight', category: 'Equipment', checked: false },
          { id: 'adv5', name: 'Water Bottle', category: 'Accessories', checked: false },
          { id: 'adv6', name: 'Quick-Dry Towel', category: 'Accessories', checked: false },
          { id: 'adv7', name: 'GoPro/Action Camera', category: 'Electronics', checked: false },
        ],
        family: [
          { id: 'fam1', name: 'Family Documents', category: 'Documents', checked: false },
          { id: 'fam2', name: 'Child Medications', category: 'Health', checked: false },
          { id: 'fam3', name: 'Snacks', category: 'Food', checked: false },
          { id: 'fam4', name: 'Entertainment for Kids', category: 'Entertainment', checked: false },
          { id: 'fam5', name: 'First Aid Kit', category: 'Health', checked: false },
          { id: 'fam6', name: 'Wipes', category: 'Toiletries', checked: false },
        ],
        road: [
          { id: 'road1', name: 'Car Charger', category: 'Electronics', checked: false },
          { id: 'road2', name: 'Road Map/GPS', category: 'Electronics', checked: false },
          { id: 'road3', name: 'Snacks', category: 'Food', checked: false },
          { id: 'road4', name: 'Water Bottles', category: 'Food', checked: false },
          { id: 'road5', name: 'Blanket', category: 'Accessories', checked: false },
          { id: 'road6', name: 'Emergency Car Kit', category: 'Emergency', checked: false },
          { id: 'road7', name: 'Music Playlist', category: 'Entertainment', checked: false },
        ],
        camping: [
          { id: 'camp1', name: 'Tent', category: 'Equipment', checked: false },
          { id: 'camp2', name: 'Sleeping Bag', category: 'Equipment', checked: false },
          { id: 'camp3', name: 'Camping Stove', category: 'Equipment', checked: false },
          { id: 'camp4', name: 'Cooking Utensils', category: 'Equipment', checked: false },
          { id: 'camp5', name: 'Camping Chairs', category: 'Equipment', checked: false },
          { id: 'camp6', name: 'Headlamp', category: 'Equipment', checked: false },
          { id: 'camp7', name: 'Fire Starter', category: 'Equipment', checked: false },
        ],
        cruise: [
          { id: 'cruise1', name: 'Seasickness Medication', category: 'Health', checked: false },
          { id: 'cruise2', name: 'Formal Attire', category: 'Clothing', checked: false },
          { id: 'cruise3', name: 'Swimsuit', category: 'Clothing', checked: false },
          { id: 'cruise4', name: 'Cruise Documents', category: 'Documents', checked: false },
          { id: 'cruise5', name: 'Day Bag', category: 'Accessories', checked: false },
          { id: 'cruise6', name: 'Sunscreen', category: 'Toiletries', checked: false },
          { id: 'cruise7', name: 'Binoculars', category: 'Equipment', checked: false },
        ],
      };

      // Activity-specific items
      const activityItems = {
        swimming: [
          { id: 'swim1', name: 'Swimsuit', category: 'Clothing', checked: false },
          { id: 'swim2', name: 'Swim Goggles', category: 'Equipment', checked: false },
          { id: 'swim3', name: 'Waterproof Phone Case', category: 'Electronics', checked: false },
        ],
        snorkeling: [
          { id: 'snork1', name: 'Snorkel Set', category: 'Equipment', checked: false },
          { id: 'snork2', name: 'Rash Guard', category: 'Clothing', checked: false },
          { id: 'snork3', name: 'Waterproof Camera', category: 'Electronics', checked: false },
        ],
        hiking: [
          { id: 'hike1', name: 'Hiking Boots', category: 'Clothing', checked: false },
          { id: 'hike2', name: 'Trekking Poles', category: 'Equipment', checked: false },
          { id: 'hike3', name: 'Trail Map', category: 'Documents', checked: false },
        ],
        skiing: [
          { id: 'ski1', name: 'Ski Jacket and Pants', category: 'Clothing', checked: false },
          { id: 'ski2', name: 'Ski Goggles', category: 'Equipment', checked: false },
          { id: 'ski3', name: 'Thermal Underwear', category: 'Clothing', checked: false },
        ],
        sightseeing: [
          { id: 'sight1', name: 'Comfortable Walking Shoes', category: 'Clothing', checked: false },
          { id: 'sight2', name: 'Camera', category: 'Electronics', checked: false },
          { id: 'sight3', name: 'City Map/Guide', category: 'Documents', checked: false },
        ],
        // Add more activities as needed
      };

      // Companion-specific items
      const companionItems = {
        solo: [],
        friend: [
          { id: 'friend1', name: 'Travel Games', category: 'Entertainment', checked: false },
          { id: 'friend2', name: 'Shared Snacks', category: 'Food', checked: false },
        ],
        partner: [
          { id: 'partner1', name: 'Couples Activities List', category: 'Documents', checked: false },
          { id: 'partner2', name: 'Relationship Enhancing Items', category: 'Personal', checked: false },
        ],
        family: [
          { id: 'fami1', name: 'Children\'s Entertainment', category: 'Entertainment', checked: false },
          { id: 'fami2', name: 'Family Games', category: 'Entertainment', checked: false },
          { id: 'fami3', name: 'Children\'s Medications', category: 'Health', checked: false },
        ],
      };

      // Relationship type items
      const relationshipItems = {
        friends: [
          { id: 'relFr1', name: 'Group Games', category: 'Entertainment', checked: false },
          { id: 'relFr2', name: 'Group Photo List', category: 'Documents', checked: false },
        ],
        couple: [
          { id: 'relCp1', name: 'Romantic Playlist', category: 'Entertainment', checked: false },
          { id: 'relCp2', name: 'Nice Outfits for Date Nights', category: 'Clothing', checked: false },
        ],
        family: [
          { id: 'relFm1', name: 'Family Activity Schedule', category: 'Documents', checked: false },
          { id: 'relFm2', name: 'Children\'s Comfort Items', category: 'Accessories', checked: false },
        ],
        colleagues: [
          { id: 'relCol1', name: 'Professional Attire', category: 'Clothing', checked: false },
          { id: 'relCol2', name: 'Business Cards', category: 'Documents', checked: false },
        ],
      };

      // Combine all items based on selected parameters
      let packingList = [...essentialItems];

      // Add trip type specific items
      if (tripTypeItems[tripType]) {
        packingList = [...packingList, ...tripTypeItems[tripType]];
      }

      // Add activity specific items
      activities.forEach(activity => {
        if (activityItems[activity]) {
          packingList = [...packingList, ...activityItems[activity]];
        }
      });

      // Add companion specific items
      if (companionItems[companion]) {
        packingList = [...packingList, ...companionItems[companion]];
      }

      // Add relationship type items if applicable
      if (relationshipType && relationshipItems[relationshipType]) {
        packingList = [...packingList, ...relationshipItems[relationshipType]];
      }

      // Remove duplicates (based on item name)
      const uniqueItems = Array.from(
        new Map(packingList.map(item => [item.name, item])).values()
      );

      // Organize by category
      const categorizedItems = {};
      uniqueItems.forEach(item => {
        if (!categorizedItems[item.category]) {
          categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
      });

      // Sort categories alphabetically for better display
      const sortedCategories = Object.keys(categorizedItems).sort();

      const finalList = sortedCategories.map(category => ({
        category,
        items: categorizedItems[category]
      }));

      resolve(finalList);
    }, 2000); // Simulate 2 second processing time
  });
};