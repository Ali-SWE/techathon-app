import { useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync(); // Prevent auto-hide right away

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
      await SplashScreen.hideAsync(); // Then hide splash
      router.replace('/welcome'); // Go to welcome page
    };

    prepare();
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
}