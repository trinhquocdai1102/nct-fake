import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsChevronDown } from 'react-icons/bs';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';
import { avatarDefault } from '../../utils/constants';
import { profileList, sexData } from '../../utils/profile';

interface ChangeProfileProps {
    handleUpdateProfile: (id: any) => void;
    handleSaveProfile: () => void;
}

interface IDate {
    label: string;
    value?: number[];
}

const ChangeProfile: FC<ChangeProfileProps> = ({
    handleUpdateProfile,
    handleSaveProfile,
}) => {
    const { profile, setProfile, changedProfile, setOpenChangeProfile } =
        useContext(ProfileContext);
    const { isLogged } = useContext(AuthContext);
    const [date, setDate] = useState<IDate[]>([]);
    const profileData = changedProfile.find(
        (item) => item.user === isLogged.email
    );

    const inputRef = useRef<HTMLInputElement | any>();
    const handleOpenChooseFile = () => {
        inputRef.current.click();
    };

    const handleCheckSaveProfile = (data: any) => {
        if (
            window.confirm(
                'Bạn có chắc chắn muốn cập nhật thông tin cá nhân không ?'
            )
        ) {
            if (profileData) {
                handleUpdateProfile(data);
            } else {
                handleSaveProfile();
            }
            setOpenChangeProfile(false);
            toast.success('Cập nhật thông tin thành công');
        }
    };

    const divLabelClassName = `ml-[16px] flex items-center text-main-color w-full h-[40px]`;
    const labelClassName = `mr-[8px] w-[100px]`;
    const inputClassName = `text-text-main-color font-medium h-[40px] px-[8px] w-[360px] bg-bg-color border border-third-color focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-second-color rounded-sm`;

    const handleSetDate = (e: any) => {
        if (e.target.name === 'Ngày') {
            setProfile({
                ...profile,
                birthday: {
                    ...profile.birthday,
                    day: e.target.value,
                },
            });
        } else if (e.target.name === 'Tháng') {
            setProfile({
                ...profile,
                birthday: {
                    ...profile.birthday,
                    month: e.target.value,
                },
            });
        } else {
            setProfile({
                ...profile,
                birthday: {
                    ...profile.birthday,
                    year: e.target.value,
                },
            });
        }
    };

    useEffect(() => {
        const now = new Date().getFullYear();
        let day = [];
        for (let i = 1; i <= 31; i++) {
            day.push(i);
        }
        let month = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        let year = [];
        for (let i = 1960; i <= now; i++) {
            year.push(i);
        }
        setDate([
            { label: 'Ngày', value: day },
            { label: 'Tháng', value: month },
            { label: 'Năm', value: year },
        ]);
    }, []);

    return (
        <div className='px-[32px] mb-5 text-xl leading-loose p-4'>
            <h1 className='text-[22px] capitalize font-bold'>
                Cập nhật thông tin
            </h1>

            <div className='font-normal text-sm mt-4 leading-8'>
                <div className='flex items-center rounded-sm mt-[4px]'>
                    <div
                        className={`ml-[16px] flex items-center text-main-color`}
                    >
                        <span className={labelClassName}>Hình đại diện:</span>
                        <div className='w-[64px] h-[64px] rounded-md overflow-hidden'>
                            <img src={avatarDefault} alt='avatar' />
                        </div>
                        <div>
                            <button
                                onClick={handleOpenChooseFile}
                                className='ml-4 py-[6px] h-[32px] px-[8px] w-[120px] bg-third-color rounded-[4px] font-medium text-xs flex items-center justify-center'
                            >
                                Chọn file
                            </button>
                            <input
                                type='file'
                                className='hidden'
                                ref={inputRef}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[0].name}:
                        </span>
                        <input
                            type='text'
                            defaultValue={profileData?.displayName}
                            className={inputClassName}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    displayName: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[1].name}:
                        </span>
                        <input
                            type='text'
                            defaultValue={isLogged?.email}
                            className={inputClassName}
                            style={{ outline: 'none' }}
                            readOnly
                        />
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[2].name}:
                        </span>
                        <div className={`flex items-center gap-4 w-[360px]`}>
                            {date.map((item) => {
                                return (
                                    <div
                                        key={item.label}
                                        className='w-1/3 line'
                                    >
                                        <select
                                            name={item.label}
                                            className='no-arrow h-[40px] px-[20px] w-full bg-bg-color text-text-main-color font-medium border border-third-color focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-second-color rounded-sm cursor-pointer'
                                            onChange={(e) => {
                                                handleSetDate(e);
                                            }}
                                            defaultValue={
                                                item.label === 'Ngày'
                                                    ? profileData?.birthday?.day
                                                        ? profileData?.birthday
                                                              ?.day
                                                        : 1
                                                    : item.label === 'Tháng'
                                                    ? profileData?.birthday
                                                          ?.month
                                                        ? profileData?.birthday
                                                              ?.month
                                                        : 1
                                                    : profileData?.birthday
                                                          ?.year
                                                    ? profileData?.birthday
                                                          ?.year
                                                    : 1960
                                            }
                                        >
                                            {item?.value?.map((i) => {
                                                return (
                                                    <option key={i} value={i}>
                                                        {i}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <div className='absolute right-0 top-[0] bottom-0 flex items-center mr-2'>
                                            <BsChevronDown />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[3].name}:
                        </span>
                        <div className='flex items-center gap-3'>
                            {sexData.map((item) => {
                                return (
                                    <div
                                        className='flex gap-1'
                                        key={item.value}
                                    >
                                        <input
                                            type='radio'
                                            className='bg-bg-color border border-third-color rounded-sm'
                                            id={item.value}
                                            name='sex'
                                            defaultChecked={
                                                item.value === profileData?.sex
                                            }
                                            value={item.value}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    sex: e.target.value,
                                                })
                                            }
                                        />
                                        <label htmlFor={item.value}>
                                            {item.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[4].name}:
                        </span>
                        <input
                            type='text'
                            className={inputClassName}
                            defaultValue={profileData?.address}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    address: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[5].name}:
                        </span>
                        <input
                            type='text'
                            className={inputClassName}
                            defaultValue={profileData?.city}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    city: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[6].name}:
                        </span>
                        <input
                            type='text'
                            defaultValue={profileData?.phoneNumber}
                            className={inputClassName}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    phoneNumber: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[7].name}:
                        </span>
                        <input
                            type='text'
                            defaultValue={profileData?.IDCard}
                            className={inputClassName}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    IDCard: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className='flex items-center h-[40px] rounded-sm mt-[8px]'>
                    <div className={divLabelClassName}>
                        <span className={labelClassName}>
                            {profileList[8].name}:
                        </span>
                        <input
                            type='text'
                            defaultValue={profileData?.about}
                            className={inputClassName}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    about: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div
                    className={`mt-[8px] flex items-center justify-end w-[484px] gap-4`}
                >
                    <button
                        className='py-[6px] px-[8px] h-[40px] flex items-center text-black w-[120px] justify-center rounded-md text-xs bg-slate-300'
                        onClick={() => setOpenChangeProfile(false)}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => handleCheckSaveProfile(profileData?.id)}
                        style={{
                            background:
                                'linear-gradient(90deg,rgba(45,107,237),rgba(0,174,239,0.6))',
                        }}
                        className='py-[6px] px-[8px] h-[40px] flex items-center text-white w-[120px] justify-center rounded-md text-xs'
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeProfile;
