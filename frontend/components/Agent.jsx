import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';

const AgentTalk = () => {
  const { id } = useParams();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  // In a real application, you'd fetch the agent data based on the ID
  const agent = {
    id: parseInt(id),
    name: "Exam Preparation",
    icon: "🎓"
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const latestResult = event.results[event.results.length - 1];
        const latestTranscript = latestResult[0].transcript;
        setTranscript(latestTranscript);

        // Clear the previous timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
          sendAudioToBackend(latestTranscript);
        }, 1000); // Wait for 1 second of silence before sending
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(prevState => !prevState);
    if (!isListening) {
      recognitionRef.current.start();
      setTranscript(''); // Clear the transcript when starting a new session
    } else {
      recognitionRef.current.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (transcript.trim()) {
        sendAudioToBackend(transcript);
      }
    }
  };

  const sendAudioToBackend = async (text) => {
    if (!text.trim()) return;
    console.log('Sending to backend:', text);
    try {
      const response = await fetch('http://localhost:8000/api/process-speech/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    } catch (error) {
      console.error('Error sending audio to backend:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{agent.name} - Agent Talk</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{agent.name}</h1>
        <div className="text-6xl mb-4">{agent.icon}</div>
        <button
          onClick={toggleListening}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isListening ? '🛑 Stop' : '🎙️ Start'} Listening
        </button>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Latest Transcript</h2>
          <p className="p-2 bg-gray-100 rounded">{transcript}</p>
        </div>
        <audio ref={audioRef} className="hidden" />
      </div>
    </>
  );
};

export default AgentTalk;