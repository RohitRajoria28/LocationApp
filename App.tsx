/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const API_URL = 'https://api.opencagedata.com/geocode/v1/json?q=-22.6792%2C+14.5272&key=923447a9476d4d5bae11e7399cabacff&pretty=1';

const Max_loc = 30;

interface Location {
  formatted: string;
  timestamp: number;
}

interface LocationDisplayProps {
  locations: Location[];
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
}

const LocationDisplay = ({ locations, onRemove, onRemoveAll }: LocationDisplayProps) => {
  return (
    <View style={[styles.locationDisplay, { marginBottom: 0 }]}>
      <Text style={styles.title}>Manage Locations:</Text>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>Current Location</Text>
        </View>
        {locations.map((location, index) =>
          index === locations.length - 1 && (
            <View style={styles.locationRow} key={index}>
              <Text style={styles.locationText}>{location.formatted}</Text>
              <Button title="Remove" onPress={() => onRemove(index)} />
            </View>
          )
        )}
      </ScrollView>
      <Text style={styles.title}>Previous Locations</Text>
      <ScrollView style={styles.scrollContainer}>
        {locations.map((location, index) =>
          index !== locations.length - 1 && (
            <View style={styles.locationRow} key={index}>
              <Text style={styles.locationText}>{location.formatted}</Text>
              <Button title="Remove" onPress={() => onRemove(index)} />
            </View>
          )
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Clear All" onPress={onRemoveAll} />
      </View>
    </View>
  );
};

const App = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          const newLocations: Location[] = data.results.map((result: any) => ({
            formatted: result.formatted,
            timestamp: Date.now(),
          }));
          setLocations((prevLocations) => [...prevLocations, ...newLocations].slice(0, Max_loc));
        })
        .catch((error) => console.error(error));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleRemoveLocation = (index: number) => {
    setLocations((prevLocations) => prevLocations.filter((location, i) => i !== index));
  };

  const handleRemoveAllLocations = () => {
    setLocations([]);
  };

  return (
    <View style={styles.container}>
      <LocationDisplay
        locations={locations}
        onRemove={handleRemoveLocation}
        onRemoveAll={handleRemoveAllLocations}
      />
    </View>
  );
};

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  locationDisplay: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:10,
     
  },
  scrollContainer: {
    marginBottom: 0,
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  locationText: {
    flex: 1,
    fontSize: 15,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
});

export default App;
