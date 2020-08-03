import { useState, useCallback } from 'react';
import { RefreshState } from '../components/RefreshListView';
import { isEmpty } from 'lodash-es';
import { Pagination } from '@/utils/types';
import { useRequest } from 'ahooks';
import useToast from './useToast';
import { EMPTY_PARAM_RESULT } from '@/common';

export function useRefresh<T>(serviceFunction: Function, params?: object) {
  const [refreshState, setRefreshState] = useState(RefreshState.HeaderRefreshing);
  const { toastFail } = useToast();

  const asyncFn = useCallback(
    (page = 1) => {
      if (!isEmpty(params)) {
        return serviceFunction({ ...params, page });
      }
      return Promise.resolve(EMPTY_PARAM_RESULT);
    },
    [serviceFunction, params]
  );

  const { data, reload, loadMore } = useRequest(
    (d: Pagination<T> | undefined) => asyncFn(d?.list.length ? d.page + 1 : 1),
    {
      loadMore: true,
      refreshDeps: [asyncFn],
      onSuccess: data => {
        const { total, page, pageSize } = data;
        if (total === 0) {
          setRefreshState(RefreshState.EmptyData);
        } else if (page * pageSize >= total) {
          setRefreshState(RefreshState.NoMoreData);
        } else {
          setRefreshState(RefreshState.Idle);
        }
      },
      onError: error => {
        setRefreshState(RefreshState.Failure);
        toastFail(error.message);
      },
    }
  );

  const { list = [] } = data || {};

  return {
    list,
    refreshState,
    setRefreshState,
    headerRefresh: reload,
    footerRefresh: loadMore,
  };
}
