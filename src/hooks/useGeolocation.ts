import { useState, useEffect } from 'react';
import { isIOS } from '@/config/size';
import { request as permissionRequest, PERMISSIONS } from 'react-native-permissions';
import { GeoPosition, AmapConvertResult, AmapRegeoResult } from '@/interfaces/geo';
import { extend } from 'umi-request';

export const GAODE_HTTP_KEY = '5f38b4db4c4dc4237b815e211bdf80bb';

export default function useGeolocation() {
  const [currentCity, setCurrentCity] = useState('');

  /**请求位置信息，然后调用高德api逆地址编码获取到城市 */
  useEffect(() => {
    (async () => {
      if (isIOS()) {
        getPosition();
      } else {
        const result = await permissionRequest(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === 'granted') {
          getPosition();
        }
      }
    })();
  }, []);

  const getPosition = () => {
    const request = extend({
      useCache: false,
      ttl: 60000,
    });
    navigator.geolocation.getCurrentPosition(
      async ({ coords }: GeoPosition) => {
        try {
          const convertResult: AmapConvertResult = await request(
            `https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${coords.longitude},${coords.latitude}&coordsys=gps&output=json&key=${GAODE_HTTP_KEY}`,
            { method: 'GET' }
          );
          if (convertResult.status === '1') {
            const regeoResult: AmapRegeoResult = await request(
              `http://restapi.amap.com/v3/geocode/regeo?key=${GAODE_HTTP_KEY}&location=${convertResult.locations}&radius=1000&extensions=all&batch=false&roadlevel=0`,
              { method: 'GET' }
            );
            if (regeoResult.status === '1') {
              const {
                addressComponent: { city },
              } = regeoResult.regeocode;
              setCurrentCity(city as string);
            }
          }
        } catch (error) {
          setCurrentCity('');
        }
      },
      (error: Error) => {
        console.log(error);
      }
    );
  };

  return {
    city: currentCity,
  };
}
