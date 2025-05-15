import React from "react";

interface Props {
    status: 'idle' | 'recording' | 'paused' | 'stopped';
    onStart(): void;
    onPause(): void;
    onResume(): void;
    onStop(): void;
}

export const RecorderControls: React.FC<Props> = ({
                                                      status,
                                                      onStart,
                                                      onPause,
                                                      onResume,
                                                      onStop,
                                                  }) => {
    return (
        <div className="flex gap-2">
            {(status === 'idle' || status === 'stopped') && (
                <button onClick={onStart}>Start</button>
            )}
            {status === 'recording' && <button onClick={onPause}>Pause</button>}
            {status === 'paused' && <button onClick={onResume}>Resume</button>}
            {(status === 'recording' || status === 'paused') && (
                <button onClick={onStop}>Stop</button>
            )}
        </div>
    );
};
