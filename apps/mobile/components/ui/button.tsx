import { Pressable, Text, StyleSheet, View, type PressableProps, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../constants/spacing';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  style?: ViewStyle;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const colors = useColors();

  const getBackgroundColor = () => {
    if (disabled) return colors.backgroundSecondary;

    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.backgroundSecondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textTertiary;

    switch (variant) {
      case 'primary':
        return colors.primaryText;
      case 'secondary':
      case 'outline':
      case 'ghost':
        return colors.text;
      default:
        return colors.primaryText;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[size],
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? colors.border : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: pressed && !disabled ? 0.8 : 1,
        },
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      <View style={styles.content}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <Text style={[
          styles.text,
          styles[`text_${size}`],
          { color: getTextColor() }
        ]}>
          {isLoading ? '로딩중...' : children}
        </Text>
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sm: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
  },
  md: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
  },
  lg: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.LG,
  },
  text: {
    fontWeight: FONT_WEIGHT.SEMIBOLD,
  },
  text_sm: {
    fontSize: FONT_SIZE.SM,
  },
  text_md: {
    fontSize: FONT_SIZE.MD,
  },
  text_lg: {
    fontSize: FONT_SIZE.LG,
  },
});
