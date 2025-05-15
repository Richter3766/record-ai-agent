import type {AudioRecorder} from "./AudioRecorder.ts";

export class WebAudioRecorder implements AudioRecorder {
    private recorder: MediaRecorder | null = null;
    private stream: MediaStream | null = null;
    private chunks: Blob[] = [];

    private stopCallback: ((blob: Blob) => void) | null = null;
    private errorCallback: ((error: Error) => void) | null = null;

    async init() {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new MediaRecorder(this.stream);
        this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
        this.recorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'audio/webm' });
            this.stopCallback?.(blob);
            this.chunks = [];
        };
        this.recorder.onerror = (e) => {
            this.errorCallback?.(e.error);
        };
    }

    onStop(cb: (blob: Blob) => void) {
        this.stopCallback = cb;
    }

    onError(cb: (error: Error) => void) {
        this.errorCallback = cb;
    }

    async start() {
        if (!this.recorder) await this.init();
        this.recorder?.start();
    }

    pause() {
        this.recorder?.pause();
    }

    resume() {
        this.recorder?.resume();
    }

    stop() {
        this.recorder?.stop();
    }

    destroy() {
        this.recorder?.stream?.getTracks().forEach((t) => t.stop());
    }
}
