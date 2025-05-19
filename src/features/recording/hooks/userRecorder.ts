import { useEffect, useRef, useState } from 'react';
import { createAudioRecorder } from '../infrastructure/createAudioRecorder';
import type { AudioRecorder } from "../entities/AudioRecorder.ts";
import type { RecordingChunk, RecordingStatus } from "../types/RecordingType.ts";

export const useRecorder = (chunkDurationMs = 60000) => {
    const [status, setStatus] = useState<RecordingStatus>('idle');
    const [chunks, setChunks] = useState<RecordingChunk[]>([]);
    const [fullAudioUrl, setFullAudioUrl] = useState<string | null>(null); // 전체 오디오(필요시)
    const recorderRef = useRef<AudioRecorder | null>(null);

    // 초기화 및 이벤트 등록
    useEffect(() => {
        const recorder = createAudioRecorder();

        // 청크 단위 콜백: chunks 배열에 추가
        recorder.onChunkReady?.((blob, startTime, endTime) => {
            const url = URL.createObjectURL(blob);
            setChunks(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    audioUrl: url,
                    startTime,
                    endTime,
                }
            ]);
        });

        // 전체 녹음 종료 콜백 (stop 호출 시)
        recorder.onStop((blob) => {
            // 전체 오디오 저장(선택사항)
            const url = URL.createObjectURL(blob);
            setFullAudioUrl(url);
            setStatus('stopped');
        });

        recorder.onError((err) => {
            console.error('녹음 에러:', err);
        });

        recorderRef.current = recorder;

        // unmount시 리소스 정리 (메모리 누수 방지)
        return () => {
            recorderRef.current?.destroy();
            setChunks(prev => {
                prev.forEach(chunk => URL.revokeObjectURL(chunk.audioUrl));
                return [];
            });
            if (fullAudioUrl) URL.revokeObjectURL(fullAudioUrl);
        };
        // eslint-disable-next-line
    }, []); // mount/unmount에만 반응

    // reset: stop 이후 새 녹음을 위해 상태 초기화
    const reset = () => {
        recorderRef.current?.destroy();

        // chunks 정리
        setChunks(prev => {
            prev.forEach(chunk => URL.revokeObjectURL(chunk.audioUrl));
            return [];
        });
        if (fullAudioUrl) URL.revokeObjectURL(fullAudioUrl);

        // 새 recorder 재생성
        const newRecorder = createAudioRecorder();

        newRecorder.onChunkReady?.((blob, startTime, endTime) => {
            const url = URL.createObjectURL(blob);
            setChunks(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    audioUrl: url,
                    startTime,
                    endTime,
                }
            ]);
        });

        newRecorder.onStop((blob) => {
            const url = URL.createObjectURL(blob);
            setFullAudioUrl(url);
            setStatus('stopped');
        });

        newRecorder.onError((err) => {
            console.error('녹음 에러:', err);
        });

        recorderRef.current = newRecorder;

        setFullAudioUrl(null);
        setStatus('idle');
    };

    // 녹음 제어 함수들
    const start = () => {
        if (status === 'stopped') {
            reset();
        } else {
            // 녹음 전에 기존 chunk 정리
            setChunks(prev => {
                prev.forEach(chunk => URL.revokeObjectURL(chunk.audioUrl));
                return [];
            });
            setFullAudioUrl(null);
        }
        // timeslice로 chunk 분할
        recorderRef.current?.start({ timeSliceMs: chunkDurationMs });
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
        recorderRef.current?.stop();
        // status는 onStop에서 변경됨
    };

    return {
        status,
        chunks,         // chunk 단위 오디오 (UI에서 리스트로 사용)
        fullAudioUrl,   // 전체 오디오 (필요시 다운로드, 리뷰 등)
        start,
        pause,
        resume,
        stop,
        reset,
    };
};
