import { PrimaryButton } from 'components/base/Button';
import Container from 'components/base/Container';
import Dropdown from 'components/Dropdown';
import { authenticate, userSession } from 'lib/auth';
import Link from 'next/link';

export default function AppNavbar() {
  const userData = userSession?.isUserSignedIn();

  return (
    <div className="bg-white">
      <Container small>
        <div className="flex items-center justify-between w-full py-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="text-xl font-bold ">LinkStacks</div>
              <div className="ml-2 block rounded-full bg-gray-700 px-1.5 py-0.5 text-xs font-semibold text-white ">
                Beta
              </div>
            </div>
          </Link>
          <div className="flex justify-center space-x-6 md:order-2">
            {userData ? (
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
