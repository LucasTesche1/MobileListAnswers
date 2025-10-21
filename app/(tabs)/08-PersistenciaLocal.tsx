import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let db: any = null;

export default function PersistenciaLocal() {
  const [name, setName] = useState('');
  const [lastSavedName, setLastSavedName] = useState('');
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);

  // Inicialização do banco SQLite no Mobile
  useEffect(() => {
    if (Platform.OS !== 'web') {
      import('expo-sqlite').then((SQLite) => {
        db = (SQLite as any).openDatabase('users.db');

        // Criar tabela inicial
        db.transaction((tx: any) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
          );
        });

        fetchUsersMobile();
      });
    } else {
      fetchUsersWeb();
    }

    loadLastSavedName();
  }, []);

  // ======================
  // AsyncStorage: último nome
  // ======================
  const saveLastName = async (nameToSave: string) => {
    try {
      await AsyncStorage.setItem('@last_name', nameToSave);
      setLastSavedName(nameToSave);
    } catch (e) {
      console.error('Erro ao salvar último nome:', e);
    }
  };

  const loadLastSavedName = async () => {
    try {
      const value = await AsyncStorage.getItem('@last_name');
      if (value !== null) {
        setLastSavedName(value);
      }
    } catch (e) {
      console.error('Erro ao carregar último nome:', e);
    }
  };

  // ======================
  // Adicionar usuário
  // ======================
  const addUser = async () => {
    if (!name) return;

    if (Platform.OS !== 'web' && db) {
      // Mobile: SQLite
      db.transaction((tx: any) => {
        tx.executeSql('INSERT INTO users (name) VALUES (?)', [name], () => {
          fetchUsersMobile();
          saveLastName(name);
          setName('');
        });
      });
    } else {
      // Web: AsyncStorage
      const currentUsers = [...users, { id: Date.now(), name }];
      setUsers(currentUsers);
      await AsyncStorage.setItem('@users_list', JSON.stringify(currentUsers));
      saveLastName(name);
      setName('');
    }
  };

  // ======================
  // Buscar usuários
  // ======================
  const fetchUsersMobile = () => {
    if (!db) return;

    db.transaction((tx: any) => {
      tx.executeSql('SELECT * FROM users', [], (_: any, { rows }: any) => {
        setUsers(rows._array);
      });
    });
  };

  const fetchUsersWeb = async () => {
    try {
      const stored = await AsyncStorage.getItem('@users_list');
      if (stored) {
        setUsers(JSON.parse(stored));
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.error('Erro ao carregar usuários (Web):', e);
    }
  };

  // ======================
  // Excluir usuário
  // ======================
  const deleteUser = async (id: number) => {
    if (Platform.OS !== 'web' && db) {
      db.transaction((tx: any) => {
        tx.executeSql('DELETE FROM users WHERE id = ?', [id], () => {
          fetchUsersMobile();
          if (users.find(u => u.id === id)?.name === lastSavedName) {
            saveLastName('');
          }
        });
      });
    } else {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      await AsyncStorage.setItem('@users_list', JSON.stringify(updated));
      if (users.find(u => u.id === id)?.name === lastSavedName) {
        saveLastName('');
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Último nome salvo: {lastSavedName}
      </Text>

      <TextInput
        placeholder="Digite um nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Adicionar usuário" onPress={addUser} />

      <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 16 }}>
        Usuários cadastrados:
      </Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}
          >
            <Text>{item.name}</Text>
            <Button title="Excluir" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
