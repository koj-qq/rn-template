import * as Sentry from '@sentry/react-native';

/**
 * 上报异常到Sentry
 * @param error 异常
 * @param tag 自定义标签
 * @param level 级别
 */
export default function sentryReport(error: any, tag: string, level: Sentry.Severity = Sentry.Severity.Error) {
  Sentry.withScope(scope => {
    scope.setTag('tag', tag);
    scope.setLevel(level);
    Sentry.captureException(error);
  });
}

export const Severity = Sentry.Severity;
