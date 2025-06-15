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
        <div className="flex flex-col gap-2 items-center p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-4 mb-4">
                <span className={`text-xl sm:text-2xl font-bold ${status === 'recording' ? 'text-red-500 animate-pulse-slow' : ''}`}>
                    🎙️ {status === 'recording'
                        ? '녹음중'
                        : status === 'paused'
                            ? '일시정지'
                            : status === 'stopped'
                                ? '완료'
                                : '대기'}
                </span>
                {(status === 'recording' || status === 'paused') && (
                    <span className="text-base sm:text-lg text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                        {formatTime(elapsedSec)}
                    </span>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {(status === 'idle' || status === 'stopped') && (
                    <button 
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full
                            shadow-lg hover:bg-blue-700 active:bg-blue-800 
                            transform hover:scale-105 transition-all duration-150
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            w-full sm:w-auto min-w-[140px]"
                        onClick={onStart}
                    >
                        시작하기
                    </button>
                )}
                {status === 'recording' && (
                    <>
                        <button 
                            className="px-6 py-2.5 bg-yellow-500 text-white font-medium rounded-full
                                shadow-lg hover:bg-yellow-600 active:bg-yellow-700
                                transform hover:scale-105 transition-all duration-150
                                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                                w-full sm:w-auto min-w-[140px]"
                            onClick={onPause}
                        >
                            일시정지
                        </button>
                        <button 
                            className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-full
                                shadow-lg hover:bg-red-600 active:bg-red-700
                                transform hover:scale-105 transition-all duration-150
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                                w-full sm:w-auto min-w-[140px]"
                            onClick={onStop}
                        >
                            중지
                        </button>
                    </>
                )}
                {status === 'paused' && (
                    <>
                        <button 
                            className="px-6 py-2.5 bg-green-500 text-white font-medium rounded-full
                                shadow-lg hover:bg-green-600 active:bg-green-700
                                transform hover:scale-105 transition-all duration-150
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                w-full sm:w-auto min-w-[140px]"
                            onClick={onResume}
                        >
                            재개
                        </button>
                        <button 
                            className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-full
                                shadow-lg hover:bg-red-600 active:bg-red-700
                                transform hover:scale-105 transition-all duration-150
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                                w-full sm:w-auto min-w-[140px]"
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
