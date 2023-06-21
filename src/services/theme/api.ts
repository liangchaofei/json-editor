// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取主题变量接口 POST /api/theme/json */
export async function getThemeJson(body: API.ThemeReq, options?: { [key: string]: any }) {
  return request('/api/theme/json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
