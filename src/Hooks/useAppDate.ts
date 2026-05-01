import { getName, getVersion } from '@tauri-apps/api/app';
import { useEffect, useState } from 'react';

interface AppInfo {
  appname: string;
  appversion: string;
}

export const useAppDate = () => {
  const [appInfo, setAppInfo] = useState<AppInfo>({
    appname: '',
    appversion: '',
  });

  useEffect(() => {
    const loadAppInfo = async () => {
      try {
        const name = await getName();
        const version = await getVersion();
        setAppInfo({ appname: name, appversion: version });
      } catch (error) {
        console.error('Failed to load app info:', error);
      }
    };

    loadAppInfo();
  }, []);

  return appInfo;
};