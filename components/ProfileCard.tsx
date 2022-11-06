import Card from 'components/base/Card';
import Socials from 'components/Socials';

export default function ProfileCard({ profile }: any) {
  return (
    <Card>
      <div className="p-8 flex flex-col justify-center items-center text-center max-w-md mx-auto">
        {profile?.profileImageUrl && (
          <img
            className="rounded-full object-cover shadow-lg w-24"
            src={profile.profileImageUrl}
            alt=""
          />
        )}
        <div className="text-2xl font-bold tracking-tight  text-zinc-800  my-2">
          {profile.title || 'My name'}
        </div>
        <div>
          <p className="text-blue-600 font-semibold">
            {profile.description || 'My description'}
          </p>
          <p className=" text-sm text-zinc-600 my-4">{profile.about || 'About me'}</p>
        </div>
        <Socials socialIcons={profile?.socials} />
      </div>
    </Card>
  );
}
