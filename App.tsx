import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';
import { SignInScreen } from './src/screens/auth/SignInScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { BarracaListScreen } from './src/screens/RestaurantListScreen';
import { BarracaDetailScreen } from './src/screens/RestaurantDetailScreen';
import { useAuth } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {/* Public screens - always accessible */}
      <Stack.Screen 
        name="BarracaList" 
        component={BarracaListScreen}
        options={{ 
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="BarracaDetail" 
        component={BarracaDetailScreen}
        options={{ 
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: '',
          headerTintColor: '#fff'
        }}
      />

      {/* Auth screens - only shown when not logged in */}
      {!user && (
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
