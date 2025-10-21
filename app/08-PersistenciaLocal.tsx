import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AsyncStorageExample() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const stored = await AsyncStorage.getItem('@users_list');
      if (stored) setUsers(JSON.parse(stored));
    } catch (e) {
      console.error('Erro ao carregar usuários:', e);
    }
  };

  const saveUsers = async (newUsers: Array<{ id: number; name: string }>) => {
    try {
      await AsyncStorage.setItem('@users_list', JSON.stringify(newUsers));
      setUsers(newUsers);
    } catch (e) {
      console.error('Erro ao salvar usuários:', e);
    }
  };

  const addUser = async () => {
    if (!name.trim()) return;
    const newUsers = [...users, { id: Date.now(), name }];
    await saveUsers(newUsers);
    setName('');
  };

  const deleteUser = async (id: number) => {
    const updated = users.filter((u) => u.id !== id);
    await saveUsers(updated);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>AsyncStorage</Text>

        <TextInput
          placeholder="Digite um nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Pressable onPress={addUser} style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
        <Button title="SQLite Não Funciona com EXPO GO"/> 

        <Text style={styles.listTitle}>Usuários cadastrados:</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum usuário ainda...</Text>}
          renderItem={({ item }) => (
            <View style={styles.userRow}>
              <Text style={styles.userName}>{item.name}</Text>
              <Pressable onPress={() => deleteUser(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Excluir</Text>
              </Pressable>
            </View>
          )}
          style={styles.list}
          contentContainerStyle={users.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : undefined}  
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f0f4f8' },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 25, color: '#1e3a8a', textAlign: 'center' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cbd5e0',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  listTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15, color: '#1e40af', alignSelf: 'flex-start' },
  list: { width: '100%' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#64748b', fontSize: 16 },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userName: { fontSize: 16, color: '#1e293b' },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  deleteText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
