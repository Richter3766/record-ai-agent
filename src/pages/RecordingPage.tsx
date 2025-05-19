import React from "react";

import { useUploadRecording } from "../features/recording/hooks/useUploadRecording";
import { RecorderControls } from "../features/recording/components/RecorderControls";
import {useRecorder} from "../features/recording/hooks/userRecorder.ts";
import {useSimpleRecordingTimer} from "../features/recording/hooks/useRecordingTimer.ts";
import {RecordingSplitView} from "../features/transcript/widgets/RecordingSplitView.tsx";


const RecordingPage: React.FC = () => {
    const {
        status,
        chunks,
        start,
        stop,
        pause,
        resume,
    } = useRecorder(1000);

    // 업로드/변환 상태 hook (chunk별로 관리)
    const {
        upload,
        transcripts,
        loadingIds: uploadingChunkIds,
        errors,
        // aiResponses, onAskAI 등 추가 가능
    } = useUploadRecording();

    // 경과 시간 (녹음 중일 때만)
    const elapsedSec = useSimpleRecordingTimer(status);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">🎙️ 녹음/변환 데모</h1>

            <RecorderControls
                status={status}
                elapsedSec={elapsedSec}
                onStart={start}
                onStop={stop}
                onPause={pause}
                onResume={resume}
            />

            <RecordingSplitView
                chunks={chunks}
                uploadingChunkIds={uploadingChunkIds}
                transcripts={transcripts}
                errors={errors}
                onUpload={upload}
                // onAskAI, aiResponses, aiRespondingIds 등도 필요시 주입
            />

            {/* (추가로 전체 초기화/다운로드 버튼, 안내 등도 필요시) */}
        </div>
    );
};

export default RecordingPage;
