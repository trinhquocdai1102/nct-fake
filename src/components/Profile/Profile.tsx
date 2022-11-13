import React, { FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';
import { avatarDefault, imgNotFound } from '../../utils/constants';
import { profileList } from '../../utils/profile';

interface ProfileProps {
    profileData: any;
}

const Profile: FC<ProfileProps> = ({ profileData }) => {
    const { setOpenChangeProfile, changedProfile } = useContext(ProfileContext);
    const { isLogged } = useContext(AuthContext);
    const data = changedProfile?.find((item) => item.user === isLogged.email);

    const divClassName =
        'bg-bg-color flex items-center h-[40px] rounded-sm mt-[4px]';
    const divLabelClassName = 'ml-[16px] flex items-center text-main-color';
    const labelClassName = 'mr-2';
    const divDataClassName = 'ml-2';
    const notUpdateYet = 'Chưa cập nhật';

    return (
        <div className='py-2 px-[32px]'>
            <div className='flex md:flex-row flex-col border-b'>
                <div className='flex items-center justify-center md:w-auto w-full'>
                    <div className='line w-[160px] h-auto max-w-full aspect-[1/1] relative'>
                        <LazyLoadImage
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = imgNotFound;
                            }}
                            src={profileData?.avatar ?? avatarDefault}
                            alt={profileData?.name}
                            width='100%'
                            height='100%'
                            className='rounded-[4px]'
                            effect='blur'
                        />
                    </div>
                </div>

                <div className='flex-1 md:ml-5 ml-0 md:mt-0 mt-5 pt-2 pl-1 text-13px text-main-color'>
                    <div>
                        <p className='font-bold text-sm text-text-main-color'>
                            {profileData.name}
                        </p>
                    </div>
                    <div className='flex items-center mt-4'>
                        <p>
                            Trở thành thành viên VIP để trải nghiệm tất cả tính
                            năng
                        </p>
                        <span className='mx-2'>-</span>
                        <Link className='text-second-color' to='/upgrade-vip'>
                            Nâng cấp ngay !
                        </Link>
                    </div>
                    <div className='mt-[14px]'>
                        <span className='mr-1'>ID:</span>
                        {profileData.id}
                    </div>
                    <div className='mt-[24px]'>
                        <button
                            onClick={() => setOpenChangeProfile(true)}
                            className='py-[6px] px-[8px] w-[120px] bg-third-color rounded-[4px] font-medium text-xs flex items-center justify-center'
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-4 mb-5 font-semibold text-xl leading-loose p-4'>
                <h1 className='text-[22px]'>Thông tin cá nhân</h1>

                <div className='font-normal text-sm mt-4 leading-8'>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[0].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data?.displayName
                                    ? data?.displayName
                                    : notUpdateYet}
                            </span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[1].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>{data?.email || isLogged?.email}</span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[2].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            {data && data?.birthday ? (
                                <>
                                    <span>{data?.birthday?.day}</span>
                                    <span>/</span>
                                    <span>{data?.birthday?.month}</span>
                                    <span>/</span>
                                    <span>{data?.birthday?.year}</span>
                                </>
                            ) : (
                                notUpdateYet
                            )}
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[3].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data && data?.sex
                                    ? data?.sex === 'male'
                                        ? 'Nam'
                                        : data?.sex === 'female'
                                        ? 'Nữ'
                                        : 'Khác'
                                    : notUpdateYet}
                            </span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[4].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data && data?.address
                                    ? data?.address
                                    : notUpdateYet}
                            </span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[5].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data && data?.city ? data?.city : notUpdateYet}
                            </span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[6].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data && data?.phoneNumber
                                    ? data?.phoneNumber
                                    : notUpdateYet}
                            </span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[7].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data && data?.IDCard
                                    ? data?.IDCard
                                    : notUpdateYet}
                            </span>
                        </div>
                    </div>
                    <div className={divClassName}>
                        <div className={divLabelClassName}>
                            <span className={labelClassName}>
                                {profileList[8].name}:
                            </span>
                        </div>
                        <div className={divDataClassName}>
                            <span>
                                {data && data?.about
                                    ? data?.about
                                    : notUpdateYet}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
