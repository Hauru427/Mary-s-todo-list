import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    const [time, setTime] = useState(1500); // 25分 = 1500秒
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false) //休憩時間の状態
    const [pomodoroCount, setPomodoroCount] = useState(0) //ポモドーロ回数の状態
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        let timer: number;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if (time === 5) {
            playBeep();
        }
        if (time === 0 && isRunning) {
            playChime();
            if(isBreak) {
              setIsBreak(false);
              setTime(1500);
            } else {
              setIsBreak(true);
              setTime(300);
              setPomodoroCount(prevCount => prevCount + 1); //ポモドーロ回数を増やす
            }
        }
    }, [time, isRunning, isBreak]);

    const playBeep = () => {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, context.currentTime);
        gainNode.gain.setValueAtTime(volume, context.currentTime);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.5);
    };

    const playChime = () => {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, context.currentTime);
        gainNode.gain.setValueAtTime(volume, context.currentTime);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.5);

        setTimeout(() => playBeep(), 500);
        setTimeout(() => playBeep(), 1000);
    };

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setIsBreak(false);
        setTime(1500);
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(event.target.value));
    };

    return (
      <div className="container mt-4">
          <div className="text-center">
              <h2 className="mb-4">ポモドーロタイマー</h2>
              <div className="display-4 mb-4">
                  {`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}
              </div>
              <div className="mb-4 text-center">
                <h4>ポモドーロ回数:{pomodoroCount}</h4>
              </div>
              <div className="btn-group mb-4" role="group">
                  <button className="btn btn-success" onClick={handleStart}>開始</button>
                  <button className="btn btn-warning" onClick={handlePause}>一時停止</button>
                  <button className="btn btn-danger" onClick={handleReset}>リセット</button>
              </div>
              <div className="form-group">
                  <label htmlFor="volume">音量:</label>
                  <input type="range" id="volume" name="volume" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="form-control-range" />
              </div>
          </div>
      </div>
  );
};

export default PomodoroTimer;
