import echarts from 'echarts';
import { BaseChartOption, EChartOption } from '../interfaces/common';
import { isObject } from 'lodash';
import { chartColors } from './colors';
import { Size } from '../config';

// 图表初始化标准高度
const BASE_HEIGHT = 300;
// 一行图例的占高
const BASE_LEGEND_HEIGHT = 20;
// 一行图例的数量
export const BASE_LEGEND_ROW_NUMBER = 3;
// dataZoom 的高度
const DATA_ZOOM_HEIGHT = 70;
// grid bottom 默认底部边距
const GRID_BOTTOM_PADDING = 30;
// 基础间距
const BASE_PADDING = 5;

const BASE_LINE_COLOR = ['#335687', '#5CB45E', '#F8CA59', '#F89759', '#ED7794', '#685EA0'];

/** 基础折线图配置项 */
export const getBaseLineOption = (
  fetchOption: BaseChartOption,
  showDataZoom = true,
  rowNumber = BASE_LEGEND_ROW_NUMBER
) => {
  const { xAxis = [], yAxis = [], series = [] } = fetchOption || {};
  // 默认的color
  // 图例数量超过6个 使用生成的颜色
  const colors = getLegendData(series).length > 6 ? chartColors : BASE_LINE_COLOR;
  // x轴的通用默认配置
  const xAxisConfig: echarts.EChartOption.XAxis = {
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#bec0c1',
      fontSize: 14,
    },
  };

  // y轴的通用默认配置
  const yAxisConfig: echarts.EChartOption.YAxis = {
    splitLine: { show: true, lineStyle: { color: ['#f2f2f2'] } },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      color: '#bcbdbd',
    },
  };

  const option: EChartOption = {
    grid: {
      top: '5%',
      left: '10%',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: echarts.EChartOption.Tooltip.Format[] | echarts.EChartOption.Tooltip.Format) {
        if (!Array.isArray(params)) {
          return '';
        }
        const str = params.length > 0 ? `${params[0].axisValue}<br />` : '';
        return str + params.map(({ marker, seriesName, data }) => `${marker}${seriesName}：${data}`).join('<br />');
      },
      // 修复tooltip被遮挡问题
      confine: true,
      // 选中时的辅助线
      axisPointer: {
        type: 'line',
        lineStyle: {
          width: 30,
          opacity: 0.2,
        },
      },
    },
    legend: createLegendsFromSeries(series, rowNumber),
    xAxis: xAxis.map(data => {
      const config: echarts.EChartOption.XAxis = getXAxisFormatterConfig({ ...xAxisConfig, ...data });
      delete config.name;
      return config;
    }),
    yAxis: yAxis.map(data => getYAxisFormatterConfig({ ...yAxisConfig, ...data })),
    series,
    color: colors,
  };
  option.grid!['bottom'] = getGridBottom(option, showDataZoom, rowNumber);
  if (showDataZoom) {
    return {
      ...option,
      dataZoom: [
        {
          type: 'slider',
          bottom: getLegendHeight(option, rowNumber) + BASE_PADDING,
        },
        {
          type: 'inside',
        },
      ],
    };
  }
  return option;
};

/** 判断echarts是否是空数据 */
export const isOptionEmpty = (option: EChartOption) => !option || !option.series || option.series.length === 0;

/**
 * 根据配置项中是否有图例以及图例的个数返回自适应的高度
 * @param option echarts option
 */
export const getChartHeight = (option: EChartOption, rowNumber = BASE_LEGEND_ROW_NUMBER) => {
  const addZoomHeight = option.dataZoom ? DATA_ZOOM_HEIGHT : 0;
  const legendHeight = getLegendHeight(option, rowNumber);
  const addLegendHeight = legendHeight - BASE_LEGEND_HEIGHT - BASE_PADDING;
  const chartHeight = BASE_HEIGHT + (addLegendHeight < 0 ? 0 : addLegendHeight) + addZoomHeight;
  return chartHeight;
};

/**
 * 根据配置项中
 * 是否有图例以及图例的个数
 * 是否有zoom
 * 返回option grid的bottom值
 * @param option echarts option
 * @param showDataZoom 是否有zoom
 */
export const getGridBottom = (option: EChartOption, showDataZoom: boolean, rowNumber?: number) => {
  const { legend } = option;
  const addZoomHeight = showDataZoom ? DATA_ZOOM_HEIGHT : 0;
  // 不存在图例的情况
  if (isObject(legend) && (legend as echarts.EChartOption.Legend).show === false) {
    return addZoomHeight;
  }
  // 存在图例的情况
  // 图例占用高度
  const legendHeight = getLegendHeight(option, rowNumber);
  return (showDataZoom ? DATA_ZOOM_HEIGHT : GRID_BOTTOM_PADDING) + legendHeight;
};

/**
 * 获取图例占用的高度
 * @param option
 */
export const getLegendHeight = (option: EChartOption, rowNumber?: number) => {
  const { legend, series = [] } = option;
  // 不存在图例的情况
  if (isObject(legend) && (legend as echarts.EChartOption.Legend).show === false) {
    return 0;
  }
  const allLegendData: echarts.EChartOption.Legend.LegendDataObject[] = getLegendData(series);
  return getLegendHeightByData(allLegendData, rowNumber);
};

export const getLegendHeightByData = (
  data: echarts.EChartOption.Legend.LegendDataObject[],
  rowNumber = BASE_LEGEND_ROW_NUMBER
) => {
  const height = Math.ceil(data.length / rowNumber) * (BASE_LEGEND_HEIGHT + BASE_PADDING);
  return height;
};

/**
 * 从series中获取所有图例的data
 * @param series
 */
export const getLegendData = (series: echarts.EChartOption.Series[] = []) => {
  const allLegendData: echarts.EChartOption.Legend.LegendDataObject[] = [];
  series.forEach(item => {
    const data = (item['data'] || []) as Array<{ name: string }>;
    // 饼图的图例在series.data里面
    if (item.type === 'pie') {
      allLegendData.push(...data.map(item => ({ name: item.name, icon: 'circle' })));
    } else {
      allLegendData.push({ name: item['name'], icon: item.type === 'line' ? '' : 'circle' });
    }
  });
  return allLegendData;
};

/**
 * 从系列中创建多行图例
 */

const LEGEND_CONFIG = {
  1: {
    formatter: (name: string) => `{a| ${name}}`,
    width: Size.DEVICE_WIDTH,
    itemGap: 0,
    left: 'left',
  },
  2: {
    formatter: (name: string) => `{a| ${name.length > 12 ? name.substring(0, 12) + '...' : name}}`,
    width: Math.floor(Size.DEVICE_WIDTH / 2) - 40,
    itemGap: 25,
    left: 'center',
  },
  3: {
    formatter: (name: string) => `{a| ${name.length > 8 ? name.substring(0, 8) + '...' : name}}`,
    width: Math.floor(Size.DEVICE_WIDTH / 3) - 60,
    itemGap: 25,
    left: 'center',
  },
  4: {
    formatter: (name: string) => `{a| ${name.length > 4 ? name.substring(0, 4) + '...' : name}}`,
    width: Math.floor(Size.DEVICE_WIDTH / 4) - 80,
    itemGap: 25,
    left: 'center',
  },
};
export const createLegendsFromSeries = (series: echarts.EChartOption.Series[] = [], rowNumber: number) => {
  const legends: echarts.EChartOption.Legend[] = [];
  const allLegendData: echarts.EChartOption.Legend.LegendDataObject[] = getLegendData(series);
  const legendNumber = Math.ceil(allLegendData.length / rowNumber);
  const maxHeight = getLegendHeightByData(allLegendData, rowNumber);
  for (let i = 0; i < legendNumber; i++) {
    const legendData = allLegendData.slice(i * rowNumber, i * rowNumber + rowNumber);
    // 超过2行的图例 其他设置不选中
    // 这里会有一个问题，初始化的时候，设置了selected的图例，需要点2次才能切换初始化的状态
    // 目前这个问题处于open状态 https://github.com/apache/incubator-echarts/issues/5391
    // const selected = {};
    // if (i > 1) {
    //   legendData.forEach(({ name }) => {
    //     if (name) {
    //       selected[name] = false;
    //     }
    //   });
    // }
    const autoConfig = LEGEND_CONFIG[rowNumber];
    const config: echarts.EChartOption.Legend = {
      bottom: maxHeight - (i + 1) * BASE_LEGEND_HEIGHT - i * BASE_PADDING,
      left: autoConfig.left,
      orient: 'horizontal',
      data: legendData,
      formatter: (name: string) => `{a|${name}}`,
      itemGap: autoConfig.itemGap,
      itemWidth: 25,
      textStyle: {
        rich: {
          a: {
            color: '#848484',
            fontSize: 12,
            width: autoConfig.width || 60,
            height: BASE_LEGEND_HEIGHT,
          },
        },
      },
      itemHeight: BASE_LEGEND_HEIGHT,
    };
    legends.push(config);
  }
  return legends;
};

/**
 * 根据series数据判断是否存在对应的坐标轴
 * @param series
 * @param index 对应的yAxisIndex
 */
export const hasYAxis = (series: echarts.EChartOption.Series[] = [], index: number) =>
  series.findIndex(item => item['yAxisIndex'] === index) > -1;

/**
 * 对series里面的data进行格式化
 * @param series
 */
export const seriesFormat = (series: echarts.EChartOption.Series[]) => {
  const newSeries: echarts.EChartOption.Series[] = [];
  series.forEach(item => {
    const data = item['data'] || [];
    newSeries.push({
      ...item,
      data: data.map((valueItem: { value: number }) => {
        const valueStr = `${valueItem.value}`;
        if (Math.abs(valueItem.value) >= 10000) {
          return (valueItem.value / 10000).toFixed(0) + '万';
        }
        return {
          ...valueItem,
          valueFormat: `${valueStr}${valueItem['unit'] || ''}`,
        };
      }),
    });
  });
  return newSeries;
};

/**
 * 获取xAxis format后的config
 * @param config
 */
export const getXAxisFormatterConfig = (config: echarts.EChartOption.XAxis) => {
  if (config.type === 'value') {
    config.axisLabel!.formatter = function (value: number) {
      if (Math.abs(value) >= 10000) {
        return (value / 10000).toFixed(0) + '万';
      }
      return value;
    };
  }
  return config;
};

/**
 * 获取yAxis format后的config
 * @param config
 */
export const getYAxisFormatterConfig = (config: echarts.EChartOption.YAxis) => {
  if (config.type === 'value') {
    config.axisLabel!.formatter = function (value: number) {
      if (Math.abs(value) >= 10000) {
        return (value / 10000).toFixed(0) + '万';
      }
      return value;
    };
  }
  return config;
};

/** 获取基础趋势图的配置项（折线、柱图） */
// eslint-disable-next-line complexity
export const getBaseTrendOption = (fetchOption: BaseChartOption, showDataZoom = true, rowNumber?: number) => {
  const { xAxis = [], yAxis = [], series = [] } = fetchOption || {};
  const colors =
    getLegendData(series).length > 6
      ? chartColors
      : ['rgba(51,86,135,1)', 'rgba(127,149,180,1)', 'rgba(16,142,233,1)', 'rgba(16,142,2330.6)'];
  // series的通用默认配置
  const seriesConfig: object = {
    barMaxWidth: 30,
    barGap: 0,
    itemStyle: {
      normal: {
        // bar 上面两个圆角
        barBorderRadius: [5, 5, 0, 0],
      },
    },
    symbolSize: 8,
  };
  // x轴的通用默认配置
  const xAxisConfig: echarts.EChartOption.XAxis = {
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#bec0c1',
      fontSize: 14,
    },
  };

  // y轴的通用默认配置
  const yAxisConfig: echarts.EChartOption.YAxis = {
    splitLine: { show: true, lineStyle: { color: ['#f2f2f2'] } },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      color: '#bcbdbd',
    },
  };

  const option: EChartOption = {
    grid: {
      top: '10%',
      left: hasYAxis(series, 0) ? '15%' : 0,
      right: hasYAxis(series, 1) ? '10%' : '5%',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: echarts.EChartOption.Tooltip.Format[] | echarts.EChartOption.Tooltip.Format) {
        if (!Array.isArray(params)) {
          return '';
        }
        const str = params.length > 0 ? `${params[0].axisValue}<br />` : '';
        return (
          str + params.map(({ seriesName, data, marker }) => `${marker}${seriesName}：${data.value}`).join('<br />')
        );
      },
      // 修复tooltip被遮挡问题
      confine: true,
      // 选中时的辅助线
      axisPointer: {
        type: 'line',
        lineStyle: {
          width: 30,
          opacity: 0.2,
        },
      },
    },
    legend: createLegendsFromSeries(series, rowNumber || 3),
    xAxis: xAxis.map(data => {
      const config: echarts.EChartOption.XAxis = getXAxisFormatterConfig({ ...xAxisConfig, ...data });
      delete config.name;
      return config;
    }),
    yAxis: yAxis.map(data => getYAxisFormatterConfig({ ...yAxisConfig, ...data })),
    series: series.map(data => ({ ...seriesConfig, ...data })),
    color: colors,
  };
  option.grid!['bottom'] = getGridBottom(option, showDataZoom);
  if (showDataZoom) {
    return {
      ...option,
      dataZoom: [
        {
          type: 'slider',
          bottom: getLegendHeight(option) + BASE_PADDING,
        },

        {
          type: 'inside',
        },
      ],
    };
  }
  return option;
};
