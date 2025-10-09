import { COLORS } from '../constants/colors';
import { useTheme } from './use-theme';

export const useColors = () => {
  const theme = useTheme();
  return COLORS[theme];
};
