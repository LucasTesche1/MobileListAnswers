import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="07-FormularioExemplo" options={{ title: 'Questão 07' }} />
        <Stack.Screen name="08-PersistenciaLocal" options={{ title: 'Questão 08' }} />
        <Stack.Screen name="08-PersistenciaLocal2" options={{ title: 'Questão 08 parte 2' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
