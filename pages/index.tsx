import { useState, useEffect } from 'react';
import { openContractCall } from '@stacks/connect';
import {
  uintCV,
  stringUtf8CV,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  callReadOnlyFunction
} from '@stacks/transactions';
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import ProfileCard from 'components/ProfileCard';
import Card from 'components/base/Card';
import { PrimaryButton } from 'components/base/Button';
import { Input, TextArea } from 'components/base/Form';
import NewTabLink from 'components/base/NewTabLink';
import Container from 'components/base/Container';
import { userSession, truncateUrl, useInterval } from 'lib';
import { IconExternalLink } from '@tabler/icons';
import toast from 'react-hot-toast';
import AppNavbar from 'components/AppNavbar';

const ONE_MILION = 1000000;

const coffeeContractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

const mainnet = new StacksMainnet();
const testnet = new StacksTestnet();
const mocknet = new StacksMocknet();

const EXPLORER_URL_TESTNET = 'https://explorer.stacks.co';
const EXPLORER_URL_LOCAL = 'http://localhost:8000';

const network = testnet;

export default function Coffee() {
  const [txs, setTxs] = useState([]);
  const [supporters, setSupporters] = useState(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(3);
  const [message, setMessage] = useState('');

  const handleMessageChange = e => setMessage(e.target.value);
  const handleNameChange = e => setName(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const functionArgs = [
      stringUtf8CV(message),
      stringUtf8CV(name),
      uintCV(price * ONE_MILION)
    ];

    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = price * ONE_MILION;
    const postConditions = [
      makeStandardSTXPostCondition(
        postConditionAddress,
        postConditionCode,
        postConditionAmount
      )
    ];

    const options = {
      contractAddress: coffeeContractAddress,
      contractName: 'coffee',
      functionName: 'buy-coffee',
      functionArgs,
      network,
      postConditions,
      appDetails,
      onFinish: data => {
        toast.success('Thank you for a coffee');
        setTxs([
          {
            id: data.txId,
            timestamp: null,
            sender: null,
            name,
            amount: price,
            message,
            txStatus: 'pending'
          },
          ...txs
        ]);
      }
    };

    await openContractCall(options);
  };

  // https://docs.hiro.so/api#tag/Accounts/operation/get_account_transactions

  const getMessage = async () => {
    const res = await fetch(
      `${network.coreApiUrl}/extended/v1/address/${coffeeContractAddress}.coffee/transactions`
    );

    console.log('fetching transactions ...');

    const result = await res.json();

    const mappedTxs = mapResultsFromTx(result.results);
    console.log(result.results);
    console.log(`fetched ${result.results.length} transactions`);
    setTxs(mappedTxs);

    console.log(`mapped ${mappedTxs.length} transactions`);

    const userAddress = userSession.loadUserData().profile.stxAddress.testnet;

    const counter: any = await callReadOnlyFunction({
      contractAddress: coffeeContractAddress,
      contractName: 'coffee',
      functionName: 'get-index',
      network,
      functionArgs: [],
      senderAddress: userAddress
    });

    const parsedValue = parseInt(counter?.value?.value);

    setSupporters(parsedValue);
  };

  useEffect(() => {
    getMessage();
  }, []);

  useInterval(getMessage, 60 * 1000);

  return (
    <>
      <AppNavbar />
      <Container>
        <div className="mx-auto mt-8">
          <div className="text-lg font-medium leading-6 text-gray-900 flex space-x-2">
            <div>Buy me a coffee app</div>
            <NewTabLink href={''}>
              <IconExternalLink />
            </NewTabLink>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            This is a fullstack demo buy me a coffee app to demonstrate XYZ
          </div>
        </div>
        <div className="md:flex gap-4 justify-center pt-8 max-w mb-16">
          <div className="flex flex-col gap-4">
            <ProfileCard profile={profile} />
            <Card>
              <div className="p-8">
                <div className="font-semibold text-base text-zinc-800">
                  Recent supporters {supporters && `(${supporters})`}
                </div>
                {txs?.map(tx => (
                  <div
                    key={tx.id}
                    className="flex border-b last:border-b-0 py-4 space-x-4 items-start"
                  >
                    <div className="text-4xl w-12 h-12 flex justify-center items-center">
                      {([1, 3, 5].includes(tx.amount) && '☕️') || '🔥'}
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div className=" text-sm text-zinc-600">
                          <span className="font-semibold">{tx?.name || 'Someone'}</span>{' '}
                          bought <span className="font-semibold">{tx.amount}</span>{' '}
                          coffee(s)
                        </div>
                        <NewTabLink
                          href={`${EXPLORER_URL_TESTNET}/txid/${tx.id}`}
                          className={`text-xs  hover:underline cursor-pointer ${
                            tx.txStatus === 'pending'
                              ? 'text-orange-500'
                              : 'text-zinc-600'
                          }`}
                        >
                          {tx.txStatus === 'success' ? '🚀' : '⌛'} {truncateUrl(tx.id)}
                        </NewTabLink>
                      </div>
                      <div className="text-xs mt-1 text-zinc-600">
                        {tx?.timestamp ? (
                          new Date(tx?.timestamp * 1000).toLocaleString()
                        ) : (
                          <div className="text-orange-500">Transaction is pending</div>
                        )}
                      </div>
                      {tx?.message && (
                        <div className="border mt-4 border-blue-300 rounded w-fit bg-blue-50 px-4 py-2 text-sm text-zinc-600 flex space-x-2">
                          <span className="text-lg">💬</span> <span>{tx.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-4 sm:mt-0">
            <Card>
              <div className="p-8 items-center text-center mx-auto w-full">
                <div className="font-semibold text-lg mb-4 text-left">
                  Buy <span className="font-bold text-blue-500">Tuan</span> a stack coffee
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex space-x-4   items-center bg-blue-50 border-blue-200 border rounded p-4">
                    <div className="text-4xl">☕️</div>
                    <div className="text-xl text-blue-500 font-bold">x</div>

                    <SelectItem setPrice={setPrice} price={price} currentValue={1} />
                    <SelectItem setPrice={setPrice} price={price} currentValue={3} />
                    <SelectItem setPrice={setPrice} price={price} currentValue={5} />

                    <div className="w-10">
                      <Input type="number" value={price} onChange={handlePriceChange} />
                    </div>
                  </div>

                  <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name or @twitter (optional)"
                    label="Name"
                  />
                  <TextArea
                    value={message}
                    rows={6}
                    onChange={handleMessageChange}
                    placeholder="Thank you for the support. Feel free to leave a comment below. It could be anything – appreciation, information or even humor ... (optional)"
                    label="Message"
                  />
                  <PrimaryButton type="submit">Support with Ӿ{price}</PrimaryButton>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

const SelectItem = ({ price, currentValue, setPrice }) => (
  <div
    className={`font-semibold bg-white flex items-center  border justify-center w-8 h-8 rounded-full  cursor-pointer ${
      price == currentValue ? 'bg-blue-500 text-white' : 'text-blue-500 border-blue-100'
    }`}
    onClick={() => setPrice(currentValue)}
  >
    {currentValue}
  </div>
);

const profile = {
  title: 'Tuan Phung',
  description: 'Web3 developer',
  about:
    'I am a frontend developer, who is passionate about building web applications with React and Next.js',

  profileImageUrl:
    'https://pbs.twimg.com/profile_images/1546183184567648257/cl6cLtij_400x400.jpg',
  socials: {
    twitter: 'https://twitter.com/tuanphung_',
    github: 'https://github.com/tuanphungcz',
    website: 'https://phung.io/',
    linkedin: 'https://www.linkedin.com/in/tuanphungcz/'
  }
};

const appDetails = {
  name: 'Buy me a Coffee',
  icon: 'https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde2ae1fe3a1f_icon-isotipo.svg'
};

const mapResultsFromTx = results =>
  results
    .filter(
      tx =>
        tx.tx_type === 'contract_call' &&
        tx.contract_call.function_name === 'buy-coffee' &&
        tx.tx_status === 'success'
    )
    .map(tx => {
      const { function_args } = tx.contract_call;
      const name = function_args?.[1].repr.replace(`u"`, '').slice(0, -1);
      const amount = function_args?.[2].repr.replace(`u`, '');
      const message = function_args?.[0].repr.replace(`u"`, '').slice(0, -1);

      return {
        id: tx.tx_id,
        timestamp: tx.burn_block_time,
        name,
        amount: amount / ONE_MILION,
        message,
        senderAddress: tx.sender_address,
        txStatus: tx.tx_status
      };
    })
    .reverse();
