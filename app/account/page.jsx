'use client';
import { useRef, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, EyeOff, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/providers/UserProvider';
export default function Account() {
  const { data: session, loading: sessionLoading } = useSession();
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState('');
  const { userData, setUserData, userImage, setUserImage } = useUserContext();
  const [userLoading, setUserLoading] = useState(true);
  const [showAccountPassword, setShowAccountPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  let userid = session?.user?.id;
  useEffect(() => {
    if (session) {
      const id = session.user.id;
      fetch(`/api/user/${id}`)
        .then((res) => res.json())
        .then((user) => {
          setUserData({
            name: user.name || '',
            image: user.image || '',
            email: user.email || '',
            accountPassword: '',
            newPassword: '',
            bio: user.bio || '',
            passwordAvailable: user.passwordAvailable,
            role: user.role,
          });
          setUserLoading(false);
          setUserImage(user.image);
        })
        .catch((error) => {
          console.error('Error:', error);
          setUserLoading(false);
        });
    }
  }, [session, setUserData, setUserImage]);

  if (sessionLoading || !session || userLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex min-h-[90vh] flex-col rounded-xl">
          <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
            <div className="flex justify-center">
              <div
                className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleImageClick = () => {
    uploadRef.current.click();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    let { name, accountPassword, newPassword, bio } = userData;

    if (name.trim() === '') {
      setLoading(false);
      return toast.error("Name can't be empty");
    } else if (name.trim().length < 3) {
      setLoading(false);
      return toast.error('Name must be at least 3 characters');
    } else if (name.trim().length > 50) {
      setLoading(false);
      return toast.error("Name can't be more than 50 characters");
    }

    if (newPassword) {
      if (accountPassword.trim() === '') {
        setLoading(false);
        return toast.error('Current password is required');
      } else if (newPassword.trim().length < 8) {
        setLoading(false);
        return toast.error('Password too short. Use minimum 8 characters.');
      } else if (!/[a-z]/.test(newPassword)) {
        setLoading(false);
        return toast.error('Password needs at least one lowercase letter.');
      } else if (!/[A-Z]/.test(newPassword)) {
        setLoading(false);
        return toast.error('Password needs at least one uppercase letter.');
      } else if (!/[0-9]/.test(newPassword)) {
        setLoading(false);
        return toast.error('Password needs at least one number.');
      } else if (!/[!@#$%^&*]/.test(newPassword)) {
        setLoading(false);
        return toast.error('Password needs at least one symbol (!@#$%^&*).');
      }
    }

    try {
      let pictureUrl = '';
      if (picture) {
        const formData = new FormData();
        formData.append('photos', picture);
        const res = await fetch('/api/upload/profile-photo', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        pictureUrl = data.url;
      }

      let userImage;
      if (pictureUrl) {
        userImage = pictureUrl;
      } else {
        userImage = userData.image;
      }
      const userDetails = {
        name,
        accountPassword,
        newPassword,
        image: userImage,
        bio,
      };

      // //console.log(userDetails);
      //post request to  /api/user/[id] with userDetails
      const res = await fetch(`/api/user/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Profile updated successfully');
        // Reset the form and re-fetch the user data
        setUserData({
          name: '',
          image: '',
          email: '',
          accountPassword: '',
          newPassword: '',
          bio: '',
        });
        setPicture('');
        fetch(`/api/user/${userid}`)
          .then((res) => res.json())
          .then((user) => {
            setUserData({
              name: user.name || '',
              image: user.image || '',
              email: user.email || '',
              accountPassword: '',
              newPassword: '',
              bio: user.bio || '',
            });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      // console.error(error);
      setLoading(false);
      toast.error('Something Went Wrong');
    }
  };
  const toggleAccountPasswordVisibility = () => {
    setShowAccountPassword(!showAccountPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="rounded-xl bg-white p-1 px-4 dark:bg-slate-900  sm:p-7 md:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl">
              Profile
            </h2>
            <Button
              variant="destructive"
              className="font-semibold md:text-lg"
              onClick={() => signOut()}
            >
              Log Out
            </Button>
          </div>
          <p className="pt-3 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings.
          </p>
        </div>

        <form>
          <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="mt-2.5 inline-block font-semibold  text-gray-800 dark:text-gray-200">
                Profile photo
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                {picture ? (
                  <Avatar className="inline-block h-16 w-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 ">
                    <AvatarImage
                      src={URL.createObjectURL(picture)}
                      alt={`${userData.name || 'user'} profile picture`}
                    />
                    <AvatarFallback>
                      <div className="h-10 w-10 animate-pulse bg-gray-400"></div>
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="inline-block h-16 w-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 ">
                    <AvatarImage
                      src={userData.image.replace(
                        '/upload/',
                        '/upload/w_300,h_300,c_fill,g_auto/q_auto/f_auto/',
                      )}
                      alt={`${userData.name || 'user'} profile picture`}
                    />
                    <AvatarFallback>
                      {userData.name && userData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex gap-x-2">
                  <div
                    className="inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={handleImageClick}
                  >
                    <Upload width={20} height={20} />
                    <span>Upload photo</span>
                    <input
                      type="file"
                      ref={uploadRef}
                      onChange={handlePictureChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-full-name"
                className="mt-2.5 inline-block font-semibold  text-gray-800 dark:text-gray-200"
              >
                Full name
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="relative -ms-px -mt-px block w-full rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 sm:mt-0 sm:first:ms-0"
                  onChange={handleUserData}
                  value={userData.name}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="account-email"
                className="mt-2.5 inline-block font-semibold  text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <div
                disabled
                name="account-email"
                className="scrollbar-hide block w-full max-w-full select-none overflow-x-auto rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm opacity-70 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="">{userData && userData.email}</span>
                {/* <span className="flex sm:hidden">
                  {userData && userData.email
                    ? userData.email.length > 24
                      ? userData.email.substring(0, 24) + '...'
                      : userData.email
                    : ''}
                </span> */}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="account-password"
                className="mt-2.5 inline-block font-semibold  text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="space-y-2">
                <label
                  for="password"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Account Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"></div>
                  <input
                    id="password"
                    name="accountPassword"
                    type={showAccountPassword ? 'text' : 'password'}
                    disabled={!userData.passwordAvailable}
                    placeholder="Current password"
                    value={userData.accountPassword}
                    onChange={handleUserData}
                    className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:select-none disabled:opacity-30 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                  />
                  <div
                    disabled={!userData.passwordAvailable}
                    className="absolute bottom-2 end-2 cursor-pointer disabled:pointer-events-none disabled:select-none disabled:opacity-30"
                    onClick={toggleAccountPasswordVisibility}
                  >
                    {showAccountPassword ? <Eye /> : <EyeOff />}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  for="password"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"></div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="confirm_password"
                    name="newPassword"
                    disabled={!userData.passwordAvailable}
                    placeholder="New password"
                    value={userData.newPassword}
                    onChange={handleUserData}
                    className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:select-none disabled:opacity-30 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                  />
                  <div
                    disabled={!userData.passwordAvailable}
                    className="absolute bottom-2 end-2 cursor-pointer disabled:pointer-events-none disabled:select-none disabled:opacity-30 "
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? <Eye /> : <EyeOff />}
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-bio"
                className="mt-2.5 inline-block font-semibold  text-gray-800 dark:text-gray-200"
              >
                BIO
              </label>
            </div>

            <div className="sm:col-span-9">
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleUserData}
                className="block w-full resize-none rounded-lg border-2 border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                rows="8"
                placeholder="Type your Bio..."
              ></textarea>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleSaveChanges}
              className="mx-auto inline-flex w-56 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 sm:mx-0"
            >
              <Loader2
                width={20}
                height={20}
                className={`animate-spin ${loading ? 'block' : 'hidden'}`}
              />
              Save Changes
            </button>
          </div>
        </form>
        <div className="pt-5 text-center text-xs md:text-end md:text-sm">
          <span className="">*</span> If the changes are not immediately
          visible, please log out and log back in to refresh the data.
        </div>
      </div>
    </div>
  );
}
