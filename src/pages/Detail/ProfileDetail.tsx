import { addDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import ChangeProfile from '../../components/Profile/ChangeProfile';
import Profile from '../../components/Profile/Profile';
import ProfileDetailSkeleton from '../../components/Skeleton/ProfileDetailSkeleton';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';

const ProfileDetail = () => {
    const params = useParams();
    const {
        profileCollection,
        profile,
        changedProfile,
        openChangeProfile,
        setChangedProfile,
        setOpenChangeProfile,
    } = useContext(ProfileContext);
    const { isLogged } = useContext(AuthContext);
    const allUser = useSelector((state: any) => state.auth);
    const profileData = allUser?.find((item: any) => item.name === params.key);
    const location = useLocation();

    const handleUpdateProfile = async (id: any) => {
        const docRef = doc(db, 'profile', id);

        if (id) {
            await updateDoc(docRef, { ...profile });
        }
    };

    const handleSaveProfile = async () => {
        const checkExist = changedProfile?.every(
            (item) => item.user === isLogged?.email
        );
        if (checkExist) {
            return;
        } else {
            await addDoc(profileCollection, {
                ...profile,
                user: isLogged.email,
            });
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data: any = await getDocs(profileCollection);

            setChangedProfile(
                data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getData();
    }, [profileCollection]);

    useEffect(() => {
        if (
            location.pathname.includes('/user/profile/') &&
            location.key !== 'default'
        ) {
            setOpenChangeProfile(false);
        }
    }, [location]);

    return (
        <>
            {!profileData ? (
                <ProfileDetailSkeleton />
            ) : !openChangeProfile ? (
                <Profile profileData={profileData} />
            ) : (
                <ChangeProfile
                    handleSaveProfile={handleSaveProfile}
                    handleUpdateProfile={handleUpdateProfile}
                />
            )}
        </>
    );
};

export default ProfileDetail;
