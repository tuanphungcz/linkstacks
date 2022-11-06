import classnames from 'classnames';

export default function Card(props: any) {
  return (
    <div
      {...props}
      className={classnames(' bg-white w-full rounded-lg border border-gray-200 ')}
    />
  );
}
