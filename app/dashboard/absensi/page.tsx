"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import { Button } from '@/app/components/button';

const AbsenPage = () => {
  const router = useRouter();
  const [kehadiran, setKehadiran] = useState<any[]>([]); // State to hold attendance data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/absen');
        console.log('Attendance Data:', response.data);
        setKehadiran(response.data.kehadiran); // Assuming response.data.kehadiran is an array of attendance objects
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        router.push('/auth/login');
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    // Check token logic here if needed
    const hasToken = true; // Assuming token logic

    if (!hasToken) {
      router.push('/auth/login');
    }
  }, [router]);

  console.log('Kehadiran:', kehadiran);

  async function handleDeleteAbsen(id: string) {
    try {
      const response = await fetch(`http://localhost:8000/api/deleteAbsen/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log('Deleting absen with id:', id);
      setKehadiran(kehadiran.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting absen:', error);
    }
  }
  return (
    <div className="p-4">
    <h1>Absensi</h1>
    {kehadiran.length === 0 ? (
      <p>Data Absensi Kosong</p>
    ) : (
      <table className="table w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Jam Masuk</th>
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {kehadiran.map((record, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2">{record.jam_masuk}</td>
              <td className="px-4 py-2">{record.tanggal}</td>
              <td className="px-4 py-2">
                <Button onClick={() => handleDeleteAbsen(record.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <style jsx>{`
      .table {
        border-collapse: collapse;
        width: 100%;
      }
      .table th,
      .table td {
        border: 1px solid #e2e8f0;
        padding: 8px 16px;
        text-align: left;
        word-wrap: break-word; /* Wrap text if it exceeds cell width */
      }
      .table th {
        background-color: #f7fafc;
        color: #4a5568;
        font-weight: bold;
      }
      .table td {
        background-color: #ffffff;
        color: #1a202c;
      }
    `}</style>
  </div>
  );
};

export default AbsenPage;
