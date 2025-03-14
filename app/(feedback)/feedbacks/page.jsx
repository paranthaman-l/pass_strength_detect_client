"use client";
import Navbar from '@/components/Navbar';
import UserService from '@/services/UserService';
import React, { useEffect, useState } from 'react';

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                // Fetch feedbacks from your API or database
                await UserService.getFeedbacks(localStorage.getItem('uid')).then((response) => {
                    setFeedbacks(response.data);
                }).catch((err) => {
                    console.log(err);
                });
            } catch (err) {
                console.error("Error fetching feedbacks: ", err);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <>
            <Navbar />
            <div className="feedbacks-container bg-gray-50 p-8 rounded-lg shadow-lg pt-24">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Your Feedbacks</h1>

                {feedbacks.length > 0 ? (
                    <div className="feedback-list space-y-6">
                        {feedbacks.map((feedback) => (
                            <div key={feedback.id} className="feedback-item p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{feedback.userName}</h3>
                                    <span className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="positive-feedback mb-4">
                                    <h4 className="font-medium text-green-600">Positive Feedback:</h4>
                                    <p className="text-lg text-gray-700">{feedback.positive}</p>
                                </div>

                                <div className="negative-feedback">
                                    <h4 className="font-medium text-red-600">Negative Feedback:</h4>
                                    <p className="text-lg text-gray-700">{feedback.negative}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No feedbacks available.</p>
                )}
            </div>
        </>
    );
};

export default Feedbacks;
