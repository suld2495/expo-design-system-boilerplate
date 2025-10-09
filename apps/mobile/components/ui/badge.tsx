import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../../constants/spacing';

interface BadgeProps {
  children: string | number;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  style,
}: BadgeProps) => {
  const colors = useColors();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.success, text: colors.successText };
      case 'error':
        return { bg: colors.error, text: colors.errorText };
      case 'warning':
        return { bg: colors.warning, text: colors.warningText };
      case 'info':
        return { bg: colors.info, text: colors.infoText };
      default:
        return { bg: colors.backgroundSecondary, text: colors.text };
    }
  };

  const badgeColors = getColors();

  return (
    <View
      style={[
        styles.badge,
        styles[size],
        { backgroundColor: badgeColors.bg },
        style,
      ]}
    >
      <Text style={[
        styles.text,
        styles[`text_${size}`],
        { color: badgeColors.text }
      ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: BORDER_RADIUS.FULL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sm: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
  },
  text: {
    fontWeight: '500',
  },
  text_sm: {
    fontSize: FONT_SIZE.XS,
  },
  text_md: {
    fontSize: FONT_SIZE.SM,
  },
});
