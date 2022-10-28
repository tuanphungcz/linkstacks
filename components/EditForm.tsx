import { IconExternalLink } from '@tabler/icons';
import { PrimaryButton } from 'components/base/Button';
import Card from 'components/base/Card';
import { Input, TextArea } from 'components/base/Form';
import { useConfetti } from 'hooks/useConfetti';
import { fetchFirstName, network, userSession } from 'lib/auth';
import { fetchTasks, saveTasks } from 'lib/storage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Container from './base/Container';
import NewTabLink from './base/NewTabLink';
import ConfettiCanvas from './ConfettiCanvas';
import AppNavbar from './Navbar';
import ProfileCard from './ProfileCard';

const INITIAL_PROFILE = {
  title: '',
  description: '',
  about: '',
  socialIcons: {
    linkedin: '',
    github: '',
    twitter: '',
    website: ''
  }
};

export default function EditForm() {
  const [url, setUrl] = useState('');

  const { getInstance, fire } = useConfetti();
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  const { register, handleSubmit, watch, control, formState, reset } = useForm({
    defaultValues: profile
  });

  const submit = async values => {
    const res = await saveTasks(values);
    console.log('success', res);
    toast.success('Profile saved successfully');
    fire();
  };

  useEffect(() => {
    fetchTasks(null).then(data => {
      console.log('fetch data', data);
      setProfile(data.profile);
      reset(data.profile);
    });
  }, [reset]);

  useEffect(() => {
    const { profile } = userSession.loadUserData();

    const address = profile?.stxAddress?.mainnet;

    fetchFirstName(address, network).then(data => {
      setUrl(window.location.origin + '/' + data);
    });
  }, []);

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  const watchedValues = watch();

  return (
    <>
      <AppNavbar />
      <Container small>
        <div className=" space-y-8 pt-16 mb-32">
          <div className="mx-auto">
            <div className="text-lg font-medium leading-6 text-gray-900 flex space-x-2">
              <div>Profile preview</div>
              <NewTabLink href={url}>
                <IconExternalLink />
              </NewTabLink>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              This is how your profile will look like to others. You need to have an BNS
              name to use the public profile
            </div>
          </div>
          {watchedValues && <ProfileCard profile={watchedValues} />}

          <form onSubmit={handleSubmit(submit)} className="w-full space-y-8">
            <Card className="bg-white sm:rounded">
              <div className="p-8 border-b md:col-span-1">
                <div className="text-lg font-medium leading-6 text-gray-900">
                  Profile Information
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  This information will be displayed publicly
                </div>
              </div>
              <div className="p-8 mt-5 border-b md:mt-0 md:col-span-2 grid grid-1 grid-cols-2 gap-4">
                {defaultBaseInputs.map((input: any) => (
                  <input.component
                    {...input}
                    name={input.id}
                    register={register}
                    control={control}
                    key={input.id}
                    error={formState?.errors[input.id]}
                  />
                ))}
              </div>
              <div className="p-8 border-b md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Social links
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  You can add socials like LinkedIn, Github, Twitter, and your personal
                  website
                </p>
              </div>
              <div className="p-8 mt-5 border-b md:mt-0 md:col-span-2 grid grid-1 grid-cols-2 gap-4">
                {socialsInputs.map((input: any) => (
                  <input.component
                    {...input}
                    name={input.id}
                    register={register}
                    control={control}
                    key={input.id}
                    error={formState?.errors[input.id]}
                  />
                ))}
              </div>

              <div className="flex justify-end p-8 space-x-4">
                <ConfettiCanvas getInstance={getInstance} />
                <PrimaryButton type="submit">Update profile</PrimaryButton>
              </div>
            </Card>
          </form>
        </div>
      </Container>
    </>
  );
}

const defaultBaseInputs = [
  {
    id: 'title',
    label: 'Title',
    component: Input,
    placeholder: ''
  },
  {
    id: 'description',
    label: 'Description',
    component: Input,
    placeholder: ''
  },
  {
    id: 'about',
    label: 'About',
    component: TextArea,
    placeholder: ''
  },
  {
    id: 'profileImageUrl',
    label: 'Profile image url',
    component: Input,
    placeholder: ''
  }
];

const socialsInputs = [
  {
    id: 'socials.twitter',
    label: 'Twitter',
    component: Input,
    placeholder: ''
  },
  {
    id: 'socials.github',
    label: 'Github',
    component: Input,
    placeholder: ''
  },
  {
    id: 'socials.website',
    label: 'Website',
    component: Input,
    placeholder: ''
  },
  {
    id: 'socials.linkedin',
    label: 'Linkedin',
    component: Input,
    placeholder: ''
  }
];
