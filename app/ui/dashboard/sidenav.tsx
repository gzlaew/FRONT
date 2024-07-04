"use client"

import Link from 'next/link';

import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter, redirect } from 'next/navigation'; 
import { removeTokenCookie, getTokenCookie } from '../../auth/login/auth';
import axios from 'axios';
import { getIronSession } from "iron-session";


export const logout = () => {
  // Hapus token dari cookie atau local storage
  removeTokenCookie();

  // Arahkan pengguna ke halaman login atau halaman beranda
  redirect('/auth/login'); // Ganti dengan halaman yang sesuai
};

const SideNav: React.FC = () => {
    const router = useRouter(); // Menggunakan useRouter di dalam komponen utama

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link href="/" passHref>
              
                    <AcmeLogo />
        
            </Link>
            <div className="flex-grow flex flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form action={logout}>
                    <button
                        className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"                 >
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SideNav;
