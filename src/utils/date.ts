import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(utc);
dayjs.extend(relativeTime);

/**
 * 拟人化的时间显示。上午、下午、昨天、前天、3天前
 * @param time
 */
export function humanizeTime(time?: string | Date | Dayjs) {
  const dayjsTime = time ? dayjs(time) : dayjs();
  return dayjsTime.fromNow();
}

export function formatDate(time?: string | Date | Dayjs, format = 'YYYY-MM-DD HH:mm:ss') {
  if (time) {
    if (typeof time === 'string' && time.includes('+08:00')) {
      return dayjs.utc(time).format(format);
    }
    return dayjs(time).format(format);
  }
  return '-';
}
