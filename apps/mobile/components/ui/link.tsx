import { Text, Pressable, StyleSheet, Linking, type PressableProps, type TextStyle } from 'react-native';
import { useColors } from '../../hooks/use-colors';
import { FONT_SIZE } from '../../constants/spacing';

interface LinkProps extends Omit<PressableProps, 'style'> {
  href?: string;
  children: string;
  size?: 'sm' | 'md' | 'lg';
  underline?: boolean;
  style?: TextStyle;
}

export const Link = ({
  href,
  children,
  size = 'md',
  underline = true,
  onPress,
  style,
  ...props
}: LinkProps) => {
  const colors = useColors();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href);
    }
  };

  return (
    <Pressable onPress={handlePress} {...props}>
      {({ pressed }) => (
        <Text
          style={[
            styles[size],
            {
              color: colors.primary,
              textDecorationLine: underline ? 'underline' : 'none',
              opacity: pressed ? 0.7 : 1,
            },
            style,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sm: {
    fontSize: FONT_SIZE.SM,
  },
  md: {
    fontSize: FONT_SIZE.MD,
  },
  lg: {
    fontSize: FONT_SIZE.LG,
  },
});
