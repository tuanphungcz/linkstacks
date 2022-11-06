import { userSession } from './auth';
import { Storage } from '@stacks/storage';

const storage = new Storage({ userSession });

const PROFILE_FILENAME = 'profile.json';

export const saveProfile = async profile => {
  return await storage.putFile(
    PROFILE_FILENAME,
    JSON.stringify({ profile, isPublic: true }),
    {
      encrypt: false,
      dangerouslyIgnoreEtag: true
    }
  );
};

export const fetchProfile = async (username: any) => {
  try {
    const profileJson: any = await storage.getFile(PROFILE_FILENAME, {
      decrypt: false,
      username: username || undefined,
      app: 'https://linkstacks.xyz',
      verify: false
    });

    if (profileJson) {
      const json = JSON.parse(profileJson);
      return {
        profile: json?.profile
      };
    }
    return {
      profile: null
    };
  } catch (e) {
    console.log('refetch with old domain https://linkstacks.vercel.app');
    const profileJson: any = await storage.getFile(PROFILE_FILENAME, {
      decrypt: false,
      username: username || undefined,
      app: 'https://linkstacks.vercel.app',
      verify: false
    });

    if (profileJson) {
      const json = JSON.parse(profileJson);
      console.log('profileJson', json);
      return {
        profile: json?.profile
      };
    }
    return {
      profile: null
    };
  }
};
