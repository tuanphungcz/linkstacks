import { PrimaryButton } from 'components/base/Button';
import Container from 'components/base/Container';
import Dropdown from 'components/Dropdown';
import { authenticate, userSession } from 'lib';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AppNavbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white">
      <Container>
        <div className="flex items-center justify-between w-full py-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="text-xl font-bold ">Linkstacks</div>
              <div className="ml-2 block rounded-full bg-gray-700 px-2 py-0.5 text-xs font-semibold text-white ">
                Beta 
              </div>
            </div>
          </Link>
          <div className="flex justify-center space-x-6 md:order-2">
            {mounted && userSession.isUserSignedIn() ? (
              <Dropdown />
            ) : (
              <PrimaryButton onClick={authenticate}>
                <div className="flex space-x-2 items-center">
                  <img src="/hiro.jpg" className="h-5 w-6" />
                  <div>Authenticate</div>
                </div>
              </PrimaryButton>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
