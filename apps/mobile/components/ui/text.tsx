import { Text as RNText, StyleSheet, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/spacing';

interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  weight?: keyof typeof FONT_WEIGHT;
  style?: TextStyle;
}

export const Paragraph = ({
  variant = 'body',
  color = 'primary',
  weight,
  children,
  style,
  ...props
}: TextProps) => {
  const colors = useColors();

  const getColor = () => {
    switch (color) {
      case 'primary':
        return colors.text;
      case 'secondary':
        return colors.textSecondary;
      case 'tertiary':
        return colors.textTertiary;
      case 'inverse':
        return colors.textInverse;
      default:
        return colors.text;
    }
  };

  return (
    <RNText
      style={[
        styles[variant],
        { color: getColor() },
        weight && { fontWeight: FONT_WEIGHT[weight] },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: FONT_SIZE.XXXL,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  h2: {
    fontSize: FONT_SIZE.XXL,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  h3: {
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
  },
  body: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.REGULAR,
  },
  caption: {
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.REGULAR,
  },
  label: {
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
});
