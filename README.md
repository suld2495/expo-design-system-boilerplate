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

### 방법2. setup.sh 스크립트 추가
```bash
#!/bin/bash
# setup.sh - 기존 프로젝트에 디자인 시스템 추가

echo "🎨 Expo 디자인 시스템 설치 중..."
echo ""

# apps/mobile 존재 확인
if [ ! -d "apps/mobile" ]; then
  echo "❌ apps/mobile 디렉토리가 없습니다"
  echo "프로젝트 루트에서 실행해주세요"
  exit 1
fi

# 보일러플레이트 다운로드
echo "📦 보일러플레이트 다운로드 중..."
curl -L https://github.com/username/expo-design-system-boilerplate/archive/main.tar.gz -o temp.tar.gz
tar -xzf temp.tar.gz

# 파일 복사
echo "📋 파일 복사 중..."
cp -r expo-design-system-boilerplate-main/apps/mobile/app apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/components apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/hooks apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/lib apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/constants apps/mobile/
cp -r expo-design-system-boilerplate-main/apps/mobile/types apps/mobile/
cp expo-design-system-boilerplate-main/apps/mobile/jest.config.js apps/mobile/
cp expo-design-system-boilerplate-main/apps/mobile/jest.setup.js apps/mobile/

# 정리
rm -rf expo-design-system-boilerplate-main temp.tar.gz

echo ""
echo "✅ 설치 완료!"
echo ""
echo "📝 다음 단계:"
echo "  cd apps/mobile"
echo "  pnpm add @tanstack/react-query axios expo-router"
echo "  pnpm add -D jest @testing-library/react-native"
echo "  pnpm start"
echo ""
```