export interface GeoPosition {
  coords: GeoCoords;
}
export interface GeoCoords {
  longitude: number;
  latitude: number;
}
export interface AmapConvertResult {
  status: '0' | '1';
  locations: string;
}
export interface AmapRegeoResult {
  status: '0' | '1';
  regeocode: {
    formatted_address: string;
    addressComponent: {
      country: string;
      province: string[] | string;
      city: string[] | string;
      district: string;
    };
  };
}
