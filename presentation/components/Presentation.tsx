import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Upload,
  Settings,
  Share2,
  Server,
  TrendingUp,
  Play,
} from "lucide-react";

const Slide = ({ children, className = "" }) => (
  <div
    className={`h-screen w-screen flex items-center justify-center p-12 ${className}`}
  >
    {children}
  </div>
);

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9;

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="relative bg-gray-900 text-gray-100">
      {currentSlide === 0 && (
        <Slide className="bg-[#07082c]">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Image
                src="/icon.jpg"
                alt="Intervuo Icon"
                width={96}
                height={96}
                className="object-cover mr-4"
              />
              <div>
                <h1 className="text-6xl font-bold">Intervuo</h1>
              </div>
            </div>
            <p className="text-2xl">
              Create and Deploy Custom Voice Agents with Ease
            </p>
          </div>
        </Slide>
      )}
      {currentSlide === 1 && (
        <Slide className="bg-gray-800">
          <div className="space-y-8 max-w-4xl">
            <h2 className="text-3xl font-semibold text-center">
              Problem & Solution
            </h2>
            <div className="flex space-x-8">
              <div className="bg-red-900 p-6 rounded-lg flex-1 shadow-md">
                <h3 className="font-bold text-xl mb-4 text-red-300">Problem</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Complex AI voice agent creation</li>
                  <li>Time-consuming development</li>
                  <li>Challenging deployment and integration</li>
                </ul>
              </div>
              <div className="bg-green-900 p-6 rounded-lg flex-1 shadow-md">
                <h3 className="font-bold text-xl mb-4 text-green-300">
                  Solution: Intervuo
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>User-friendly web platform</li>
                  <li>Customizable domain-specific agents</li>
                  <li>Easy deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 2 && (
        <Slide className="bg-gray-900">
          <div className="space-y-8 max-w-4xl">
            <h2 className="text-3xl font-semibold text-center">Key Features</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-900 p-4 rounded-lg shadow-md">
                <User className="w-12 h-12 text-blue-300 mb-2" />
                <h3 className="font-bold text-lg mb-2">
                  Intuitive Agent Creation
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personalize with Name, and Avatar</li>
                  <li>Choose from a variety of voices and languages</li>
                </ul>
              </div>
              <div className="bg-purple-900 p-4 rounded-lg shadow-md">
                <Settings className="w-12 h-12 text-purple-300 mb-2" />
                <h3 className="font-bold text-lg mb-2">
                  Behaviour Customization
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Choice between LLMs for agents</li>
                  <li>Define agent greeting</li>
                  <li>Set Agent Prompt</li>
                </ul>
              </div>
              <div className="bg-green-900 p-4 rounded-lg shadow-md">
                <Upload className="w-12 h-12 text-green-300 mb-2" />
                <h3 className="font-bold text-lg mb-2">
                  Knowledge Integration
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Upload documents to define agent expertise</li>
                  <li>Provide knowledge text</li>
                </ul>
              </div>
              <div className="bg-orange-900 p-4 rounded-lg shadow-md">
                <Share2 className="w-12 h-12 text-orange-300 mb-2" />
                <h3 className="font-bold text-lg mb-2">Flexible Deployment</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use directly on Intervuo platform</li>
                  <li>Integrate via API with external platforms (Future)</li>
                </ul>
              </div>
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 3 && (
        <Slide className="bg-gray-800">
          <div className="bg-gray-800 h-screen w-screen flex flex-col items-center justify-center p-12">
            <h2 className="text-3xl font-semibold text-center text-gray-100 mb-8">
              User Journey: Creating an Agent
            </h2>
            <div className="grid grid-cols-3 gap-6 max-w-6xl">
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Step 1: Identity
                </h3>
                <Image
                  src="/agent-step-1.jpg"
                  alt="Agent Creation Step 1: Identity"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Step 2: Behavior
                </h3>
                <Image
                  src="/agent-step-2.jpg"
                  alt="Agent Creation Step 2: Behavior"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Step 3: Knowledge
                </h3>
                <Image
                  src="/agent-step-3.jpg"
                  alt="Agent Creation Step 3: Knowledge"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 4 && (
        <Slide className="bg-gray-800">
          <div className="bg-gray-800 h-screen w-screen flex flex-col items-center justify-center p-12">
            <h2 className="text-3xl font-semibold text-center text-gray-100 mb-8">
              User Journey: Agent Management and Interaction
            </h2>
            <div className="grid grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Manage Agents
                </h3>
                <Image
                  src="/agents-view.jpg"
                  alt="Manage Agents Dashboard"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Interact with Agent
                </h3>
                <Image
                  src="/agents-talk.jpg"
                  alt="Interact with Agent Interface"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 5 && (
        <Slide className="bg-gray-900">
          <div className="space-y-8 max-w-4xl">
            <h2 className="text-3xl font-semibold text-center">
              Technology & Architecture
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-900 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Frontend</h3>
                <p>React with Next.js</p>
              </div>
              <div className="bg-green-900 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Backend</h3>
                <p>Django Web Framework, Celery, Redis, JSON Web Tokens</p>
              </div>
              <div className="bg-purple-900 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">LLM Integration</h3>
                <p>OpenAI's GPT-4 variants</p>
              </div>
              <div className="bg-yellow-900 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Database</h3>
                <p>MySQL</p>
              </div>
              <div className="bg-red-900 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Text to Speech Solution</h3>
                <p>ElevenLabs API</p>
              </div>
              <div className="bg-indigo-900 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">Infrastructure</h3>
                <p>Google Cloud Platform, Docker</p>
              </div>
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 6 && (
        <Slide className="bg-gray-800">
          <div className="space-y-8 max-w-4xl">
            <h2 className="text-3xl font-semibold text-center">
              Scalability & Future Potential
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-900 p-4 rounded-lg shadow-md">
                <Server className="w-12 h-12 text-blue-300 mb-2" />
                <h3 className="font-bold text-lg mb-2">
                  Scalable Architecture
                </h3>
                <ul className="list-disc pl-5">
                  <li>Cloud First Architecture for easy scaling</li>
                  <li>Message Broker for handling tasks</li>
                  <li>Containerization with Docker</li>
                  <li>Security with JWT</li>
                </ul>
              </div>
              <div className="bg-green-900 p-4 rounded-lg shadow-md">
                <TrendingUp className="w-12 h-12 text-green-300 mb-2" />
                <h3 className="font-bold text-lg mb-2">
                  Potential Integrations
                </h3>
                <ul className="list-disc pl-5">
                  <li>Customer service</li>
                  <li>Education</li>
                  <li>Healthcare</li>
                  <li>Legal advice</li>
                </ul>
              </div>
            </div>
            <div className="bg-purple-900 p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Roadmap</h3>
              <ul className="list-disc pl-5">
                <li>Integrate with external platforms</li>
                <li>Add more LLM providers</li>
                <li>Add custom voices</li>
                <li>WebSockets for real-time interactions</li>
              </ul>
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 7 && (
        <Slide className="bg-gray-900">
          <div className="space-y-8 max-w-4xl text-center">
            <h2 className="text-3xl font-semibold">
              Demo: Creating a Customer Service Agent
            </h2>
            <div className="bg-gray-700 w-64 h-36 mx-auto flex items-center justify-center rounded-lg shadow-md">
              <Play className="w-16 h-16 text-blue-300" />
            </div>
          </div>
        </Slide>
      )}
      {currentSlide === 8 && (
        <Slide className="bg-[#07082c]">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Image
                src="/icon.jpg"
                alt="Intervuo Icon"
                width={96}
                height={96}
                className="object-cover mr-4"
              />
              <div>
                <h1 className="text-6xl font-bold">Intervuo</h1>
              </div>
            </div>
            <p className="text-2xl"></p>
            <div className="bg-gray-800 text-blue-300 py-3 px-6 rounded-full inline-block font-bold text-xl">
              Join us in shaping the future of AI assistance
            </div>
          </div>
        </Slide>
      )}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
