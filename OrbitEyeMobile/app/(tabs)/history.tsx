import { StyleSheet, Text } from 'react-native';
import { Card } from '@/components/Card';
import { RiskBadge } from '@/components/RiskBadge';
import { Screen } from '@/components/Screen';
import { theme } from '@/constants/theme';
import { useEvents, usePredictions } from '@/features/orbiteye/hooks';

export default function HistoryScreen() {
  const { data: events = [] } = useEvents();
  const { data: predictions = [] } = usePredictions();

  return (
    <Screen>
      <Text style={styles.title}>Histórico climático</Text>
      <Text style={styles.subtitle}>Eventos registrados e previsões geradas pela IA.</Text>
      {predictions.map((prediction) => (
        <Card key={prediction.id}>
          <RiskBadge level={prediction.riskLevel} />
          <Text style={styles.cardTitle}>Previsão IA</Text>
          <Text style={styles.text}>{prediction.summary}</Text>
          <Text style={styles.text}>Confiança: {prediction.confidence}%</Text>
          <Text style={styles.strong}>{prediction.recommendation}</Text>
        </Card>
      ))}
      {events.map((event) => (
        <Card key={event.id}>
          <Text style={styles.cardTitle}>{event.type}</Text>
          <Text style={styles.text}>{event.description}</Text>
          <Text style={styles.text}>Intensidade: {event.intensity}/10 · {new Date(event.occurredAt).toLocaleString()}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '900', color: theme.colors.text },
  subtitle: { color: theme.colors.muted, lineHeight: 22 },
  cardTitle: { color: theme.colors.text, fontWeight: '800', fontSize: 18 },
  text: { color: theme.colors.muted, lineHeight: 22 },
  strong: { color: theme.colors.text, lineHeight: 22, fontWeight: '700' }
});
