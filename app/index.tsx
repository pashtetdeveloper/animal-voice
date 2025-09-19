import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { allAnimals } from '../data/animals';
import { Animal } from '../types/Animal';

const getRandomAnimals = (): Animal[] => {
  const shuffled = [...allAnimals].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export default function Index() {
  const [animals, setAnimals] = useState<Animal[]>(() => getRandomAnimals());
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadNewAnimals = () => {
    setAnimals(getRandomAnimals());
    setSelectedAnimal(null);
  };

  const playAnimalSound = () => {
    if (selectedAnimal) {
      setIsPlaying(true);
      // Simulate playing sound
      setTimeout(() => {
        setIsPlaying(false);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>🇺🇦</Text>
        </View>
        <TouchableOpacity onPress={loadNewAnimals} style={styles.refreshButton}>
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>34</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Play Button */}
        <TouchableOpacity
          style={[styles.playButton, isPlaying && styles.playButtonActive]}
          onPress={playAnimalSound}
          disabled={!selectedAnimal}
        >
          <Text style={styles.playIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>

        {/* Selected Animal Sound Text */}
        {selectedAnimal && (
          <Text style={styles.soundText}>{selectedAnimal.sound}</Text>
        )}
      </View>

      {/* Animal Selection */}
      <View style={styles.animalContainer}>
        {animals.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={[
              styles.animalButton,
              selectedAnimal?.id === animal.id && styles.selectedAnimal,
            ]}
            onPress={() => setSelectedAnimal(animal)}
          >
            <Image source={animal.image} style={styles.animalImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        {selectedAnimal
          ? `Tap play to hear the ${selectedAnimal.name.toLowerCase()}!`
          : 'Select an animal above'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  flagContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flag: {
    fontSize: 24,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  refreshIcon: {
    fontSize: 20,
  },
  counterContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  playButtonActive: {
    backgroundColor: '#FF6B00',
    transform: [{ scale: 0.95 }],
  },
  playIcon: {
    fontSize: 32,
    color: '#fff',
  },
  soundText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  animalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  animalButton: {
    width: 90,
    height: 90,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAnimal: {
    borderWidth: 3,
    borderColor: '#FF8C00',
  },
  animalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
});
