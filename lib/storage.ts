import { userSession } from './auth';
import { Storage } from '@stacks/storage';

const storage = new Storage({ userSession });

const PROFILE_FILENAME = 'profile.json';

/**
 * @typedef {Object} Task
 * @property {boolean} complete
 * @property {string} value
 * @property {string} id
 */

/**
 * Save tasks to Gaia
 * @param {Todo[]} tasks
 * @param {boolean} isPublic
 */
export const saveTasks = async profile => {
  return await storage.putFile(
    PROFILE_FILENAME,
    JSON.stringify({ profile, isPublic: true }),
    {
      encrypt: false,
      dangerouslyIgnoreEtag: true
    }
  );
};

export const fetchTasks = async (username: any) => {
  console.log('fetch username', username);

  // const files: Promise<string | undefined | ArrayBuffer | null>[] = [];

  // const options = { decrypt: false, app: 'https://linkstacks.vercel.app' };
  // await storage.listFiles((filename: string) => {
  //   if (filename) {
  //     console.log('filename', filename);
  //     files.push(storage.getFile(filename, options));
  //     // return false to stop iterating through files
  //     return false;
  //   } else {
  //     // return true to continue iterating
  //     return true;
  //   }
  // });
  // const fileContents = await Promise.all(files);

  // console.log('daaaaaaa fileContents:', fileContents);
  try {
    /** @type {string} raw JSON stored in Gaia */
    const tasksJSON: any = await storage.getFile(PROFILE_FILENAME, {
      decrypt: false,
      username: username || undefined,
      app: 'https://linkstacks.vercel.app',
      verify: false
    });

    if (tasksJSON) {
      const json = JSON.parse(tasksJSON);
      console.log('tasksJSON', json);
      return {
        profile: json.profile
      };
    }
    return {
      profile: null
    };
  } catch (error) {
    console.log('error', error);
    return {
      profile: null
    };
  }
};
