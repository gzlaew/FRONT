import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import { removeTokenCookie, getTokenCookie } from './auth';

const Logout: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                const token = getTokenCookie();
                if (token) {
                    await axios.get('http://localhost:8000/api/logout', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    removeTokenCookie();
                }
                router.replace('/auth/login');
            } catch (error) {
                console.error('Error during logout', error);
            }
        };

        logout();
    }, [router]);

    return null;
};

export default Logout;
