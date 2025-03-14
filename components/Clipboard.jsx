"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdOutlineContentCopy } from "react-icons/md";
const Clipboard = () => {
    const [uid,setUid] = useState("");
    const [copySuccess, setCopySuccess] = useState('');
    const router = useRouter();
    const handleCopyClick = async () => {
        try {
            const link = `http://localhost:3000/addfeedback/${localStorage.getItem('uid')}`;
            await navigator.clipboard.writeText(link);
            setCopySuccess('Link copied to your clipboard!');
            setTimeout(() => {
                setCopySuccess("")
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopySuccess('Failed to copy text');
            setTimeout(() => {
                setCopySuccess("")
            }, 2000);
        }
    };
    useEffect(() => {
      if(localStorage.getItem('uid'))
        setUid(localStorage.getItem('uid'));
    }, [])
    
    return (
        <div className=' float-right'>
            {uid &&
                <>
                    <div className="copy-container flex relative">
                        <p className="copy-text bg-gray-800 rounded-md w-fit p-2 text-white">Feedback Link</p>
                        <button className="copy-button text-xl mx-2" onClick={handleCopyClick}>
                            <MdOutlineContentCopy />
                        </button>
                        {copySuccess && <p className="copy-status absolute right-40">{copySuccess}</p>}
                    </div>
                    <button onClick={() => router.push("/feedbacks")} className="copy-text bg-gray-800 rounded-md w-fit p-2 text-white my-5">My Feedbacks</button>
                </>
            }
        </div>
    )
}

export default Clipboard