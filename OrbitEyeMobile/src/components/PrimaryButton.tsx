import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
};

export function PrimaryButton({ label, onPress, loading = false }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={loading} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.9
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  }
});
