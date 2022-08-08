import dynamic from 'next/dynamic';

const MyNotSsrComponent = dynamic(() => import('../components/HeroLanding'), {
  ssr: false
});

export default function Stacks() {
  return <MyNotSsrComponent />;
}
