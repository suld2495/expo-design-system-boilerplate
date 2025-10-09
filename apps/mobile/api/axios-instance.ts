import axios from 'axios';
import { ENV } from '../constants/env';

export const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (인증 토큰 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: AsyncStorage에서 토큰 가져오기
    // const token = await AsyncStorage.getItem('access_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 (에러 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러 시 로그아웃 처리 등
    if (error.response?.status === 401) {
      // TODO: 로그아웃 로직
      // AsyncStorage.removeItem('access_token');
      // navigation.navigate('Login');
    }
    return Promise.reject(error);
  },
);
