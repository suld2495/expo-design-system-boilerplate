import { ActivityIndicator, View, StyleSheet, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';

interface SpinnerProps {
  size?: 'small' | 'large';
  style?: ViewStyle;
}

export const Spinner = ({ size = 'small', style }: SpinnerProps) => {
  const colors = useColors();

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
