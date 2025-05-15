import React from 'react';
import { RecorderControls } from '../features/recording/components/RecorderControls';
import { useRecorder } from "../features/recording/hooks/userRecorder.ts";
import {useUploadRecording} from "../features/recording/hooks/useUploadRecording.ts";

const RecordingPage: React.FC = () => {
    const { status, audioUrl, start, stop, pause, resume } = useRecorder();
    const { upload, transcript, loading } = useUploadRecording();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">🎙️ 녹음 테스트 페이지</h1>

            <RecorderControls
                status={status}
                onStart={start}
                onStop={stop}
                onPause={pause}
                onResume={resume}
            />

            {audioUrl && (
                <div className="mt-4 space-y-2">
                    <audio controls src={audioUrl}/>
                    <button onClick={() => upload(audioUrl)} disabled={loading}>
                        {loading ? '업로드 중...' : '서버로 업로드'}
                    </button>
                </div>
            )}

            {transcript && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                <h2 className="font-semibold mb-2">📝 변환된 스크립트</h2>
                    <p>{transcript}</p>
                </div>
            )}
        </div>
    );
};

export default RecordingPage;
