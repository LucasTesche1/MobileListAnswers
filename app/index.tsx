import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffffff', dark: '#000000ff' }}
      headerImage={
        <Image
          source={require('@/assets/images/wallpaper.jpg')}
          style={styles.reactLogo}
        />
      }>
      
      {/* Cabeçalho */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Respostas das Questões</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedText type="subtitle" style={styles.subTitle}>
        Questões 04, 07, 08 e 09
      </ThemedText>

      {/* Cards interativos */}
      <ThemedView style={styles.cardContainer}>
        <Pressable style={styles.card} onPress={() => router.push('/post')}>
          <ThemedText type="subtitle">Questão 04</ThemedText>
          <ThemedText>
            Explore a análise da questão 04, com explicações detalhadas e contexto teórico.
          </ThemedText>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/07-FormularioExemplo')}>
          <ThemedText type="subtitle">Questão 07</ThemedText>
          <ThemedText>
            Veja a resolução e os conceitos principais abordados na questão 07.
          </ThemedText>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/08-PersistenciaLocal')}>
          <ThemedText type="subtitle">Questão 08</ThemedText>
          <ThemedText>
            Aprofunde-se nas ideias que sustentam a resposta da questão 08.
          </ThemedText>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/')}>
          <ThemedText type="subtitle">Questão 09</ThemedText>
          <ThemedText>
            Impossível abrir, explicações no readme
          </ThemedText>
        </Pressable>
      </ThemedView>

      {/* Rodapé */}
      <ThemedView style={styles.footer}>
        <ThemedText type="defaultSemiBold">
          “Questão 08 e 09 possuem problema de compatiblidade com Expo GO”
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  subTitle: {
    textAlign: 'center',
    marginVertical: 10,
  },
  cardContainer: {
    marginTop: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#4e4e4eff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  reactLogo: {
    height: 200,
    width: 500,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent:'center',
    paddingBottom: 40,
  },
});
