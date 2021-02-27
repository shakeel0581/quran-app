import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { BANNER_ID } from "./ids";

export default function App() {
  return (
    <BannerAd
      unitId={BANNER_ID}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}