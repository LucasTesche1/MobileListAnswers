import axiosClient from "@/api/axiosClient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get<User[]>("/users");
        if (response.status === 200) setUsers(response.data);
        else if (response.status === 404) setError("Recurso não encontrado (404)");
        else if (response.status >= 500) setError("Erro interno do servidor (5xx)");
      } catch (err: any) {
        if (err.response?.status === 404) setError("Recurso não encontrado (404)");
        else if (err.response?.status >= 500) setError("Erro interno do servidor (5xx)");
        else setError("Erro desconhecido ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007bff" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários (Axios)</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  card: { padding: 10, backgroundColor: "#f1f1f1", marginBottom: 10, borderRadius: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  error: { color: "red", textAlign: "center", marginTop: 20 },
});
