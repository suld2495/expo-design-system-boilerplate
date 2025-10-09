// setup.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎨 Expo 디자인 시스템 설치 중...\n');

// apps/mobile 존재 확인
if (!fs.existsSync('apps/mobile')) {
  console.error('❌ apps/mobile 디렉토리가 없습니다');
  console.error('프로젝트 루트에서 실행해주세요');
  process.exit(1);
}

const REPO_URL = 'https://github.com/suld2495/expo-design-system-boilerplate';
const ARCHIVE_URL = `${REPO_URL}/archive/refs/heads/main.tar.gz`;

console.log('📦 보일러플레이트 다운로드 중...');

try {
  // 1. GitHub archive 다운로드
  execSync(`curl -L ${ARCHIVE_URL} -o temp.tar.gz`, { stdio: 'inherit' });
  
  // 2. 압축 해제 (GitHub이 자동으로 expo-design-system-boilerplate-main/ 폴더 생성)
  execSync(`tar -xzf temp.tar.gz`, { stdio: 'inherit' });
  
  // 3. GitHub이 만든 폴더명
  const tempDir = 'expo-design-system-boilerplate-main';  // 
  
  console.log('📋 파일 복사 중...');
  
  // 4. 해당 폴더 안의 apps/mobile에서 복사
  const folders = ['app', 'components', 'hooks', 'lib', 'constants', 'types'];
  folders.forEach(folder => {
    const src = path.join(tempDir, 'apps', 'mobile', folder);
    const dest = path.join('apps', 'mobile', folder);
    if (fs.existsSync(src)) {
      execSync(`cp -r "${src}" "${dest}"`, { stdio: 'inherit' });
    }
  });
  
  // 파일 복사
  const files = ['jest.config.js', 'jest.setup.js'];
  files.forEach(file => {
    const src = path.join(tempDir, 'apps', 'mobile', file);
    const dest = path.join('apps', 'mobile', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });
  
  // 5. 임시 폴더 정리
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.unlinkSync('temp.tar.gz');
  
  console.log('\n✅ 설치 완료!\n');
  console.log('📝 다음 단계:');
  console.log('  cd apps/mobile');
  console.log('  pnpm add @tanstack/react-query axios expo-router');
  console.log('  pnpm start\n');
  
} catch (error) {
  console.error('❌ 설치 실패:', error.message);
  process.exit(1);
}