// lib/session.ts

import { withIronSession } from 'next-iron-session';

export default withIronSession(
    async (req, res) => {
        return {
            user: req.session.get('user') || null,
        };
    },
    {
        password: process.env.SECRET_COOKIE_PASSWORD,
        cookieName: 'sessionggg',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    }
);
