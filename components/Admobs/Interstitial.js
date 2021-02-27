import React, { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
import { INTERSTITIAL_ID } from "./ids";

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function App(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
        setLoaded(false);
        interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
              setLoaded(true);
            }
          });
          interstitial.load();
      });
      return unsubscribe;
  }, [props.navigation]);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  try {
    interstitial.show();
  } catch (error) {
      
  }
  return null;
}