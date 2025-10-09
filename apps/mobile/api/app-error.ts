import { AppError, ApiError, HttpError, type ErrorCode, type BackendErrorResponse } from '../types/error';
import { errorMessages } from './error-messages';
import { AxiosError } from 'axios';

// HTTP 상태 코드 → ErrorCode 매핑
function getErrorCodeFromStatus(statusCode: number): ErrorCode {
  if (statusCode === 401) return 'UNAUTHORIZED';
  if (statusCode === 403) return 'FORBIDDEN';
  if (statusCode === 404) return 'NOT_FOUND';
  if (statusCode === 400) return 'BAD_REQUEST';
  if (statusCode >= 500) return 'SERVER_ERROR';
  return 'UNKNOWN_ERROR';
}

// 백엔드 에러 코드 → ErrorCode 매핑
function mapBackendErrorCode(backendCode?: string): ErrorCode | null {
  if (!backendCode) return null;

  const mapping: Record<string, ErrorCode> = {
    'TOKEN_EXPIRED': 'TOKEN_EXPIRED',
    'VALIDATION_ERROR': 'VALIDATION_ERROR',
    'UNAUTHORIZED': 'UNAUTHORIZED',
    'FORBIDDEN': 'FORBIDDEN',
    'NOT_FOUND': 'NOT_FOUND',
  };

  return mapping[backendCode] || null;
}

// 모든 에러를 AppError로 변환
export function toAppError(error: unknown): AppError {
  // 이미 AppError인 경우
  if (error instanceof AppError) {
    return error;
  }

  // Axios 에러
  if (error instanceof AxiosError) {
    // 네트워크 에러 (서버 응답 없음)
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return new AppError(
          'TIMEOUT_ERROR',
          errorMessages.TIMEOUT_ERROR,
          undefined,
          error,
        );
      }
      return new AppError(
        'NETWORK_ERROR',
        errorMessages.NETWORK_ERROR,
        undefined,
        error,
      );
    }

    // 서버 응답이 있는 경우
    const statusCode = error.response.status;
    const data = error.response.data as BackendErrorResponse;

    // 백엔드 에러 코드 우선 사용
    const errorCode = mapBackendErrorCode(data.code) || getErrorCodeFromStatus(statusCode);

    // 백엔드 메시지 우선, 없으면 매핑된 메시지
    const message = data.message || errorMessages[errorCode];

    return new AppError(
      errorCode,
      message,
      statusCode,
      error,
    );
  }

  // ApiError
  if (error instanceof ApiError) {
    const errorCode = mapBackendErrorCode(error.code) || getErrorCodeFromStatus(error.statusCode);
    return new AppError(
      errorCode,
      error.message,
      error.statusCode,
      error,
    );
  }

  // HttpError
  if (error instanceof HttpError) {
    const errorCode = getErrorCodeFromStatus(error.statusCode);
    return new AppError(
      errorCode,
      error.message,
      error.statusCode,
      error,
    );
  }

  // 일반 Error
  if (error instanceof Error) {
    return new AppError(
      'UNKNOWN_ERROR',
      error.message || errorMessages.UNKNOWN_ERROR,
      undefined,
      error,
    );
  }

  // 알 수 없는 타입
  return new AppError(
    'UNKNOWN_ERROR',
    errorMessages.UNKNOWN_ERROR,
    undefined,
    error,
  );
}
