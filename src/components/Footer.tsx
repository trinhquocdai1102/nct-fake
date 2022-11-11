import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return <div>&copy; {year} by Trinh Quoc Dai</div>;
};

export default Footer;
