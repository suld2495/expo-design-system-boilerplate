import type { ErrorCode } from '../types/error';

export const errorMessages: Record<ErrorCode, string> = {
  // 네트워크
  NETWORK_ERROR: '네트워크 연결을 확인해주세요',
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다',

  // 인증
  UNAUTHORIZED: '로그인이 필요합니다',
  FORBIDDEN: '접근 권한이 없습니다',
  TOKEN_EXPIRED: '로그인이 만료되었습니다',

  // 클라이언트
  VALIDATION_ERROR: '입력값을 확인해주세요',
  NOT_FOUND: '요청한 정보를 찾을 수 없습니다',
  BAD_REQUEST: '잘못된 요청입니다',

  // 서버
  SERVER_ERROR: '서버 오류가 발생했습니다',
  SERVICE_UNAVAILABLE: '서비스를 일시적으로 사용할 수 없습니다',

  // 기타
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다',
};
