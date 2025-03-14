"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import UserService from '@/services/UserService'; // Ensure correct import
import FeedBackService from '@/services/FeedBackService';

const AddFeedBack = ({ params }) => {
    // Unwrap params using React.use()
    const { uid } = React.use(params); // Unwrap params

    const [user, setUser] = useState(null);
    const [feedback, setFeedback] = useState({
        positive: "",
        negative: ""
    });
    const handleFeedback = async (e) => {
        e.preventDefault();
        await FeedBackService.postFeedBack({ ...feedback, uid: uid }).then((response) => {
            setTimeout(() => {
                alert("Feedback Submited");
            }, 1000);
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value
        }));
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await UserService.getUser(uid); // Fetch user data using uid
                setUser(response.data); // Set the fetched user data
                
            } catch (err) {
                console.log(err);
            }
        };

        if (uid) {
            getUser(); // Fetch data if uid exists
        }
    }, [uid]);

    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center my-28 space-y-6 md:space-y-0">
            {/* User Details Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                {user ? (
                    <div className="flex justify-center items-center flex-col w-full">
                        {user?.profile && (
                            <Image
                                src={user.profile}
                                className="w-40 h-40 rounded-full mx-3"
                                alt="profile"
                                width={300}
                                height={300}
                            />
                        )}
                        <p className="text-3xl mt-5">
                            {user?.name}
                        </p>
                        <p className="text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center my-2 flex-col w-full">
                        Loading...
                    </div>
                )}
            </div>

            {/* Feedback Form Section */}
            <div className="w-full md:w-1/2 p-6 md:p-20">
                <form className="mt-4">
                    <div>
                        <label htmlFor="positive" className="block font-medium">Positive Feedback</label>
                        <textarea
                            id="positive"
                            name="positive"
                            value={feedback.positive}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 p-2 mt-1 rounded text-black resize-none"
                            placeholder="Enter positive feedback"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="negative" className="block font-medium">Negative Feedback</label>
                        <textarea
                            id="negative"
                            name="negative"
                            value={feedback.negative}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 p-2 mt-1 rounded text-black resize-none"
                            placeholder="Enter negative feedback"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleFeedback}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFeedBack;
