import Cookies from 'js-cookie';

export const setTokenCookie = (token: string) => {
    const expirationTime = 365 * 10;
    Cookies.set('token', token, { expires: expirationTime });
};

export const getTokenCookie = (): string | undefined => {
    return Cookies.get('token');
};

export const removeTokenCookie = () => {
    Cookies.remove('token');
};

export const checkTokenCookie = () => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('token='));
};
