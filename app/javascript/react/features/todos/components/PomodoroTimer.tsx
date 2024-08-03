import React, { useState, useEffect } from 'react';

//CSRFトークンを取得する関数の追加
const getCsrfToken = () => {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
};

const PomodoroTimer = () => {
    const [time, setTime] = useState(15); // 25分 = 1500秒
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false) //休憩時間の状態
    const [pomodoroCount, setPomodoroCount] = useState(0) //ポモドーロ回数の状態
    const [volume, setVolume] = useState(0.5);
    // バックエンドからポモドーロ回数を取得する関数を追加
    const fetchPomodoroCount = async () => {
      try {
        const response = await fetch('/pomodoro_sessions/count', {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCsrfToken()
          }
        });
        if (!response.ok) {
          throw new Error('サーバーエラーが発生しました。');
        }
        const data = await response.json();
        setPomodoroCount(data.count);
      } catch (error) {
        console.error('ポモドーロカウント取得エラー:', error);
      }
    };

    //コンポーネントの初期化時にポモドーロ回数を取得するように変更
    useEffect(() => {
      fetchPomodoroCount();
    }, []);

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
              setTime(15);
            } else {
              setIsBreak(true);
              setTime(7);
              setPomodoroCount(prevCount => {
                const newCount = prevCount + 1;
                savePomodoroSession(newCount);
                return newCount;
              }); //ポモドーロ回数を増やす
            }
        }
    }, [time, isRunning, isBreak]);

    const savePomodoroSession = async (count) => {
      const csrfToken = getCsrfToken();
      try{
        const response = await fetch('/pomodoro_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          },
          body: JSON.stringify({
            start_time: new Date().toISOString(),
            end_time: null,
            count: count
          })
        });
        if (!response.ok) {
          throw new Error('サーバーエラーが発生しました。');
        }
      } catch (error) {
        console.error('ポモドーロセーブエラー:', error);
      }
    };

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
        setTime(15);
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
