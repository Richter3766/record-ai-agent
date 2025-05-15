export interface AudioRecorder {
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    destroy(): void;

    onStop(callback: (blob: Blob) => void): void;
    onError(callback: (error: Error) => void): void;
}

