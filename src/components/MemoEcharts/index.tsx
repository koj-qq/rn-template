import React from 'react';
import { ECharts } from '../Echarts';
import { getChartHeight, BASE_LEGEND_ROW_NUMBER } from '../../utils/chart-option';
import { EChartOption } from '../../interfaces/common';

export interface MemoEchartsProps {
  option: EChartOption;
  rowNumber?: number;
  height?: number;
}

const MemoEcharts = ({ option, rowNumber = BASE_LEGEND_ROW_NUMBER, height }: MemoEchartsProps) => {
  return <ECharts option={option} height={height || getChartHeight(option, rowNumber)} />;
};

export default React.memo(MemoEcharts, (prev, next) => {
  const { option } = next;
  return JSON.stringify(option) === JSON.stringify(prev.option);
});
