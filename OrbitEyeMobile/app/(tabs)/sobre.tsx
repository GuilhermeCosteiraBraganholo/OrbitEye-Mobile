import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>OrbitEye Mobile</Text>

        <Text style={styles.text}>
          Aplicativo desenvolvido para a Global Solution 2026.
        </Text>

        <Text style={styles.text}>
          Tema: Economia Espacial aplicada à prevenção de desastres naturais.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologias Utilizadas</Text>

        <Text style={styles.text}>• React Native</Text>
        <Text style={styles.text}>• Expo</Text>
        <Text style={styles.text}>• TypeScript</Text>
        <Text style={styles.text}>• Axios</Text>
        <Text style={styles.text}>• Java Spring Boot</Text>
        <Text style={styles.text}>• Oracle Database</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Integrantes</Text>

        <Text style={styles.text}>
          Guilherme Costeira Braganholo - RM560628
        </Text>

        <Text style={styles.text}>
          Julio Cesar Dias Vilella - RM560494
        </Text>

        <Text style={styles.text}>
          Gabriel Nakamura Ogata - RM560671
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Versão</Text>

        <Text style={styles.commit}>
          Commit: 0a88c2b
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001923",
    padding: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#121d3a",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  text: {
    color: "#b8c1d1",
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },

  commit: {
    color: "#3db9f5",
    fontSize: 18,
    fontWeight: "bold",
  },
});