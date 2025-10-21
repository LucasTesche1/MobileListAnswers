import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function PushNotificationExample() {
  useEffect(() => {
    // Configuração inicial
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notificação recebida:', notification);
      },
      requestPermissions: true,
    });
  }, []);

  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      message: 'Esta é uma notificação agendada (RNP)', // conteúdo da notificação
      date: new Date(Date.now() + 5 * 1000), // 5 segundos depois
      allowWhileIdle: true,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Agendar Notificação (RNP)" onPress={scheduleNotification} />
    </View>
  );
}
