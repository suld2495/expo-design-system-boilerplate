// setup.js - 파일 잠금 문제 해결
const https = require('https');
const http = require('http');
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

// 재귀적 폴더 복사 함수
function copyFolderSync(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Node.js로 파일 다운로드 (파일 핸들 제대로 닫기)
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      // 리다이렉트 처리
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`다운로드 실패: ${response.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(dest);
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close(() => {
          // 파일 핸들이 완전히 닫힌 후 resolve
          setTimeout(resolve, 100); // Windows 파일 시스템을 위한 작은 지연
        });
      });
      
      file.on('error', (err) => {
        file.close(() => {
          fs.unlink(dest, () => {});
        });
        reject(err);
      });
    });
    
    request.on('error', (err) => {
      reject(err);
    });
  });
}

// OS별 압축 해제
function extractZip(zipPath) {
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    // Windows: PowerShell 사용
    execSync(`powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '.' -Force"`, { 
      stdio: 'inherit' 
    });
  } else {
    // Mac/Linux: unzip 사용
    execSync(`unzip -q -o '${zipPath}'`, { 
      stdio: 'inherit' 
    });
  }
}

const REPO_URL = 'https://github.com/suld2495/expo-design-system-boilerplate';
const ARCHIVE_URL = `${REPO_URL}/archive/refs/heads/main.zip`;

async function install() {
  let success = false;

  try {
    // 1. ZIP 파일 다운로드
    console.log('📦 보일러플레이트 다운로드 중...');
    await downloadFile(ARCHIVE_URL, 'temp.zip');
    console.log('  ✓ 다운로드 완료');
    
    // 2. 다운로드 후 조금 대기 (Windows 파일 시스템)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 3. ZIP 압축 해제
    console.log('📂 압축 해제 중...');
    extractZip('temp.zip');
    console.log('  ✓ 압축 해제 완료');
    
    // 4. 폴더명
    const tempDir = 'expo-design-system-boilerplate-main';
    
    console.log('📋 파일 복사 중...');
    
    // 5. 폴더 복사
    const folders = ['app', 'components', 'hooks', 'lib', 'constants', 'types'];
    folders.forEach(folder => {
      const src = path.join(tempDir, 'apps', 'mobile', folder);
      const dest = path.join('apps', 'mobile', folder);
      if (fs.existsSync(src)) {
        copyFolderSync(src, dest);
        console.log(`  ✓ ${folder} 복사 완료`);
      }
    });
    
    // 6. 파일 복사
    const files = ['jest.config.js', 'jest.setup.js'];
    files.forEach(file => {
      const src = path.join(tempDir, 'apps', 'mobile', file);
      const dest = path.join('apps', 'mobile', file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`  ✓ ${file} 복사 완료`);
      }
    });
    
    // 7. 임시 파일 정리
    console.log('🧹 정리 중...');
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.unlinkSync('temp.zip');
    
    console.log('\n✅ 설치 완료!\n');
    console.log('📝 다음 단계:');
    
    if (process.platform === 'win32') {
      console.log('  cd apps\\mobile');
    } else {
      console.log('  cd apps/mobile');
    }
    
    console.log('  pnpm add @tanstack/react-query axios');
    console.log('  pnpm add -D jest @testing-library/react-native @testing-library/jest-native jest-expo');
    console.log('  pnpm start\n');
    
    success = true;
  } catch (error) {
    console.error('❌ 설치 실패:', error.message);
    
    // 정리
    try {
      if (fs.existsSync('expo-design-system-boilerplate-main')) {
        fs.rmSync('expo-design-system-boilerplate-main', { recursive: true, force: true });
      }
      if (fs.existsSync('temp.zip')) {
        fs.unlinkSync('temp.zip');
      }
    } catch {}
  } finally {
    // 8. setup.js 자동 삭제
    console.log('🗑️  setup.js 삭제 중...');
    fs.unlinkSync(__filename); // 자기 자신을 삭제
    console.log('  ✓ setup.js 삭제 완료\n');

    process.exit(success ? 0 : 1);
  }
}

// 실행
install();