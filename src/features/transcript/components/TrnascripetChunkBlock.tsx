import React from "react";
import type { RecordingChunk } from "../../recording/types/RecordingType.ts";

interface TranscriptChunkBlockProps {
    chunk: RecordingChunk;
    isUploading: boolean;
    transcript?: string;
    error?: string;
    onUpload: (id: string, audioUrl: string) => void;
    onAskAI?: (id: string, transcript: string) => void;
    aiResponse?: string;
    isAIResponding?: boolean;
}

export const TranscriptChunkBlock: React.FC<TranscriptChunkBlockProps> = ({
    chunk,
    isUploading,
    transcript,
    error,
    onUpload,
    onAskAI,
    aiResponse,
    isAIResponding,
}) => {
    // 시간 포맷 (ms → mm:ss)
    const formatTime = (ms: number) => {
        const sec = Math.floor(ms / 1000);
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
            {/* 시간 정보 */}
            <div className="text-xs text-gray-500 font-medium mb-2">
                [{formatTime(chunk.startTime)} ~ {formatTime(chunk.endTime)}]
            </div>
            {/* 오디오 플레이어 */}
            <audio controls src={chunk.audioUrl} className="w-full mb-3" />
            {/* 업로드/변환 버튼 및 상태 */}
            <div className="flex gap-2 items-center">
                <button
                    disabled={isUploading}
                    onClick={() => onUpload(chunk.id, chunk.audioUrl)}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm
                        transform hover:scale-105 transition-all duration-150
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isUploading ? 
                            'bg-gray-300 cursor-not-allowed' : 
                            'bg-indigo-500 text-white shadow-md hover:bg-indigo-600 active:bg-indigo-700 focus:ring-indigo-500'
                        }`}
                >
                    {isUploading ? "변환 중..." : "업로드/변환"}
                </button>
                {error && <span className="text-red-500 text-xs font-medium">{error}</span>}
            </div>
            {/* 변환 결과(스크립트) */}
            {transcript && (
                <textarea
                    className="w-full mt-3 p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg
                        focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                        transition-all duration-200"
                    value={transcript}
                    readOnly
                    rows={Math.max(2, Math.ceil(transcript.length / 40))}
                />
            )}
            {/* AI 응답 요청 및 결과 (선택적) */}
            {transcript && onAskAI && (
                <div className="flex flex-col gap-2 mt-3">
                    <button
                        disabled={isAIResponding}
                        className={`self-end px-4 py-1.5 rounded-full text-sm font-medium
                            transform hover:scale-105 transition-all duration-150
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${isAIResponding ?
                                'bg-gray-300 cursor-not-allowed' :
                                'bg-green-500 text-white shadow-md hover:bg-green-600 active:bg-green-700 focus:ring-green-500'
                            }`}
                        onClick={() => onAskAI(chunk.id, transcript)}
                    >
                        {isAIResponding ? "AI 응답 중..." : "AI에게 질문"}
                    </button>
                    {aiResponse && (
                        <div className="mt-1 p-3 bg-green-50 border border-green-100 rounded-lg text-sm">
                            <b className="text-green-700">AI 응답:</b> {aiResponse}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TranscriptChunkBlock;
