# Smart Travel Packing Assistant

This is the core of our PackWise app - the Smart Travel Packing Assistant that generates personalized packing lists based on:

1. **Destination** - Where the user is traveling to
2. **Trip Type** - Beach, City, Mountain, Business, Adventure, Family, etc.
3. **Activities** - Swimming, Hiking, Sightseeing, Camping, etc.
4. **Travel Companions** - Solo, Friend, Partner, Family
5. **Relationship Type** - Friends, Couple, Family, Colleagues
6. **Trip Duration** - Number of days

## Features

- **AI-Generated Packing Items** based on all selected parameters
- **Category Organization** of items (Documents, Clothing, Electronics, etc.)
- **Add Custom Items** functionality with category selection
- **Check Off Items** as they're packed
- **Share Options** for the packing list:
  - WhatsApp
  - Email
  - Copy to Clipboard
  - Export as PDF

## Implementation Details

The packing list generation is done through a smart algorithm that:

1. Starts with essential items everyone needs
2. Adds items specific to the trip type
3. Adds items specific to selected activities
4. Adds items based on travel companions and relationship type
5. Adjusts quantities based on trip duration
6. Removes duplicates and organizes by category

This "AI" approach simulates what a real machine learning model would do, providing personalized recommendations that make packing easier and more efficient for travelers.

## Screenshot

![AI Packing Assistant](https://github.com/yasirSub/packwise-travel-app/raw/app-code/screenshots/packing-list.png)