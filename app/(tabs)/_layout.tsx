import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveBackgroundColor:'#fff',
        
      }}>
      
      <Tabs.Screen
        name="09-NotifeeExemplo"
        options={{
          title: 'Questão 09',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
        }}
      />

      <Tabs.Screen
        name="08-PersistenciaLocal"
        options={{
          title: 'Questão 08',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="location" color={color} />,
        }}
        
      />

      <Tabs.Screen
        name="07-FormularioExemplo"
        options={{
          title: 'Questão 07',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil" color={color} />,
        }}
      />
    </Tabs>
  );
}
