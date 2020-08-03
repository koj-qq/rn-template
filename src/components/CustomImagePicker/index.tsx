import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageSourcePropType, Image, ImageStyle } from 'react-native';
import { Options, Response } from './type';
import ImagePicker from 'react-native-image-picker';
import { Size } from '@/config';
import { getToken } from '@/utils/auth';
import { isIOS } from '@/config/size';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Toast, Portal } from '@ant-design/react-native';
import useToast from '@/hooks/useToast';
import { FILE_URL } from '@/common';

const { px } = Size;

interface CustomImagePickerProps {
  /** 初始化背景图 */
  imgSource?: ImageSourcePropType;
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  imgConfig?: Options;
  /** 悬浮文字 */
  title?: string;
  /** 取消事件回调 */
  onCancel?: (response: Response) => void;
  /** 失败事件回调 */
  onFailed?: (response: Response) => void;
  /** 成功事件回调,返回文件链接 */
  onSuccess?: (str: string) => void;
  /**图片样式 */
  style?: ImageStyle;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = props => {
  const { imgSource = require('@/assets/avatar.png'), imgConfig, onCancel, onFailed, onSuccess, style = {} } = props;

  const { toastFail, toastSuccess } = useToast();

  /** 初始化自定义配置 */
  const initialImageOptions: Options = {
    title: '选择图片',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: 'photo',
    chooseFromLibraryButtonTitle: '从手机相册选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '相机拍摄',
  };

  const imagePickerOptions = { ...initialImageOptions, ...imgConfig };
  const [currentImgSource, setCurrentImgSource] = useState<{ uri: string }>();

  /** 上传图片前进行相机权限检查 */
  const checkBeforeUpload = async () => {
    if (isIOS()) {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result !== RESULTS.GRANTED) {
        toastFail('请授予应用访问摄像头的权限');
      } else {
        handleUploadImage();
      }
    } else {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result !== RESULTS.GRANTED) {
        toastFail('请授予应用访问摄像头的权限');
      } else {
        handleUploadImage();
      }
    }
  };

  /** ImagePicker上传调用 */
  const handleUploadImage = () => {
    // eslint-disable-next-line complexity
    ImagePicker.showImagePicker(imagePickerOptions, async response => {
      if (response.didCancel) {
        // 用户取消上传 回调
        onCancel && onCancel(response);
      } else if (response.error) {
        // 上传失败 回调
        onFailed && onFailed(response);
      } else {
        const key = Toast.loading('上传中', 0, () => {}, true);
        try {
          const file = {
            fileName: response.fileName || 'image.jpg',
            fileType: response.type || 'image/jpeg',
            uri: response.uri,
          };
          // 上传成功 回调
          const uploadResult = await uploadFile(file);
          if (uploadResult.success) {
            toastSuccess('上传成功');
            setCurrentImgSource({ uri: uploadResult.data });
            onSuccess && onSuccess(uploadResult.data);
          } else {
            throw new Error('');
          }
        } catch (error) {
          toastFail('上传失败');
        } finally {
          Portal.remove(key);
        }
      }
    });
  };

  /** 上传文件 */
  const uploadFile = async ({ fileName, fileType, uri }: { fileName: string; fileType: string; uri: string }) => {
    const token = await getToken();
    const resultData = await RNFetchBlob.fetch(
      'POST',
      `${FILE_URL}/upload/public/head?access_token=${token}`,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      [
        {
          name: 'file',
          filename: fileName,
          type: fileType,
          data: RNFetchBlob.wrap(uri.replace('file://', '')),
        },
      ]
    );
    return resultData.json();
  };

  return (
    <TouchableOpacity onPress={checkBeforeUpload}>
      <Image source={currentImgSource || imgSource} style={[styles.backgroundImg, style]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: px(36),
    height: px(36),
    borderRadius: px(36),
  },
});

export default CustomImagePicker;
