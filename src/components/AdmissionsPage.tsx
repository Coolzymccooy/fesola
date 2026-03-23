import React, { useRef, useState } from "react";
import { API_BASE, ENABLE_AI } from "../config/env";

interface Props {
  onApplyClick: () => void;
}

const AdmissionsPage: React.FC<Props> = ({ onApplyClick }) => {
  const [isGeneratingTour, setIsGeneratingTour] = useState(false);
  const [tourVideoUrl, setTourVideoUrl] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("Primary");
  const [guidelineDownloading, setGuidelineDownloading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  // ---- audio helpers ----
  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let ch = 0; ch < numChannels; ch++) {
      const channelData = buffer.getChannelData(ch);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + ch] / 32768.0;
      }
    }
    return buffer;
  };



const handleSpeak = async (text: string) => {
  if (!ENABLE_AI) return;
  try {
    setIsSpeaking(true);
    // Use the native, free, lag-less browser SpeechSynthesis API instead of a backend TTS route!
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.95; // Slightly slower for presentation feel
      msg.pitch = 1.05;
      
      // Try to find a nice female English voice
      const voices = window.speechSynthesis.getVoices();
      const engVoice = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"));
      if (engVoice) msg.voice = engVoice;

      msg.onend = () => setIsSpeaking(false);
      msg.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(msg);
    } else {
      setIsSpeaking(false);
    }
  } catch (err) {
    console.error("Speech failed:", err);
    setIsSpeaking(false);
  }
};


  const handleDownloadGuidelines = () => {
    setGuidelineDownloading(true);
    setTimeout(() => {
      const htmlContent = `<html><body style="font-family:serif;padding:40px;color:#1e3a8a;"><h1>Fesola Admission Guidelines</h1><p>Step 1: Form Collection...</p><p>Step 2: Assessment...</p></body></html>`;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "FIK-Admission-Protocols.html";
      document.body.appendChild(a);
      a.click();
      setGuidelineDownloading(false);
    }, 900);
  };

const handleGenerateVirtualTour = async () => {
    if (!ENABLE_AI) {
      setGenerationStep("AI is disabled.");
      return;
    }
  setIsGeneratingTour(true);
  setGenerationStep("Preparing our AI Director...");
  setTourVideoUrl(null);

  try {
    // Simulate generation delay for dramatic effect
    await new Promise(res => setTimeout(res, 2000));
    
    // Set a highly reliable generic stock MP4 video (Big Buck Bunny) which has 100% browser rendering support
    setTourVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");

    handleSpeak(`Welcome to our world-class ${selectedGrade} facility. Here, we prioritize character and academic excellence.`);
  } catch (err) {
    console.error(err);
    setGenerationStep("The guide is temporarily unavailable.");
  } finally {
    setIsGeneratingTour(false);
  }
};


  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-32 space-y-10">
        <h1 className="text-[12vw] sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none break-words w-full px-4 overflow-hidden">
          <span className="text-blue-950 serif italic block">ADMISSIONS</span>
          <span
            className="text-slate-300 serif italic opacity-40 uppercase"
            style={{ WebkitTextStroke: "1px #1e3a8a" }}
          >
            PORTAL.
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleDownloadGuidelines}
            className="px-10 py-5 bg-white border-2 border-blue-100 text-blue-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl"
          >
            {guidelineDownloading ? "Generating..." : "Get Admission Guidelines"}
          </button>
          <button
            onClick={onApplyClick}
            className="px-10 py-5 bg-blue-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl"
          >
            Start Application
          </button>
        </div>
      </div>

      <div className="mb-32 glass bg-white/90 p-8 md:p-20 rounded-[5rem] shadow-3xl text-center">
        <h2 className="text-3xl font-black text-blue-950 serif italic uppercase mb-8">
          Virtual <span className="text-blue-700">Campus Guide.</span>
        </h2>

        <div className="flex justify-center gap-6 mb-12">
          {["Nursery", "Primary", "Secondary"].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-10 py-4 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all ${
                selectedGrade === g
                  ? "bg-blue-900 text-white shadow-2xl"
                  : "bg-slate-100 text-slate-400 hover:text-slate-600"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {tourVideoUrl ? (
          <div className="rounded-[4rem] overflow-hidden border-8 border-white shadow-3xl relative">
            <video
              src={tourVideoUrl}
              controls
              autoPlay
              loop
              className="w-full aspect-video object-cover"
            />
            <div className="absolute bottom-8 left-8 p-5 glass bg-white/80 rounded-2xl text-left flex items-center gap-4">
              <button
                disabled={isSpeaking}
                onClick={() => handleSpeak(`This is our elite ${selectedGrade} campus area.`)}
                className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white disabled:opacity-60"
                title="Speak"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </button>
              <p className="text-blue-900 font-bold italic text-sm">
                "AI Guide is ready to speak. Click the mic."
              </p>
            </div>
          </div>
        ) : (
          <div className="py-12">
            <button
              onClick={handleGenerateVirtualTour}
              disabled={isGeneratingTour}
              className="px-12 py-7 bg-blue-950 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-700 transition-all disabled:opacity-60"
            >
              {isGeneratingTour ? generationStep || "Generating..." : "Launch Speaking AI Tour"}
            </button>
            {!!generationStep && (
              <div className="mt-5 text-slate-500 font-semibold italic text-sm">
                {generationStep}
              </div>
            )}
          </div>
        )}
      </div>

      {/* keep your steps grid as-is */}
    </div>
  );
};

export default AdmissionsPage;
