import React, { useState, useEffect } from 'react';
import { 
  View, 
  ActivityIndicator, 
  Text, 
  SafeAreaView, 
  RefreshControl,
  Animated,
  StatusBar
} from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { BarracaCard } from '../components/BarracaCard';
import { getBarracas, initializeSampleData } from '../services/barracaService';
import { Barraca } from '../types/restaurant';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 90;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const BarracaListScreen: React.FC<Props> = ({ navigation }) => {
  const [barracas, setBarracas] = useState<Barraca[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = new Animated.Value(0);

  const loadBarracas = async () => {
    try {
      console.log('Loading barracas...');
      const data = await getBarracas({ searchQuery });
      console.log('Loaded barracas:', data);
      setBarracas(data);
    } catch (error) {
      console.error('Error loading barracas:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log('Initializing...');
        await initializeSampleData();
        await loadBarracas();
      } catch (error) {
        console.error('Error during initialization:', error);
        setLoading(false);
      }
    };
    
    initialize();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    loadBarracas();
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBarracas();
  };

  // ... header animation interpolations ...

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary-50">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  console.log('Rendering barracas:', barracas);

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <StatusBar translucent backgroundColor="transparent" />
      
      <Animated.View 
        style={[{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#f97316',
          overflow: 'hidden',
          height: headerHeight 
        }]}
      >
        <Animated.Image
          source={{ uri: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' }}
          style={[{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: null,
            height: HEADER_MAX_HEIGHT,
            resizeMode: 'cover',
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }],
          }]}
        />
        <Animated.View
          style={[{
            height: HEADER_MAX_HEIGHT,
            padding: 20,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'flex-end',
          }]}
        >
          <Animated.Text 
            className="text-4xl font-bold text-white mb-2"
            style={[{
              transform: [{ scale: titleScale }]
            }]}
          >
            Rio Barracas
          </Animated.Text>
          <Text className="text-white text-xl mb-4 opacity-90">
            Taste of Ipanema
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
      >
        <View className="px-4 py-4">
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search barracas..."
          />
          
          {barracas.length > 0 ? (
            barracas.map((item) => (
              <BarracaCard
                key={item.id}
                barraca={item}
                onPress={() => navigation.navigate('BarracaDetail', { barracaId: item.id })}
              />
            ))
          ) : (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-primary-400 text-lg">
                No barracas found
              </Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
