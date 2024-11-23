import React, { useState } from 'react';

function FeedAdd() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseClick = () => {
        setIsModalOpen(false);
    };

    const handleCameraClick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // You can now use the video stream, e.g., show it in a video element
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();
            document.body.appendChild(videoElement);  // Append video element to the body or any other container
        } catch (err) {
            console.error("Error accessing camera: ", err);
        }
    };

    const handleMicClick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // You can now use the audio stream, e.g., process it with an audio API
            const audioElement = document.createElement('audio');
            audioElement.srcObject = stream;
            audioElement.play();
            document.body.appendChild(audioElement);  // Append audio element to the body or any other container
        } catch (err) {
            console.error("Error accessing microphone: ", err);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white h-auto flex flex-col py-5 mt-10 w-auto z-10 p-5 rounded-lg">
                        <div className='flex justify-between items-center'>
                            <h1 className='py-5 ml-5 font-bold'>Create A Post</h1>
                            <button onClick={handleCloseClick} className='text-black text-2xl mr-5'>&times;</button>
                        </div>
                        <div className='ml-5 mb-5'>
                            <input type="text" placeholder='What do you have to share?' className='w-full border rounded p-2'/>
                        </div>
                        <div className='ml-5 flex justify-between'>
                            <img src="Gallary.svg" alt="Gallery" />
                            <img src="Poll.svg" alt="Poll" />
                            <img src="Help.svg" alt="Help" />
                            <img src="Camera.svg" alt="Camera" onClick={handleCameraClick} className="cursor-pointer"/>
                            <img src="Mic.svg" alt="Mic" onClick={handleMicClick} className='mr-5 cursor-pointer' />
                        </div>
                        <div className='mt-5 flex justify-end'>
                            <button className='bg-gray-300 py-2 px-5 rounded-3xl'>Post {'>'}</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`bg-white h-auto flex flex-col py-5 mt-10 mr-10 w-auto ${isModalOpen ? 'blur-sm' : ''}`}>
                <div className='flex'>
                    <h1 className='py-5 ml-5 font-bold'>Create A Post</h1>
                    <img src="Add.svg" className='ml-5 cursor-pointer' onClick={handleAddClick}/>
                </div>
                <div className='ml-5 mb-5'>
                    <input type="text" placeholder='What do you have to share?' className='w-full border rounded p-2'/>
                </div>
                <div className='ml-5 flex justify-between'>
                    <img src="Gallary.svg" alt="Gallery" />
                    <img src="Poll.svg" alt="Poll" />
                    <img src="Help.svg" alt="Help" />
                    <img src="Camera.svg" alt="Camera" onClick={handleCameraClick} className="cursor-pointer"/>
                    <img src="Mic.svg" alt="Mic" onClick={handleMicClick} className='mr-5 cursor-pointer' />
                </div>
                <div className='mt-5'>
                    <button className='ml-6 bg-gray-300 py-2 px-5 rounded-3xl'>Post {'>'}</button>
                </div>
            </div>
        </div>
    );
}

export default FeedAdd;
