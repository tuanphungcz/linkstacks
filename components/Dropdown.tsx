import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import classnames from 'classnames';
import { IconChevronDown } from '@tabler/icons';
import { fetchFirstName, network, userSession, truncateUrl } from 'lib';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dropdown() {
  const { push } = useRouter();
  const [bns, setBns] = useState('');

  const { profile } = userSession.loadUserData();

  const address = profile?.stxAddress?.mainnet;

  fetchFirstName(address, network).then(data => {
    setBns(data);
  });

  return (
    <Menu as="div" className="relative inline-block text-left z-[50]">
      <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
        <div>{bns || truncateUrl(address) || 'Menu'}</div>
        <IconChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5  z-[50]">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  passHref
                  href="/edit"
                  className={classnames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <div
                  className={classnames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full text-left px-4 py-2 text-sm cursor-pointer'
                  )}
                  onClick={() => {
                    userSession.signUserOut();
                    push('/');
                  }}
                >
                  Logout
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
