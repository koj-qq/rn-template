import echarts from 'echarts';

export const tuple = <T extends string[]>(...args: T) => args;
export interface Pagination<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}
export interface AjaxResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}
export interface AuthResponse<T> {
  code: number;
  msg: string;
  result: T;
  success: boolean;
}

// 与后台接口约定返回的配置项
export interface BaseChartOption {
  xAxis?: echarts.EChartOption.XAxis[];
  yAxis?: echarts.EChartOption.YAxis[];
  series: echarts.EChartOption.Series[];
}

export type EChartOption = Merge<
  echarts.EChartOption,
  { legend?: echarts.EChartOption.Legend | echarts.EChartOption.Legend[] }
>;

export interface SelectOption {
  label: string;
  value: number | string;
  [key: string]: unknown;
}

export type valueType = string | number;
