type CommandObserver = (transcript: string) => void;
type DebugObserver = (debugInfo: { transcript: string; recognized: string; status: string }) => void;

class VoiceAssistantService {
  private static instance: VoiceAssistantService;
  private recognition: any = null;
  private observers: CommandObserver[] = [];
  private debugObservers: DebugObserver[] = [];
  public isSupported: boolean = false;
  private continuousListening: boolean = false;
  public status: 'idle' | 'listening' | 'processing' | 'executed' = 'idle';
  private statusListeners: ((status: string) => void)[] = [];
  private isCurrentlySpeaking: boolean = false;

  private constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      this.isSupported = true;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        console.log("[VOICE] Transcript:", transcript);
        this.setStatus('processing');
        
        // Notify observers (React hooks)
        this.observers.forEach(obs => obs(transcript));
      };

      this.recognition.onerror = (event: any) => {
        console.error("[VOICE ERROR]:", event.error);
        if (event.error === 'not-allowed') {
          this.continuousListening = false;
          this.setStatus('idle');
        }
      };

      this.recognition.onend = () => {
        // Restart automatically if we are still meant to be listening and not speaking
        if (this.continuousListening && !this.isCurrentlySpeaking) {
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
        console.log("[VOICE] Starting recognition");
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

  public subscribeDebug(observer: DebugObserver) {
    this.debugObservers.push(observer);
    return () => {
      this.debugObservers = this.debugObservers.filter(obs => obs !== observer);
    };
  }

  public emitDebug(debugInfo: { transcript: string; recognized: string; status: string }) {
    this.debugObservers.forEach(obs => obs(debugInfo));
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
    
    // Stop ongoing speech
    window.speechSynthesis.cancel();
    
    // Pause recognition temporarily while speaking so it doesn't hear itself
    if (this.recognition && this.continuousListening) {
      this.recognition.stop();
    }
    this.isCurrentlySpeaking = true;
    console.log("[VOICE] Speaking greeting/confirmation:", text);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isCurrentlySpeaking = false;
      if (onEnd) onEnd();
      
      // Resume listening
      if (this.continuousListening && this.recognition) {
        try {
          this.recognition.start();
        } catch (e) {
          // ignore
        }
      }
    };
    
    window.speechSynthesis.speak(utterance);
  }

  public executeCommand(commandFunc: () => void, confirmMessage: string) {
    this.setStatus('executed');
    console.log("[VOICE] Executing action. Confirmation:", confirmMessage);
    this.speak(confirmMessage);
    commandFunc();
  }

  public toggleVoiceMode(enable: boolean) {
    if (enable) {
      this.startListening();
    } else {
      this.stopListening();
      window.speechSynthesis.cancel();
    }
  }

  public destroy() {
    this.stopListening();
    this.observers = [];
    this.statusListeners = [];
    this.debugObservers = [];
    window.speechSynthesis.cancel();
  }
}

export const voiceAssistant = VoiceAssistantService.getInstance();
