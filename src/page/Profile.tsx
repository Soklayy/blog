import userIcon from '../assets/user.png'
import { RxClipboard } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { GrLocation } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { BiEdit, BiSave } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { axiosInstance } from '../api/axios.instance';
import { AiOutlineLoading } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { IUser } from '../api/models/user.interface';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/feature/Auth/auth.slide';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation()
  const auth = useAppSelector(state => state.auth)
  const [user, setUser] = useState<IUser>(() => auth?.user || {})
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<File | string>(userIcon)

  useEffect(() => {
    if (user?.profileImage?.url) {
      setProfileImage(user?.profileImage?.url)
    }
  }, [user?.profileImage])

  useEffect(() => {
    if (!auth?.user?.id) {
      navigate('/')
    }
  }, [auth?.user])
  const saveHandler = () => {
    setLoading(true)
    axiosInstance.patch(`auth/profile`,
      {
        ...user,
        profileImage: profileImage as File
      },
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": 'multipart/form-data',
        }
      }
    ).then(res => {
      if (res.status == 200) {
        dispatch(login({ user: res.data }))
        setLoading(false)
        alert('Success')
      }
    }).catch((err: any) => {
      setLoading(false)
      alert('!' + err?.code + ': ' + err?.response.data.message)
    })

  }
  return (
    <div className="bg-white min-h-[calc(100%-13rem)] rounded-lg p-5 space-y-2 max-w-3xl m-auto my-2 sm:border">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className='relative h-20 w-20'>
            <img
              src={('string' == typeof profileImage) ? profileImage as string : URL.createObjectURL(profileImage as File)}
              className="rounded-full w-full h-full object-cover"
            />
            <div>
              <label htmlFor="profile"><BiEdit className='absolute bottom-0 -right-0 text-white bg-green-600 p-[.1rem] text-xl rounded-full cursor-pointer file:' title='Edit profile' /></label>
              <input
                id='profile'
                type="file"
                className='[visibility:_hidden] absolute -z-10'
                onChange={e => {
                  if (e.target.files) {
                    setProfileImage(e.target.files[0])
                  }
                }}
              />
            </div>
          </div>
          <div className="sm:ml-5">
            <h1 className="dark:text-gray-200 font-bold">{user?.lastname} {user?.firstname}</h1>
            <div className="flex sm:items-center">
              <MdEmail className="text-sm" />
              <span className='text-xs ml-2'>{user?.email}</span>
            </div>
            <div className="flex items-center">
              <RxClipboard className="text-sm" />
              <p className="ml-2 capitalize text-sm text-green-500">{user?.role}</p>
            </div>
          </div>
        </div>
        <button className="primary-button w-fit  px-5 flex items-center gap-1 font-bayon font-medium" onClick={saveHandler}>
          {
            loading
              ? <AiOutlineLoading className="text-lg animate-spin" />
              : <BiSave className="text-lg" />
          }
          {t('save', { ns: 'button' })}
        </button>
      </div>

      <div className="flex w-full items-center gap-1">
        <p className="w-fit">{t('persional_info')}</p>
        <hr className="my-5 flex-auto" />
      </div>

      <div className='space-y-4'>
        <div className="border-2 border-green-400 rounded-md p-3 relative">
          <label className="text-sm text-gray-500 absolute -top-2 bg-white px-1 capitalize">{t('firstname')}<span className="text-green-500">*</span></label>
          <input
            type="text"
            className="outline-none bg-transparent text-base w-full"
            value={user?.firstname || ''}
            onChange={e => setUser({ ...user, firstname: e.target.value })}
          />
        </div>
        <div className="border-2 border-green-400 rounded-md p-3 relative">
          <label className="text-sm text-gray-500 absolute -top-2 bg-white px-1 capitalize">{t('lastname')}<span className="text-green-500">*</span></label>
          <input
            type="text"
            className="outline-none bg-transparent text-base w-full"
            value={user?.lastname || ''}
            onChange={e => setUser({ ...user, lastname: e.target.value })}
          />
        </div>

        <div className="border-2 border-green-400 rounded-md p-3 relative">
          <label className="text-sm text-gray-500 absolute -top-2 bg-white px-1">{t('birthdate')}</label>
          <input
            type="date"
            className="outline-none bg-transparent text-base w-full"
            value={user?.birthdate || ''}
            onChange={e => setUser({ ...user, birthdate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex w-full items-center gap-1">
        <p className="w-fit">{t('login_provider')}</p>
        <hr className="my-5 flex-auto" />
      </div>

      <div className="flex justify-between">
        <div className="flex items-center">
          {user?.logginProvider === 'google'
            ? <FcGoogle className="text-lg" />
            : <GrLocation className="text-lg" />
          }
          <p className="ml-5 font-semibold capitalize">{user?.logginProvider}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile