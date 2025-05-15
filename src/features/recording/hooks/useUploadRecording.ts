import { useState } from 'react';
import type { UploadRecordingResponse } from '../api/types';
import {uploadRecording} from "../api/uploadingRecording.ts";

export const useUploadRecording = () => {
    const [transcript, setTranscript] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (audioUrl: string | null) => {
        if (!audioUrl) return;

        setLoading(true);
        setError(null);

        try {
            const blob = await fetch(audioUrl).then((res) => res.blob());
            const result: UploadRecordingResponse = await uploadRecording({ blob });
            setTranscript(result.transcript);
        } catch (err) {
            console.error('업로드 실패:', err);
            setError('업로드 실패');
        } finally {
            setLoading(false);
        }
    };

    return {
        upload,
        transcript,
        loading,
        error,
    };
};
