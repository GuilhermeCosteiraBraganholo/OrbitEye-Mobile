import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { RiskBadge } from '@/components/RiskBadge';
import { Screen } from '@/components/Screen';
import { theme } from '@/constants/theme';
import { useCreateRegion, useDeleteRegion, useRegions, useUpdateRegion } from '@/features/orbiteye/hooks';
import { useState } from 'react';

export default function MapScreen() {
  const { data: regions = [] } = useRegions();
  const createRegion = useCreateRegion();
  const updateRegion = useUpdateRegion();
  const deleteRegion = useDeleteRegion();
  const [name, setName] = useState('Nova área monitorada');

  async function handleCreate() {
    try {
      await createRegion.mutateAsync({ name, city: 'São Paulo', state: 'SP', latitude: -23.55, longitude: -46.63, population: 12000, riskLevel: 'MEDIO', riverLevel: 2.1, rainfall: 38, temperature: 24, humidity: 80 });
      setName('Nova área monitorada');
      Alert.alert('Sucesso', 'Região criada via API.');
    } catch { Alert.alert('Erro', 'Não foi possível criar a região.'); }
  }

  return (
    <Screen>
      <Text style={styles.title}>Mapa de risco</Text>
      <Text style={styles.subtitle}>Simulação de mapa: cada card representa uma região monitorada por satélite, sensores e dados climáticos.</Text>

      <Card>
        <Text style={styles.cardTitle}>CRUD de regiões</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholderTextColor={theme.colors.muted} />
        <PrimaryButton label="Criar região" onPress={handleCreate} loading={createRegion.isPending} />
      </Card>

      {regions.map((region) => (
        <Card key={region.id}>
          <View style={styles.row}>
            <Text style={styles.region}>{region.name}</Text>
            <RiskBadge level={region.riskLevel} />
          </View>
          <Text style={styles.text}>{region.city}/{region.state} · População afetada: {region.population}</Text>
          <Text style={styles.text}>Lat/Lng: {region.latitude}, {region.longitude}</Text>
          <Text style={styles.text}>Chuva {region.rainfall}mm · Rio {region.riverLevel}m · Temp. {region.temperature}°C</Text>
          <View style={styles.actions}>
            <PrimaryButton label="Atualizar população" onPress={() => updateRegion.mutate({ id: region.id, payload: { population: region.population + 1000, name: region.name } })} />
            <View style={{ height: 8 }} />
            <PrimaryButton label="Remover" onPress={() => deleteRegion.mutate(region.id)} />
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '900', color: theme.colors.text },
  subtitle: { color: theme.colors.muted, lineHeight: 22 },
  cardTitle: { color: theme.colors.text, fontWeight: '800', fontSize: 18 },
  input: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 12, color: theme.colors.text, backgroundColor: '#0B1628' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center' },
  region: { color: theme.colors.text, fontSize: 18, fontWeight: '800', flex: 1 },
  text: { color: theme.colors.muted, lineHeight: 22 },
  actions: { marginTop: 8 }
});
