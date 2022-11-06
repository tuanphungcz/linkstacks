export default function Container({ children, small }: any) {
  return (
    <div className={`px-8 mx-auto md:px-8 ${small ? 'max-w-3xl' : 'max-w-4xl'}`}>
      {children}
    </div>
  );
}
