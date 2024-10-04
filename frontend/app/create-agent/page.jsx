'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { v4 as uuidv4 } from 'uuid';

const CreateAgentPage = () => {
  const [step, setStep] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const [agentData, setAgentData] = useState({
    id: uuidv4(),
    name: '',
    language: '',
    voice: '',
    avatar: null,
    greeting: '',
    prompt: '',
    llm: 'gpt4-mini',
    customKnowledge: '',
    files: []
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAgentData(prevData => ({ ...prevData, files: [...e.target.files] }));
  };

  const handleAvatarChange = (e) => {
    setAgentData(prevData => ({ ...prevData, avatar: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new FormData object
    const formData = new FormData();

    // Add all text fields to formData
    Object.keys(agentData).forEach(key => {
      if (key !== 'avatar' && key !== 'files') {
        formData.append(key, agentData[key] || ''); // Use empty string as default
      }
    });

    // Add avatar file if it exists
    if (agentData.avatar) {
      formData.append('avatar', agentData.avatar);
    }

    // Add other files if they exist
    agentData.files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Convert FormData to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
      if (key === 'avatar' || key.startsWith('file')) {
        jsonData[key] = value.name; // Just send the file name for files
      } else {
        jsonData[key] = value;
      }
    });
    console.log(jsonData, 'data')
    // Send data to backend
    try {
      const response = await fetch('/api/create-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Agent created successfully:', result);
        // Handle success (e.g., show a success message, redirect)
      } else {
        console.error('Failed to create agent');
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      // Handle error (e.g., show an error message)
    }
  };


  const nextStep = (e) => {
    e.preventDefault(); // Prevent form submission
    setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault(); // Prevent form submission
    setStep(step - 1);
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="min-h-screen p-4 sm:p-8">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-12 text-center text-white">
            Create Your Custom Agent
          </h1>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-4 sm:p-8 mb-8">
              {step === 1 && (
                <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-white">Step 1: Identity</h2>
                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-white">Agent Name</label>
                    <input
                      type="text"
                      name="name"
                      value={agentData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-2 sm:p-3 text-sm sm:text-base text-white placeholder-gray-300"
                      placeholder="Enter agent name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Language</label>
                    <select
                      name="language"
                      value={agentData.language}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-3 text-white"
                    >
                      <option value="" className=' bg-gray-800' >Select a language</option>
                      <option value="en" className=' bg-gray-800' >English</option>
                      <option value="es" className=' bg-gray-800' >Spanish</option>
                      <option value="fr" className=' bg-gray-800'>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Voice</label>
                    <select
                      name="voice"
                      value={agentData.voice}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-3 text-white"
                    >
                      <option value="" className=' bg-gray-800'>Select a voice</option>
                      <option value="male1" className=' bg-gray-800'>Male 1</option>
                      <option value="female1" className=' bg-gray-800'>Female 1</option>
                      <option value="neutral1" className=' bg-gray-800'>Neutral 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Avatar</label>
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleAvatarChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-3 text-white"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-white">Step 2: Behavior</h2>
                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-white">Agent Greeting (max 250 characters)</label>
                    <textarea
                      name="greeting"
                      value={agentData.greeting}
                      onChange={handleInputChange}
                      maxLength={250}
                      className="w-full bg-white bg-opacity-20 rounded-md p-2 sm:p-3 text-sm sm:text-base text-white h-20 sm:h-24"
                      placeholder="Enter agent greeting"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Agent Prompt</label>
                    <textarea
                      name="prompt"
                      value={agentData.prompt}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-3 text-white h-32"
                      placeholder="Enter agent prompt"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-white">Step 3: Knowledge</h2>
                  <div>
                    <label className="block mb-2 text-sm sm:text-base text-white">Agent LLM</label>
                    <select
                      name="llm"
                      value={agentData.llm}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-2 sm:p-3 text-sm sm:text-base text-white"
                    >
                      <option value="gpt4-mini" className="bg-gray-800">GPT-4 Mini</option>
                      <option value="gpt4-full" className="bg-gray-800">GPT-4 Full</option>
                      <option value="gpt3" className="bg-gray-800">GPT-3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Custom Knowledge (max 30000 characters)</label>
                    <textarea
                      name="customKnowledge"
                      value={agentData.customKnowledge}
                      onChange={handleInputChange}
                      maxLength={30000}
                      className="w-full bg-white bg-opacity-20 rounded-md p-3 text-white h-32"
                      placeholder="Enter custom knowledge"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Upload Knowledge Files</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full bg-white bg-opacity-20 rounded-md p-3 text-white"
                    />
                    <p className="text-sm text-gray-300 mt-1">
                      Supported file types: PDF, TXT, EPUB, and more.
                      <Link href="/supported-files" className="text-blue-300 hover:underline">
                        See full list
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 sm:mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                  >
                    Create Agent
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentPage;
 