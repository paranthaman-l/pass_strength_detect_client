"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserService from '@/services/UserService';
import Image from 'next/image';

const Navbar = () => {

  const router = useRouter();
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      UserService.getUser(localStorage.getItem('uid')).then((response) => {
        setUser(response.data);
      }).catch((err) => {
        console.log(err);
      });
    }
    else
      return;
  }, []);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);



  return (
    <div className='flex justify-between items-center h-20 fixed w-full bg-[#0a0a0a]'>
      <div className="mx-10">
        Logo
      </div>

      {user ? <div className="mx-10 flex justify-center items-center my-2">
        {user?.profile &&
          <Image src={user.profile} className='w-10 h-10 rounded-full mx-3' alt="profile" width={300} height={300} />
        }
        {user?.name}
      </div> :
        <div className="mx-10">
          <button className='bg-blue-500 py-2 px-4 rounded-lg tracking-wide mx-2' onClick={() => router.push("/login")} type="button">Login</button>
          <button className='bg-blue-500 py-2 px-4 rounded-lg tracking-wide mx-2' onClick={() => router.push("/signup")} type="button">SignUp</button>
        </div>
      }
    </div>
  )
}

export default Navbar