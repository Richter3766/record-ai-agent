import { useEffect, useRef, useState } from 'react';
import { createAudioRecorder } from '../infrastructure/createAudioRecorder';
import type {AudioRecorder} from "../entities/AudioRecorder.ts";

// 상태 정의
export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped';

export const useRecorder = () => {
    const [status, setStatus] = useState<RecordingStatus>('idle');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const recorderRef = useRef<AudioRecorder | null>(null);

    // 초기 recorder 세팅
    useEffect(() => {
        const recorder = createAudioRecorder();
        recorder.onStop((blob) => {
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setStatus('stopped');
        });
        recorder.onError((err) => {
            console.error('녹음 에러:', err);
        });

        recorderRef.current = recorder;

        return () => {
            recorderRef.current?.destroy();
            if (audioUrl) URL.revokeObjectURL(audioUrl); // 정리
        };
    }, []);

    // reset: stop 이후 새 녹음을 위해 상태 초기화
    const reset = () => {
        recorderRef.current?.destroy();

        const newRecorder = createAudioRecorder();
        newRecorder.onStop((blob) => {
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setStatus('stopped');
        });
        newRecorder.onError((err) => {
            console.error('녹음 에러:', err);
        });

        recorderRef.current = newRecorder;

        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
        setStatus('idle');
    };


    // 녹음 제어 함수들
    const start = () => {
        if (status === 'stopped') {
            reset();
        }
        recorderRef.current?.start();
        setStatus('recording');
    };

    const pause = () => {
        recorderRef.current?.pause();
        setStatus('paused');
    };

    const resume = () => {
        recorderRef.current?.resume();
        setStatus('recording');
    };

    const stop = () => {
        recorderRef.current?.stop(); // 상태는 onStop에서 설정됨
    };

    return {
        status,
        audioUrl,
        start,
        pause,
        resume,
        stop,
        reset, // 필요 시 UI에서 명시적으로 호출 가능
    };
};
