import { StacksMainnet } from '@stacks/network';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';

const appConfig = new AppConfig(
  ['store_write', 'publish_data'],
  'https://linkstacks.vercel.app'
);

console.log('appConfig', appConfig);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'linkstacks.vercel.app',
      icon: window.location.origin + '/hiro.jpg'
    },
    redirectTo: '/edit',
    onFinish: () => {
      window.location.reload();
    },
    userSession
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return new Person(getUserData().profile);
}

export const network = new StacksMainnet();

export const fetchFirstName = async (
  address: string,
  network: any
): Promise<string | undefined> => {
  try {
    const namesResponse = await network.fetchFn(
      `${network.bnsLookupUrl}/v1/addresses/stacks/${address}`
    );
    const namesJson = await namesResponse.json();
    if ((namesJson.names.length || 0) > 0) {
      return namesJson.names[0];
    }
  } catch (e) {}
  return undefined;
};
