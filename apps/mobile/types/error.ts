// 백엔드 에러 응답 타입
export interface BackendErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  code?: string;
}

// 프론트엔드 에러 코드
export type ErrorCode =
  // 네트워크 에러
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'

  // 인증 에러
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'TOKEN_EXPIRED'

  // 클라이언트 에러
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'

  // 서버 에러
  | 'SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'

  // 알 수 없는 에러
  | 'UNKNOWN_ERROR';

// 프론트엔드 통합 에러 클래스
export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// HTTP 상태 코드별 에러
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

// API 에러 (백엔드 응답)
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
