import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useColors } from '../hooks/use-colors';
import { SPACING } from '../constants/spacing';

// UI 컴포넌트 import
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Paragraph } from '../components/ui/text';
import { Link } from '../components/ui/link';
import { Badge } from '../components/ui/badge';
import { Spinner } from '../components/ui/spinner';
import { Card } from '../components/ui/card';
import { Select, type SelectOption } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Switch } from '../components/ui/switch';

export default function DesignSystemShowcase() {
  const colors = useColors();

  // States
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);

  const selectOptions: SelectOption[] = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* 헤더 */}
      <View style={styles.section}>
        <Paragraph variant="h1" color="primary">
          디자인 시스템
        </Paragraph>
        <Paragraph variant="body" color="secondary" style={styles.subtitle}>
          모든 UI 컴포넌트 쇼케이스
        </Paragraph>
      </View>

      {/* Typography */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          📝 Typography
        </Paragraph>

        <View style={styles.group}>
          <Paragraph variant="h1">Heading 1</Paragraph>
          <Paragraph variant="h2">Heading 2</Paragraph>
          <Paragraph variant="h3">Heading 3</Paragraph>
          <Paragraph variant="body">Body Text</Paragraph>
          <Paragraph variant="caption" color="secondary">Caption Text</Paragraph>
          <Paragraph variant="label">Label Text</Paragraph>
        </View>

        <View style={styles.group}>
          <Paragraph weight="REGULAR">Regular Weight</Paragraph>
          <Paragraph weight="MEDIUM">Medium Weight</Paragraph>
          <Paragraph weight="SEMIBOLD">Semibold Weight</Paragraph>
          <Paragraph weight="BOLD">Bold Weight</Paragraph>
        </View>

        <View style={styles.group}>
          <Paragraph color="primary">Primary Color</Paragraph>
          <Paragraph color="secondary">Secondary Color</Paragraph>
          <Paragraph color="tertiary">Tertiary Color</Paragraph>
        </View>
      </Card>

      {/* Buttons */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          🔘 Buttons
        </Paragraph>

        <View style={styles.group}>
          <Paragraph variant="label" style={styles.groupLabel}>Variants</Paragraph>
          <Button variant="primary" onPress={() => Alert.alert('Primary')}>
            Primary Button
          </Button>
          <Button variant="secondary" onPress={() => Alert.alert('Secondary')}>
            Secondary Button
          </Button>
          <Button variant="outline" onPress={() => Alert.alert('Outline')}>
            Outline Button
          </Button>
          <Button variant="ghost" onPress={() => Alert.alert('Ghost')}>
            Ghost Button
          </Button>
        </View>

        <View style={styles.group}>
          <Paragraph variant="label" style={styles.groupLabel}>Sizes</Paragraph>
          <Button size="sm" onPress={() => Alert.alert('Small')}>
            Small Button
          </Button>
          <Button size="md" onPress={() => Alert.alert('Medium')}>
            Medium Button
          </Button>
          <Button size="lg" onPress={() => Alert.alert('Large')}>
            Large Button
          </Button>
        </View>

        <View style={styles.group}>
          <Paragraph variant="label" style={styles.groupLabel}>States</Paragraph>
          <Button disabled>Disabled Button</Button>
          <Button isLoading>Loading Button</Button>
        </View>
      </Card>

      {/* Inputs */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          ✏️ Inputs
        </Paragraph>

        <View style={styles.group}>
          <Input
            label="Basic Input"
            placeholder="Enter text..."
            value={inputValue}
            onChangeText={setInputValue}
          />

          <Input
            label="Input with Clear"
            placeholder="Enter text..."
            value={inputValue}
            onChangeText={setInputValue}
            onClear={() => setInputValue('')}
          />

          <Input
            label="Input with Error"
            placeholder="Enter email..."
            error="이메일 형식이 올바르지 않습니다"
          />

          <Input
            label="Disabled Input"
            placeholder="Disabled..."
            editable={false}
          />
        </View>
      </Card>

      {/* Links */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          🔗 Links
        </Paragraph>

        <View style={styles.group}>
          <Link onPress={() => Alert.alert('Link Clicked')}>
            Default Link
          </Link>
          <Link size="sm" onPress={() => Alert.alert('Small Link')}>
            Small Link
          </Link>
          <Link size="lg" onPress={() => Alert.alert('Large Link')}>
            Large Link
          </Link>
          <Link underline={false} onPress={() => Alert.alert('No Underline')}>
            No Underline Link
          </Link>
        </View>
      </Card>

      {/* Badges */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          🏷️ Badges
        </Paragraph>

        <View style={[styles.group, styles.row]}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </View>

        <View style={[styles.group, styles.row]}>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </View>
      </Card>

      {/* Spinner */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          ⏳ Spinner
        </Paragraph>

        <View style={[styles.group, styles.row]}>
          <Spinner size="small" />
          <Spinner size="large" />
        </View>
      </Card>

      {/* Cards */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          🃏 Cards
        </Paragraph>

        <View style={styles.group}>
          <Card variant="default">
            <Paragraph>Default Card</Paragraph>
          </Card>

          <Card variant="outlined">
            <Paragraph>Outlined Card</Paragraph>
          </Card>

          <Card variant="elevated">
            <Paragraph>Elevated Card</Paragraph>
          </Card>
        </View>
      </Card>

      {/* Select */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          📋 Select
        </Paragraph>

        <View style={styles.group}>
          <Select
            label="Select Option"
            placeholder="선택하세요"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
          />

          <Select
            label="Select with Error"
            placeholder="선택하세요"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            error="옵션을 선택해주세요"
          />
        </View>
      </Card>

      {/* Checkbox */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          ☑️ Checkbox
        </Paragraph>

        <View style={styles.group}>
          <Checkbox
            label="Checkbox with Label"
            checked={checkboxValue}
            onChange={setCheckboxValue}
          />

          <Checkbox
            checked={checkboxValue}
            onChange={setCheckboxValue}
          />

          <Checkbox
            label="Disabled Checkbox"
            checked={true}
            onChange={() => {}}
            disabled
          />
        </View>
      </Card>

      {/* Switch */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          🔀 Switch
        </Paragraph>

        <View style={styles.group}>
          <Switch
            label="Switch with Label"
            value={switchValue}
            onValueChange={setSwitchValue}
          />

          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
          />

          <Switch
            label="Disabled Switch"
            value={true}
            onValueChange={() => {}}
            disabled
          />
        </View>
      </Card>

      {/* Color Palette */}
      <Card style={styles.section}>
        <Paragraph variant="h2" style={styles.sectionTitle}>
          🎨 Color Palette
        </Paragraph>

        <View style={styles.group}>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.primary }]} />
            <Paragraph variant="caption">Primary</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.success }]} />
            <Paragraph variant="caption">Success</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.error }]} />
            <Paragraph variant="caption">Error</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.warning }]} />
            <Paragraph variant="caption">Warning</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.info }]} />
            <Paragraph variant="caption">Info</Paragraph>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border }]} />
            <Paragraph variant="caption">Background</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.backgroundSecondary }]} />
            <Paragraph variant="caption">Background Secondary</Paragraph>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.text }]} />
            <Paragraph variant="caption">Text</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.textSecondary }]} />
            <Paragraph variant="caption">Text Secondary</Paragraph>
          </View>

          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: colors.textTertiary }]} />
            <Paragraph variant="caption">Text Tertiary</Paragraph>
          </View>
        </View>
      </Card>

      {/* Footer */}
      <View style={styles.footer}>
        <Paragraph variant="caption" color="secondary">
          🎉 모든 컴포넌트가 정상 작동합니다!
        </Paragraph>
        <Paragraph variant="caption" color="tertiary">
          시스템 다크모드를 전환해보세요
        </Paragraph>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.LG,
    paddingBottom: SPACING.XXXL,
  },
  section: {
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    marginBottom: SPACING.LG,
  },
  subtitle: {
    marginTop: SPACING.XS,
  },
  group: {
    gap: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  groupLabel: {
    marginBottom: SPACING.XS,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.SM,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  footer: {
    alignItems: 'center',
    gap: SPACING.XS,
    marginTop: SPACING.XL,
  },
});
