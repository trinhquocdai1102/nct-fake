import React, { FC } from 'react';

interface SwitchProps {
    isOn: boolean;
    handleToggle: () => void;
}

const Switch: FC<SwitchProps> = ({ isOn, handleToggle }) => {
    return (
        <div className='mb-3 font-medium flex items-center gap-4 justify-end'>
            <span>Tự động phát</span>
            <div className='flex items-center'>
                <input
                    className='switch-checkbox'
                    id='switch'
                    type='checkbox'
                    onChange={handleToggle}
                />
                <label
                    className={`${
                        isOn ? `bg-[#06D6A0]` : `bg-[grey]`
                    } switch-label`}
                    htmlFor='switch'
                >
                    <span className='switch-button' />
                </label>
            </div>
        </div>
    );
};

export default Switch;
