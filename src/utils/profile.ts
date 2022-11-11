import { v4 as uuidv4 } from 'uuid';

export const profileList = [
    {
        id: uuidv4(),
        name: 'Tên hiển thị',
        item: 'displayName',
    },
    {
        id: uuidv4(),
        name: 'Email',
        item: 'email',
    },
    {
        id: uuidv4(),
        name: 'Sinh nhật',
        item: 'birthday',
    },
    {
        id: uuidv4(),
        name: 'Giới tính',
        item: 'sex',
    },
    {
        id: uuidv4(),
        name: 'Địa chỉ',
        item: 'address',
    },
    {
        id: uuidv4(),
        name: 'Thành phố',
        item: 'city',
    },
    {
        id: uuidv4(),
        name: 'Số điện thoại',
        item: 'phoneNumber',
    },
    {
        id: uuidv4(),
        name: 'Số CMND',
        item: 'IDCard',
    },
    {
        id: uuidv4(),
        name: 'Giới thiệu',
        item: 'about',
    },
];

export const sexData = [
    {
        value: 'male',
        label: 'Nam',
    },
    {
        value: 'female',
        label: 'Nữ',
    },
    {
        value: 'other',
        label: 'Khác',
    },
];
