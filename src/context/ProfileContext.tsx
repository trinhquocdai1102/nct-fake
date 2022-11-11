import { collection } from 'firebase/firestore';
import React, { FC, useState } from 'react';
import { db } from '../config/firebase';
import { IProfile } from '../models/profile';

interface ProfileContextState {
    profileCollection: any;
    profile: IProfile;
    setProfile: Function;
    changedProfile: IProfile[];
    setChangedProfile: Function;
    openChangeProfile: boolean;
    setOpenChangeProfile: Function;
}

export const ProfileContext = React.createContext<ProfileContextState>({
    profileCollection: {},
    profile: {},
    setProfile: () => {},
    changedProfile: [],
    setChangedProfile: () => {},
    openChangeProfile: false,
    setOpenChangeProfile: () => {},
});

export const ProfileContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const profileCollection = collection(db, 'profile');
    const [openChangeProfile, setOpenChangeProfile] = useState(false);
    const [profile, setProfile] = useState<IProfile>({});
    const [changedProfile, setChangedProfile] = useState<IProfile[]>([]);

    const ProfileContextData = {
        profileCollection,
        profile,
        setProfile,
        changedProfile,
        setChangedProfile,
        openChangeProfile,
        setOpenChangeProfile,
    };

    return (
        <ProfileContext.Provider value={ProfileContextData}>
            {children}
        </ProfileContext.Provider>
    );
};
