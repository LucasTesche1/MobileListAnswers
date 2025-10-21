import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.slice(0, 10)); // mostra só os 10 primeiros
        } else if (response.status === 404) setError("Recurso não encontrado (404)");
        else if (response.status === 500) setError("Erro interno do servidor (500)");
      } catch {
        setError("Falha na conexão com o servidor");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#28a745" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts (Fetch API)</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titlePost}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />

      <View>
        <Pressable style={styles.button} onPress={() => router.push('/users')}>
          <Text style={{color:'white'}}>Ver Usuários</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  card: { padding: 10, backgroundColor: "#e9ecef", marginBottom: 10, borderRadius: 10 },
  titlePost: { fontWeight: "bold", fontSize: 16 },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  button: {width: '100%',
    backgroundColor: '#020202ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    color:'#fff',
    marginBottom: 25,}
});
