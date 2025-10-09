# 🎨 Expo Design System Boilerplate

빠른 개발을 위한 Expo + React Native 보일러플레이트

## ✨ 포함된 기능

- ✅ **Expo Router** - 파일 기반 라우팅
- ✅ **다크모드** - 시스템 설정 자동 감지
- ✅ **디자인 시스템** - 10개 UI 컴포넌트
  - Button, Input, Paragraph, Link, Badge
  - Spinner, Card, Select, Checkbox, Switch
- ✅ **TanStack Query** - 서버 상태 관리
- ✅ **Axios + 에러 처리** - API 클라이언트
- ✅ **Jest** - 테스트 환경
- ✅ **TypeScript** - 타입 안전성

## 🚀 시작

### 방법1. 기존 프로젝트에 추가

- 해당 디자인 시스템은 빠른 프로젝트 시작이 아닌 디자인 시스템만을 제공한다.
- 기본 package.json 등을 제공하지 않기 때문에 기본 환경 셋팅이 완료 된 후 복사해서 사용해야한다.
- expo-router를 사용하는 것을 전제로 한다.

```bash

# 1. 기본 환경 셋팅

# 2. 디자인 시스템 추가
curl -L https://github.com/suld2495/expo-design-system-boilerplate/archive/main.tar.gz | tar -xz
cp -r expo-design-system-boilerplate-main/apps/mobile/app apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/components apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/hooks apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/lib apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/constants apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/types apps/mobile/
rm -rf expo-design-system-boilerplate-main

### 3. 의존성 설치
cd apps/mobile
pnpm add @tanstack/react-query axios
pnpm add -D jest @testing-library/react-native
```

### 방법2. setup.js 사용
```bash
curl -fsSL https://raw.githubusercontent.com/username/expo-design-system-boilerplate/main/setup.js -o setup.js
node setup.js
```