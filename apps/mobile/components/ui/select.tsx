import { View, Text, Pressable, StyleSheet, Modal, FlatList, type ViewStyle } from 'react-native';
import { useState } from 'react';
import { useColors } from '../../hooks/use-colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE } from '../../constants/spacing';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  style?: ViewStyle;
}

export const Select = ({
  label,
  placeholder = '선택하세요',
  options,
  value,
  onChange,
  error,
  style,
}: SelectProps) => {
  const colors = useColors();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}

      <Pressable
        style={[
          styles.selectButton,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: error ? colors.error : colors.border,
          },
          style,
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[
          styles.selectText,
          { color: selectedOption ? colors.text : colors.textTertiary }
        ]}>
          {selectedOption?.label || placeholder}
        </Text>
        <Text style={{ color: colors.textSecondary }}>▼</Text>
      </Pressable>

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.option,
                    { backgroundColor: item.value === value ? colors.backgroundSecondary : 'transparent' }
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    { color: item.value === value ? colors.primary : colors.text }
                  ]}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
  },
  selectText: {
    fontSize: FONT_SIZE.MD,
  },
  error: {
    fontSize: FONT_SIZE.XS,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: BORDER_RADIUS.LG,
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
  },
  optionText: {
    fontSize: FONT_SIZE.MD,
  },
});
