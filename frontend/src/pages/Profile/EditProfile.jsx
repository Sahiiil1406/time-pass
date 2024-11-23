import React, { useState } from "react";
import { BsLinkedin, BsInstagram, BsTwitter } from 'react-icons/bs';
import axios from 'axios';

function EditProfile() {
    const username = 'abhay';
    const [profileData, setProfileData] = useState({
        language: '',
        gender: '',
        interest: '',
        bio: ''
    });

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/users/update/${username}`, profileData);
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="bg-black h-screen w-full sm:w-full md:w-full lg:w-screen xl:w-screen flex flex-col">
            <h1 className="text-white text-xl font-bold ml-20 mt-5 flex justify-center">Edit Profile</h1>
            <div className="bg-gray-500 w-auto h-auto md:ml-20 mt-5 rounded-3xl flex flex-col justify-between md:flex-row">
                <div className="flex ml-5">
                    <img src="formlogo.png" alt="ProfilePhoto" className="max-w-full h-auto"/>
                    <div className="flex flex-col justify-center ml-10">
                        <p className="text-white text-xl">Kakashi Hatake</p>
                        <p className="text-gray-300">@KakashiHatake</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center md:flex-col">
                    <div className="flex justify-evenly flex-row mb-5 mt-5">
                        <a href="https://www.linkedin.com/">
                            <BsLinkedin size={48} />
                        </a>
                        <a href="https://www.twitter.com/">
                            <BsTwitter size={48} className="ml-10 mr-10"/>
                        </a>
                        <a href="https://www.instagram.com/">
                            <BsInstagram size={48} />
                        </a>
                    </div>
                </div>
                <div className="flex md:justify justify-center">
                    <p className="flex flex-col mr-5 justify-center">
                        <span className="bg-blue-500 text-1.5xl text-white px-6 py-4 rounded-3xl w-fit">Change Photo</span>
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex justify-center md:flex-row flex-col w-fit">
                <select name="language" value={profileData.language} onChange={handleChange} className="w-[fit] bg-black border-2 rounded-2xl border-gray-400 text-white mt-5 md:ml-20 ml-5">
                    <option value="" disabled>Select a language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Japanese">Japanese</option>
                </select>
                <select name="gender" value={profileData.gender} onChange={handleChange} className="w-[auto] bg-black border-2 rounded-2xl border-gray-400 text-white mt-5 ml-5">
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <select name="interest" value={profileData.interest} onChange={handleChange} className="w-[auto] bg-black border-2 rounded-2xl border-gray-400 text-white mt-5 ml-5">
                    <option value="" disabled>Choose Your field of interest</option>
                    <option value="Competitive Programming">Competitive Programming</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Painting And Drawing">Painting And Drawing</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Gaming">Gaming</option>
                </select>
            </form>
            <div className="flex flex-col md:ml-20 mt-10">
                <p className="text-white text-3xl flex justify-center">Bio</p>
                <input type="text" name="bio" value={profileData.bio} onChange={handleChange} className="w-[auto] mt-5 border-gray-400 h-20 bg-black border-2 rounded-2xl text-white"/>
            </div>
            <div className="ml-20 flex md:justify-end w-[auto] mt-5 justify-center">
                <button type="submit" onClick={handleSubmit} className="bg-blue-500 w-[auto] p-2 text-2xl text-white rounded-2xl">Submit</button>
            </div>
        </div>
    );
}

export default EditProfile;
