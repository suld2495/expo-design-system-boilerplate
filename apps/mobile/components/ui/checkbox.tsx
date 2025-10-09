import { Pressable, View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../../constants/spacing';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  style,
}: CheckboxProps) => {
  const colors = useColors();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? colors.primary : 'transparent',
            borderColor: checked ? colors.primary : colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {checked && <Text style={[styles.checkmark, { color: colors.primaryText }]}>✓</Text>}
      </View>
      {label && (
        <Text style={[styles.label, { color: colors.text, opacity: disabled ? 0.5 : 1 }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: FONT_SIZE.SM,
    fontWeight: '700',
  },
  label: {
    fontSize: FONT_SIZE.MD,
  },
});
