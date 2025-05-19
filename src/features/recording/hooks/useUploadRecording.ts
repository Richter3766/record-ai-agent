import { useState } from 'react';
import type { UploadRecordingResponse } from '../api/types';
import { uploadRecording } from "../api/uploadingRecording.ts";

// chunkId 기준 상태 관리
export const useUploadRecording = () => {
    // 각 chunk의 transcript, 로딩, 에러
    const [transcripts, setTranscripts] = useState<Record<string, string>>({});
    const [loadingIds, setLoadingIds] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 개별 청크 업로드
    const upload = async (chunkId: string, audioUrl: string) => {
        if (!audioUrl) return;

        setLoadingIds((prev) => [...prev, chunkId]);
        setErrors((prev) => ({ ...prev, [chunkId]: "" }));

        try {
            const blob = await fetch(audioUrl).then((res) => res.blob());
            const result: UploadRecordingResponse = await uploadRecording({ blob });
            setTranscripts((prev) => ({ ...prev, [chunkId]: result.transcript }));
        } catch (err) {
            console.error(`청크(${chunkId}) 업로드 실패:`, err);
            setErrors((prev) => ({ ...prev, [chunkId]: "업로드 실패" }));
        } finally {
            setLoadingIds((prev) => prev.filter((id) => id !== chunkId));
        }
    };

    return {
        upload, // (chunkId, audioUrl) => Promise<void>
        transcripts, // Record<string, string>
        loadingIds,  // string[]: 현재 업로드 중인 청크 id들
        errors,      // Record<string, string>
    };
};
