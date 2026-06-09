import { Alert as RNAlert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { RiskBadge } from '@/components/RiskBadge';
import { Screen } from '@/components/Screen';
import { theme } from '@/constants/theme';
import { useAlerts, useCreateAlert, useDeleteAlert, useRegions, useUpdateAlert } from '@/features/orbiteye/hooks';

export default function AlertsScreen() {
  const { data: alerts = [] } = useAlerts();
  const { data: regions = [] } = useRegions();
  const createAlert = useCreateAlert();
  const updateAlert = useUpdateAlert();
  const deleteAlert = useDeleteAlert();
  const [title, setTitle] = useState('Risco de enchente elevado');

  async function handleCreate() {
    const region = regions[0];
    if (!region) return RNAlert.alert('Atenção', 'Cadastre uma região primeiro.');
    try {
      await createAlert.mutateAsync({ regionId: region.id, title, description: 'IA detectou aumento no risco por chuva acumulada e nível do rio.', level: 'ALTO', status: 'ATIVO' });
      RNAlert.alert('Sucesso', 'Alerta criado via API.');
    } catch { RNAlert.alert('Erro', 'Não foi possível criar alerta.'); }
  }

  return (
    <Screen>
      <Text style={styles.title}>Alertas</Text>
      <Text style={styles.subtitle}>Envio e acompanhamento de alertas para regiões monitoradas.</Text>
      <Card>
        <Text style={styles.cardTitle}>CRUD de alertas</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor={theme.colors.muted} />
        <PrimaryButton label="Criar alerta" onPress={handleCreate} loading={createAlert.isPending} />
      </Card>
      {alerts.map((item) => (
        <Card key={item.id}>
          <View style={styles.row}><Text style={styles.alertTitle}>{item.title}</Text><RiskBadge level={item.level} /></View>
          <Text style={styles.text}>{item.description}</Text>
          <Text style={styles.text}>Status: {item.status} · {new Date(item.createdAt).toLocaleString()}</Text>
          <PrimaryButton label={item.status === 'ATIVO' ? 'Marcar resolvido' : 'Reabrir alerta'} onPress={() => updateAlert.mutate({ id: item.id, payload: { status: item.status === 'ATIVO' ? 'RESOLVIDO' : 'ATIVO' } })} />
          <View style={{ height: 8 }} />
          <PrimaryButton label="Excluir alerta" onPress={() => deleteAlert.mutate(item.id)} />
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
  alertTitle: { color: theme.colors.text, fontSize: 18, fontWeight: '800', flex: 1 },
  text: { color: theme.colors.muted, lineHeight: 22 }
});
