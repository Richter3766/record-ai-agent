import React, { useState } from "react";
import type { RecordingChunk } from "../../recording/types/RecordingType.ts";
import TranscriptChunkList from "../components/TranscriptChunkList.tsx";
import {TranscriptDetailPane} from "../components/TranscriptDetailPane.tsx";

export const RecordingSplitView: React.FC<{
    chunks: RecordingChunk[];
    uploadingChunkIds: string[];
    transcripts: Record<string, string>;
    errors: Record<string, string>;
    onUpload: (id: string, audioUrl: string) => void;
}> = ({
          chunks, uploadingChunkIds, transcripts, errors, onUpload,
      }) => {
    const [selectedChunkId, setSelectedChunkId] = useState<string | null>(null);
    const selectedChunk = chunks.find(c => c.id === selectedChunkId);

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* 좌측: 청크 리스트 */}
            <div className="w-full lg:w-1/2 lg:max-w-[320px] lg:min-w-[180px] border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0">
                <TranscriptChunkList
                    chunks={chunks}
                    uploadingChunkIds={uploadingChunkIds}
                    transcripts={transcripts}
                    errors={errors}
                    onUpload={onUpload}
                    onChunkClick={setSelectedChunkId}
                />
            </div>

            {/* 우측: 상세 transcript 뷰 */}
            <div className="flex-1">
                <TranscriptDetailPane
                    chunk={selectedChunk}
                    transcript={transcripts[selectedChunkId ?? ""]}
                    isLoading={false}
                    error={errors[selectedChunkId ?? ""]}
                />
            </div>
        </div>
    );
};
