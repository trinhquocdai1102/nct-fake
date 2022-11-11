export interface IProfile {
    id?: string;
    avatar?: File[];
    displayName?: string;
    email?: string;
    birthday?: IBirthDay;
    sex?: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
    IDCard?: string;
    about?: string;
    user?: string;
}

interface IBirthDay {
    day: number;
    month: number;
    year: number;
}
