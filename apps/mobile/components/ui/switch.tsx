import { Switch as RNSwitch, View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { SPACING, FONT_SIZE } from '../../constants/spacing';

interface SwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Switch = ({
  label,
  value,
  onValueChange,
  disabled = false,
  style,
}: SwitchProps) => {
  const colors = useColors();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text, opacity: disabled ? 0.5 : 1 }]}>
          {label}
        </Text>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor={colors.background}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: FONT_SIZE.MD,
  },
});
