import { TextInput, View, Text, StyleSheet, Pressable, type TextInputProps, type ViewStyle } from 'react-native';
import { useState } from 'react';
import { useColors } from '../../hooks/use-colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../../constants/spacing';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  style?: ViewStyle;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onClear,
  style,
  ...props
}: InputProps) => {
  const colors = useColors();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}

      <View style={[
        styles.inputContainer,
        {
          backgroundColor: colors.backgroundSecondary,
          borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
        },
        style,
      ]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, { color: colors.text, flex: 1 }]}
          placeholderTextColor={colors.textTertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}

        {onClear && props.value && (
          <Pressable onPress={onClear} style={styles.clearButton}>
            <Text style={{ color: colors.textSecondary }}>✕</Text>
          </Pressable>
        )}
      </View>

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.XS,
  },
  label: {
    fontSize: FONT_SIZE.SM,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    paddingHorizontal: SPACING.MD,
    gap: SPACING.SM,
  },
  input: {
    paddingVertical: SPACING.SM,
    fontSize: FONT_SIZE.MD,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    padding: SPACING.XS,
  },
  error: {
    fontSize: FONT_SIZE.XS,
  },
});
