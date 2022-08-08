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
  try {
    /** @type {string} raw JSON stored in Gaia */
    const tasksJSON: any = await storage.getFile(PROFILE_FILENAME, {
      decrypt: false,
      username: username || undefined
    });

    console.log('tasksJSON', tasksJSON);

    if (tasksJSON) {
      const json = JSON.parse(tasksJSON);
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
