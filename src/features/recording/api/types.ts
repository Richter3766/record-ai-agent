export interface UploadRecordingResponse {
    id: string;
    fileUrl: string;
    filename: string;
    duration: number;         // 초 단위
    transcript: string;
    createdAt: string;        // ISO 형식 (서버 기준)
}
