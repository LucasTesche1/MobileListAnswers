import React from 'react';
import { View, Button } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { router } from 'expo-router';

export default function NotifeeExample() {
  const onDisplayNotification = async () => {
    // Cria um canal Android (necessário)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Mostra a notificação
    await notifee.displayNotification({
      title: 'Olá! 👋',
      body: 'Esta é uma notificação usando Notifee.',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // ícone da notificação (coloque em android/app/src/main/res/mipmap)
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <View style={{ padding: 20 }}>
        <View style={{gap:20}}>
        <Button title="Mostrar Notificação (Notifee)" onPress={onDisplayNotification} />
        <Button title="Ver Notificações Push" onPress={() => router.push('/PushNotification')} /> 
        </View>
    </View>
    
  );
}
