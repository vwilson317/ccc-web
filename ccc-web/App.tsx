import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';
import { SignInScreen } from './src/screens/auth/SignInScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { RestaurantListScreen } from './src/screens/RestaurantListScreen';
import { RestaurantDetailScreen } from './src/screens/RestaurantDetailScreen';
import { useAuth } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        // Authenticated stack
        <>
          <Stack.Screen 
            name="RestaurantList" 
            component={RestaurantListScreen}
            options={{ title: 'Restaurants' }}
          />
          <Stack.Screen 
            name="RestaurantDetail" 
            component={RestaurantDetailScreen}
            options={({ route }) => ({ 
              title: 'Restaurant Details'
            })}
          />
        </>
      ) : (
        // Auth stack
        <>
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
