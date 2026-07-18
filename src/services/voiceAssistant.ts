type CommandObserver = (transcript: string) => void;

class VoiceAssistantService {
  private static instance: VoiceAssistantService;
  private recognition: any = null;
  private observers: CommandObserver[] = [];
  public isSupported: boolean = false;
  private continuousListening: boolean = false;
  public status: 'idle' | 'listening' | 'processing' | 'executed' = 'idle';
  private statusListeners: ((status: string) => void)[] = [];

  private constructor() {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      this.isSupported = true;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase().trim();
        this.setStatus('processing');
        
        // Notify observers (React hooks)
        this.observers.forEach(obs => obs(transcript));
      };

      this.recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          this.continuousListening = false;
          this.setStatus('idle');
        }
      };

      this.recognition.onend = () => {
        // Automatically restart if continuous listening is enabled
        if (this.continuousListening) {
          try {
            this.recognition.start();
          } catch (e) {
            // Might already be started
          }
        } else {
          this.setStatus('idle');
        }
      };
      
      this.recognition.onstart = () => {
        this.setStatus('listening');
      };
    }
  }

  public static getInstance(): VoiceAssistantService {
    if (!VoiceAssistantService.instance) {
      VoiceAssistantService.instance = new VoiceAssistantService();
    }
    return VoiceAssistantService.instance;
  }

  public setStatus(s: 'idle' | 'listening' | 'processing' | 'executed') {
    this.status = s;
    this.statusListeners.forEach(l => l(s));
  }

  public onStatusChange(callback: (status: string) => void) {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(l => l !== callback);
    };
  }

  public subscribe(observer: CommandObserver) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }

  public startListening() {
    if (!this.isSupported || !this.recognition) return;
    this.continuousListening = true;
    try {
      this.recognition.start();
    } catch (e) {
      // Ignored if already started
    }
  }

  public stopListening() {
    this.continuousListening = false;
    if (this.recognition) {
      this.recognition.stop();
    }
    this.setStatus('idle');
  }

  public speak(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined') return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
    }
    
    window.speechSynthesis.speak(utterance);
  }
  
  public stopSpeaking() {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
  }
}

export const voiceAssistant = VoiceAssistantService.getInstance();
