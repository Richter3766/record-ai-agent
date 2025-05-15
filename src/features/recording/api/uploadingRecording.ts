import apiClient from "../../../shared/lib/api/apiClient.ts";
import type { UploadRecordingResponse } from './types';

export interface UploadRecordingParams {
    blob: Blob;
    filename?: string;
}

export const uploadRecording = async (
    params: UploadRecordingParams
): Promise<UploadRecordingResponse> => {
    const formData = new FormData();
    formData.append('file', params.blob, params.filename ?? 'recording.webm');

    const res = await apiClient.post<UploadRecordingResponse>(
        '/recordings',
        formData
    );

    return res.data;
};