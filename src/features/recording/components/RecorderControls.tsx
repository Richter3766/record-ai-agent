import React from "react";

interface RecorderControlsProps {
    status: 'idle' | 'recording' | 'paused' | 'stopped';
    elapsedSec: number; // 진행 시간(초)
    onStart(): void;
    onPause(): void;
    onResume(): void;
    onStop(): void;
}

export const RecorderControls: React.FC<RecorderControlsProps> = ({
                                                                      status,
                                                                      elapsedSec,
                                                                      onStart,
                                                                      onPause,
                                                                      onResume,
                                                                      onStop,
                                                                  }) => {
    // 시간 표시 포맷 (mm:ss)
    const formatTime = (sec: number) => {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-4 mb-2">
                <span className="text-base sm:text-lg font-bold">
                    🎙️ {status === 'recording'
                    ? '녹음중'
                    : status === 'paused'
                        ? '일시정지'
                        : status === 'stopped'
                            ? '완료'
                            : '대기'}
                </span>
                {(status === 'recording' || status === 'paused') && (
                    <span className="text-sm sm:text-base text-gray-500">{formatTime(elapsedSec)}</span> // responsive text size
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {(status === 'idle' || status === 'stopped') && (
                    <button 
                        className="btn w-full sm:w-auto min-w-[120px]" // vertical alignment on small screens
                        onClick={onStart}
                    >
                        시작
                    </button>
                )}
                {status === 'recording' && (
                    <>
                        <button 
                            className="btn w-full sm:w-auto min-w-[120px]" 
                            onClick={onPause}
                        >
                            일시정지
                        </button>
                        <button 
                            className="btn w-full sm:w-auto min-w-[120px]" 
                            onClick={onStop}
                        >
                            중지
                        </button>
                    </>
                )}
                {status === 'paused' && (
                    <>
                        <button 
                            className="btn w-full sm:w-auto min-w-[120px]" 
                            onClick={onResume}
                        >
                            재개
                        </button>
                        <button 
                            className="btn w-full sm:w-auto min-w-[120px]" 
                            onClick={onStop}
                        >
                            중지
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
