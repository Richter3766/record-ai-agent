import React from "react";
import type { RecordingChunk } from "../../recording/types/RecordingType.ts";
import TranscriptChunkBlock from "./TrnascripetChunkBlock.tsx";

interface TranscriptChunkListProps {
    chunks: RecordingChunk[];
    uploadingChunkIds: string[];
    transcripts: Record<string, string>;
    errors: Record<string, string>;
    onUpload: (id: string, audioUrl: string) => void;
    // AI 관련 props (필요하다면)
    onAskAI?: (id: string, transcript: string) => void;
    aiResponses?: Record<string, string>;
    aiRespondingIds?: string[];
}

export const TranscriptChunkList: React.FC<TranscriptChunkListProps& {
    onChunkClick?: (id: string) => void;
}> = ({
                                                                            chunks,
                                                                            uploadingChunkIds,
                                                                            transcripts,
                                                                            errors,
                                                                            onUpload,
                                                                            onAskAI,
                                                                            aiResponses,
                                                                            aiRespondingIds,
                                                                        }) => (
    <div className="flex flex-col gap-4 mt-4 max-h-[300px] lg:max-h-[400px] overflow-y-auto px-2"> 
        {chunks.length === 0 ? (
            <div className="text-gray-400 text-center py-4">녹음 청크가 없습니다.</div>
        ) : (
            chunks.map((chunk) => (
                <div key={chunk.id} className="transition-transform hover:scale-[1.02]">
                    <TranscriptChunkBlock
                        chunk={chunk}
                        isUploading={uploadingChunkIds.includes(chunk.id)}
                        transcript={transcripts[chunk.id]}
                        error={errors[chunk.id]}
                        onUpload={onUpload}
                        onAskAI={onAskAI}
                        aiResponse={aiResponses?.[chunk.id]}
                        isAIResponding={!!aiRespondingIds?.includes(chunk.id)}
                    />
                </div>
            ))
        )}
    </div>
);

export default TranscriptChunkList;
