import { IconBrandGithub, IconExternalLink } from '@tabler/icons';
import { authenticate, userSession } from 'lib/auth';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton } from './base/Button';
import Container from './base/Container';
import NewTabLink from './base/NewTabLink';
import AppNavbar from './Navbar';

export default function HeroLanding() {
  return (
    <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto bg-white min-h-screen">
      <AppNavbar />
      <div className="sm:max-w-xl mt-20 mb-10 text-center mx-auto sm:px-0 px-2.5">
        <div className="flex items-center justify-center mx-auto">
          <NewTabLink
            className="flex items-center px-4 py-2 text-base rounded-full gap-x-2 bg-black/5 hover:bg-black/10"
            href="https://github.com/tuanphungcz/linkstacks"
          >
            <span className="p-1 text-xs text-white uppercase bg-black rounded-full">
              <IconBrandGithub className="w-4 h-4" />
            </span>{' '}
            Star on Github
          </NewTabLink>
        </div>

        <h1 className="mt-5 text-5xl font-extrabold leading-tight text-black sm:text-6xl sm:leading-tight font-display">
          Decentralized
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">
            Stacks Profile cards
          </span>
        </h1>
        <p className="mt-5 text-2xl text-gray-600">
          Create your own decentralized profile on Stacks blockchain with Gaia
        </p>
        <div className="flex mx-auto mt-10 space-x-4 max-w-fit">
          {/* <SignInButton /> */}
          {userSession.isUserSignedIn() ? (
            <Link href="/edit">
              <PrimaryButton>My profile</PrimaryButton>
            </Link>
          ) : (
            <PrimaryButton onClick={authenticate}>
              <div className="flex space-x-2 items-center">
                <img src="/hiro.jpg" className="h-5 w-6" />
                <div>Authenticate</div>
              </div>
            </PrimaryButton>
          )}

          <NewTabLink href={window.location.origin + '/phung.btc'}>
            <SecondaryButton>
              <div className="flex items-center space-x-2">
                <div>Demo profile</div>
                <IconExternalLink className="w-5" />
              </div>
              <div className="absolute top-0 flex w-3 h-3 -mt-1 -mr-1 -right-1">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
            </SecondaryButton>
          </NewTabLink>
        </div>
      </div>

      <div className='px-4 md:px-8 max-w-7xl mx-auto pb-32'>
        <div className="mt-24">
          <img src="/preview.png" className="rounded-xl" alt="hero" />
        </div>
      </div>
    </div>
  );
}
