import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ViewStyle,
  ScrollView,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import { Size } from '@/config';
import { FOOTER_TIPS } from '@/common';
import { SwipeListView, RowMap } from 'react-native-swipe-list-view';

export const RefreshState = {
  /**加载成功 */
  Idle: 0,
  /**开始下拉刷新 */
  HeaderRefreshing: 1,
  /**开始上拉翻页 */
  FooterRefreshing: 2,
  /**已加载全部数据 */
  NoMoreData: 3,
  /**加载失败 */
  Failure: 4,
  /**没有数据 */
  EmptyData: 5,
};

interface Props<T> {
  refreshState: number;
  onHeaderRefresh: (state: number) => void;
  onFooterRefresh?: (state: number) => void;
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  footerRefreshingText?: string;
  footerFailureText?: string;
  footerNoMoreDataText?: string;
  footerEmptyDataText?: string;
  renderItem: (rowData: ListRenderItemInfo<T>, rowMap: RowMap<T>) => JSX.Element | null;
  renderHiddenItem?: (rowData: ListRenderItemInfo<T>, rowMap: RowMap<T>) => JSX.Element;
  style?: ViewStyle;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

class RefreshListView<T> extends PureComponent<Props<T>> {
  private onHeaderRefresh = () => {
    if (this.shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  };

  private onEndReached = () => {
    if (this.shouldStartFooterRefreshing()) {
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  };

  private shouldStartHeaderRefreshing = () => {
    if (
      this.props.refreshState === RefreshState.HeaderRefreshing ||
      this.props.refreshState === RefreshState.FooterRefreshing
    ) {
      return false;
    }

    return true;
  };

  private shouldStartFooterRefreshing = () => {
    const { refreshState, data = [] } = this.props;
    if (data.length === 0) {
      return false;
    }

    return refreshState === RefreshState.Idle;
  };

  public render() {
    const { renderItem, renderHiddenItem, style, refreshState, keyExtractor, data = [], ...rest } = this.props;
    if (data.length === 0 && refreshState === RefreshState.Idle) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshState === RefreshState.HeaderRefreshing}
              onRefresh={this.onHeaderRefresh}
            />
          }
        >
          <Text>暂无数据</Text>
        </ScrollView>
      );
    }
    return (
      <SwipeListView
        useFlatList
        style={style}
        keyExtractor={keyExtractor}
        onEndReached={this.onEndReached}
        onRefresh={this.onHeaderRefresh}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        data={data}
        {...rest}
      />
    );
  }

  // eslint-disable-next-line complexity
  private renderFooter = () => {
    let footer: React.ComponentType | React.ReactElement | null = null;

    const {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,
      refreshState,
      data = [],
    } = this.props;

    switch (refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (data.length === 0) {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
              } else {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }
            }}
          >
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>{footerFailureText || FOOTER_TIPS.footerFailureText}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            }}
          >
            <View style={styles.emptyFooter}>
              <Image
                style={{
                  width: Size.px(140),
                  height: Size.px(140),
                  marginBottom: Size.px(10),
                }}
                source={require('@/assets/pic_empty.png')}
                resizeMode="contain"
              />
              <Text style={styles.footerText}>{footerEmptyDataText || FOOTER_TIPS.footerEmptyDataText}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, { marginLeft: 7 }]}>
              {footerRefreshingText || FOOTER_TIPS.footerRefreshingText}
            </Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer = (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText || FOOTER_TIPS.footerNoMoreDataText}</Text>
          </View>
        );
        break;
      }
    }

    return footer;
  };
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.px(10),
  },
  footerText: {
    fontSize: Size.px(12),
    color: 'rgba(0, 0, 0, 0.2)',
  },
  emptyFooter: {
    flex: 1,
    height: Size.px(300),
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.px(10),
  },
});

export default RefreshListView;
