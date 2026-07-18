import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SurveyProvider } from '@/context/SurveyContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SurveyProvider>
        <Drawer screenOptions={{ headerShown: true }}>
          <Drawer.Screen 
            name="(tabs)" 
            options={{ 
              drawerLabel: 'Dashboard',
              headerTitle: 'Dashboard',
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="survey" 
            options={{ 
              drawerLabel: 'Survey',
              headerTitle: 'Survey',
            }} 
          />
          <Drawer.Screen name="camera" options={{ drawerLabel: 'Camera', headerTitle: 'Camera' }} />
          <Drawer.Screen name="contacts" options={{ drawerLabel: 'Contacts', headerTitle: 'Contacts' }} />
          <Drawer.Screen name="location" options={{ drawerLabel: 'Location', headerTitle: 'Location' }} />
          <Drawer.Screen name="clipboard" options={{ drawerLabel: 'Clipboard', headerTitle: 'Clipboard' }} />
          <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings', headerTitle: 'Settings' }} />
          <Drawer.Screen name="modal" options={{ drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer>
        <StatusBar style="auto" />
      </SurveyProvider>
    </ThemeProvider>
  );
}
