import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SurveyProvider } from '@/context/SurveyContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SurveyProvider>
          <Drawer 
            screenOptions={{ 
              headerShown: true,
              drawerActiveTintColor: '#2b59ff',
              drawerInactiveTintColor: '#697386',
              drawerLabelStyle: { fontSize: 16, fontWeight: '600' }
            }}
          >
            <Drawer.Screen 
              name="(tabs)" 
              options={{ 
                drawerLabel: 'Dashboard',
                headerTitle: 'Dashboard',
                headerShown: false,
                drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
              }} 
            />
            {/* The actual preview screen is survey-preview */}
            <Drawer.Screen 
              name="survey-preview" 
              options={{ 
                drawerLabel: 'Survey',
                headerTitle: 'Survey Preview',
                drawerIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />
              }} 
            />
            <Drawer.Screen 
              name="camera" 
              options={{ 
                drawerLabel: 'Camera', 
                headerTitle: 'Camera',
                drawerIcon: ({ color, size }) => <Ionicons name="camera" size={size} color={color} />
              }} 
            />
            <Drawer.Screen 
              name="contacts" 
              options={{ 
                drawerLabel: 'Contacts', 
                headerTitle: 'Contacts',
                drawerIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />
              }} 
            />
            <Drawer.Screen 
              name="location" 
              options={{ 
                drawerLabel: 'Location', 
                headerTitle: 'Location',
                drawerIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} />
              }} 
            />
            <Drawer.Screen 
              name="clipboard" 
              options={{ 
                drawerLabel: 'Clipboard', 
                headerTitle: 'Clipboard',
                drawerIcon: ({ color, size }) => <Ionicons name="clipboard" size={size} color={color} />
              }} 
            />
            <Drawer.Screen 
              name="settings" 
              options={{ 
                drawerLabel: 'Settings', 
                headerTitle: 'Settings',
                drawerIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />
              }} 
            />
            
            {/* Hide unused/internal routes from drawer */}
            <Drawer.Screen name="modal" options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: 'none' } }} />
            {/* We can hide 'survey' if it existed as a dummy before */}
            <Drawer.Screen name="survey" options={{ drawerItemStyle: { display: 'none' } }} />
          </Drawer>
          <StatusBar style="auto" />
        </SurveyProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
