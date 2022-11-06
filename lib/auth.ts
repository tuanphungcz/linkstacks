import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
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

const mainnet = new StacksMainnet();
const testnet = new StacksTestnet();
const devnet = new StacksMocknet();

export const getNetworkConfig = () => {
  if (process.env.NEXT_PUBLIC_NETWORK === 'mainnet') {
    return {
      network: mainnet,
      explorerUrl: 'https://explorer.stacks.co',
      contractAddress: 'SP2PNJSEDHK8HZ0DE44JDT9T2Q429D86F4KJ9J5NM'
    };
  }

  if (process.env.NEXT_PUBLIC_NETWORK === 'testnet') {
    return {
      network: testnet,
      explorerUrl: 'https://explorer.stacks.co',
      contractAddress: 'ST2PNJSEDHK8HZ0DE44JDT9T2Q429D86F4J94JTQY'
    };
  }

  return {
    network: devnet,
    explorerUrl: 'http://localhost:8000',
    contractAddress: 'ST2PNJSEDHK8HZ0DE44JDT9T2Q429D86F4J94JTQY'
  };
};
