import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import { RiskLevel } from '@/features/orbiteye/types';

export function RiskBadge({ level }: { level: RiskLevel }) {
  const color = level === 'CRITICO' ? theme.colors.critical : level === 'ALTO' ? theme.colors.danger : level === 'MEDIO' ? theme.colors.warning : theme.colors.success;
  return <View style={[styles.badge, { borderColor: color }]}><Text style={[styles.text, { color }]}>{level}</Text></View>;
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  text: { fontSize: 12, fontWeight: '800' }
});
