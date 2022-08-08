import dynamic from 'next/dynamic';

const MyNotSsrComponent = dynamic(() => import('../components/EditForm'), {
  ssr: false
});

export default function Stacks() {
  return <MyNotSsrComponent />;
}
