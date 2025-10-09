import { View, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { SPACING, BORDER_RADIUS } from '../../constants/spacing';

interface CardProps extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  style?: ViewStyle;
}

export const Card = ({
  children,
  variant = 'outlined',
  style,
  ...props
}: CardProps) => {
  const colors = useColors();

  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
        };
      case 'elevated':
        return {
          backgroundColor: colors.background,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.backgroundSecondary,
        };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyle(),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.LG,
  },
});
