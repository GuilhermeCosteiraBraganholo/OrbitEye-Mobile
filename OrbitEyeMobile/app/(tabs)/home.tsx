import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { RiskBadge } from '@/components/RiskBadge';
import { theme } from '@/constants/theme';
import { useAuth } from '@/services/auth/AuthContext';
import { useAlerts, useDashboard, usePredictions, useRegions } from '@/features/orbiteye/hooks';

export default function HomeScreen() {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useDashboard();
  const { data: regions = [] } = useRegions();
  const { data: alerts = [] } = useAlerts();
  const { data: predictions = [] } = usePredictions();
  const criticalRegion = regions.find((item) => item.riskLevel === 'CRITICO') ?? regions[0];
  const lastPrediction = predictions[0];

  if (isLoading) return <Screen><ActivityIndicator color={theme.colors.primary} /></Screen>;

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.name ?? 'estudante'} 👋</Text>
        <Text style={styles.subtitle}>Painel de risco climático do OrbitEye para cidades e população.</Text>
      </View>

      <View style={styles.grid}>
        <Card><Text style={styles.metric}>{dashboard?.monitoredRegions ?? regions.length}</Text><Text style={styles.metricLabel}>regiões</Text></Card>
        <Card><Text style={styles.metric}>{dashboard?.activeAlerts ?? alerts.length}</Text><Text style={styles.metricLabel}>alertas ativos</Text></Card>
      </View>

      {criticalRegion && (
        <Card>
          <Text style={styles.cardTitle}>Região em destaque</Text>
          <RiskBadge level={criticalRegion.riskLevel} />
          <Text style={styles.cardText}>{criticalRegion.name} — {criticalRegion.city}/{criticalRegion.state}</Text>
          <Text style={styles.cardText}>Chuva: {criticalRegion.rainfall}mm · Rio: {criticalRegion.riverLevel}m · Umidade: {criticalRegion.humidity}%</Text>
        </Card>
      )}

      {lastPrediction && (
        <Card>
          <Text style={styles.cardTitle}>Previsão IA</Text>
          <Text style={styles.cardText}>{lastPrediction.summary}</Text>
          <Text style={styles.cardText}>Confiança: {lastPrediction.confidence}%</Text>
          <Text style={styles.recommendation}>{lastPrediction.recommendation}</Text>
        </Card>
      )}

      <Card>
        <Text style={styles.cardTitle}>Ações rápidas</Text>
        <PrimaryButton label="Abrir mapa de risco" onPress={() => router.push('/(tabs)/map')} />
        <View style={{ height: 10 }} />
        <PrimaryButton label="Ver alertas" onPress={() => router.push('/(tabs)/alerts')} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 8, marginBottom: 10 },
  greeting: { fontSize: 28, fontWeight: '900', color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: 15, lineHeight: 22, color: theme.colors.muted },
  grid: { flexDirection: 'row', gap: 12 },
  metric: { fontSize: 30, fontWeight: '900', color: theme.colors.primary },
  metricLabel: { color: theme.colors.muted, fontWeight: '700' },
  cardTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.text, marginBottom: 8 },
  cardText: { color: theme.colors.muted, lineHeight: 22 },
  recommendation: { color: theme.colors.text, lineHeight: 22, fontWeight: '700' }
});
