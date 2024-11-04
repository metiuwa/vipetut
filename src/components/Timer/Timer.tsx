import { useState, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "@Components/Common/Button";
import {
  useToggleTimer,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useTimer,
  useBreakStarted,
  useAudioVolume,
  useAlarmOption,
} from "@Store";
import toast from "react-hot-toast";
import { secondsToTime, formatDisplayTime } from "@Utils/utils";
import { successToast } from "@Utils/toast";
import clsx from "clsx";

export const Timer = () => {
  const { shortBreakLength, setShortBreak } = useShortBreakTimer();
  const { longBreakLength, setLongBreak } = useLongBreakTimer();
  const { pomodoroLength, setPomodoroLength } = usePomodoroTimer();
  const { hasStarted, setHasStarted } = useHasStarted();
  const { breakStarted, setBreakStarted } = useBreakStarted();
  const [breakLength, setBreakLength] = useState(shortBreakLength);
  const [timer, setTimer] = useState(pomodoroLength);
  const { setTimerQueue } = useTimer();
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [sessionType, setSessionType] = useState("Session");
  const { setIsTimerToggled } = useToggleTimer();
  const { alarm } = useAlarmOption();
const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audioVolume } = useAudioVolume();

  useEffect(() => {
    setHasStarted(timerIntervalId !== null);
  }, [timerIntervalId]);

  useEffect(() => {
    if (timer === 0) {
      handleTimerCompletion();
    }
  }, [timer, sessionType, audioVolume]);

  useEffect(() => {
    setTimer(pomodoroLength);
  }, [pomodoroLength]);

  useEffect(() => {
    updateTimerDisplay();
  }, [timer]);

  useEffect(() => {
    updateDocumentTitle();
  }, [hasStarted, timerMinutes, timerSeconds, sessionType]);

  const handleTimerCompletion = () => {
    setTimerQueue(0);
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
      audioRef.current.play();
    }
    if (sessionType === "Session") {
      startBreak();
    } else {
      startPomodoro();
    }
  };

  const startBreak = () => {
    setSessionType("Break");
    setTimer(breakLength);
    setBreakStarted(true);
    showToast("Mola Vakti", "😇", breakLength * 1000);
  };

  const startPomodoro = () => {
    setSessionType("Session");
    setTimer(pomodoroLength);
    setBreakStarted(false);
    setTimerQueue(pomodoroLength);
    toast.dismiss();
    showToast("Çalışma Vakti", "📚", breakLength * 1000);
  };

  const showToast = (message, icon, duration) => {
    toast(
      (t) => (
        <div className="flex items-center justify-between">
          <div>{message}</div>
          <IoCloseSharp
            className="cursor-pointer text-red-500 hover:bg-red-200"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      ),
      {
        duration,
        icon,
        style: {
          borderRadius: "10px",
          padding: "16px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  const updateTimerDisplay = () => {
    const [minutes, seconds] = secondsToTime(timer);
    setTimerMinutes(minutes);
    setTimerSeconds(seconds);
  };

  const updateDocumentTitle = () => {
    const icon = sessionType === "Session" ? "⏱" : "☕️";
    document.title = hasStarted
      ? `Vip Akademi - Etüt / ${formatDisplayTime(parseInt(timerMinutes))}:${formatDisplayTime(parseInt(timerSeconds))}`
      : "Vip Akademi - Etüt";
  };

  const toggleCountDown = () => {
    if (hasStarted) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimer((prevTime) => {
          const newTime = prevTime - 1;
          updateTimerDisplay(newTime);
          return newTime;
        });
      }, 1000);
      setTimerIntervalId(newIntervalId);
    }
  };

  const handleResetTimer = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    setTimerIntervalId(null);
    resetTimerSettings();
  };

  const resetTimerSettings = () => {
    setPomodoroLength(pomodoroLength);
    setShortBreak(shortBreakLength);
    setLongBreak(longBreakLength);
    setSessionType("Session");
    setBreakStarted(false);
    setTimer(pomodoroLength);
    setTimerQueue(pomodoroLength);
  };

  const selectBreak = (breakLength) => {
    if (hasStarted) return; // Guard against change when running
    if (sessionType === "Break") return;

    setBreakLength(breakLength);
    successToast(`Mola süresi ${breakLength / 60} dakika olarak ayarlandı`, false);
  };

  const handleEarlyFinish = () => {
    if (hasStarted) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
      setTimer(0); // Set the timer to zero
      handleTimerCompletion(); // Trigger completion logic
    }
  };

  return (
    <div
      className={clsx(
        breakStarted && "bg-slate-200/[.96] shadow-lg",
        "dwidth sm:w-96 mb-2 max-w-sm rounded-lg border border-gray-200 bg-white/[.96] py-2 px-1 text-gray-800 shadow-lg dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300"
      )}
    >
      <div className="text-center">
        <div className="rounded p-2 text-center">
          <div className="flex justify-end">
            <IoCloseSharp
              className="cursor-pointer text-red-500 hover:bg-red-200"
              onClick={() => setIsTimerToggled(false)}
            />
          </div>
          <div className="flex">
            <Button
              className={clsx(
                "text-gray-800 hover:text-white dark:text-white",
                breakLength === shortBreakLength && "border-2 border-blue-900"
              )}
              variant="cold"
              onClick={() => selectBreak(shortBreakLength)}
              disabled={hasStarted}
            >
              Kısa Mola
            </Button>
            <Button
              className={clsx(
                "text-gray-800 hover:text-white dark:text-white",
                breakLength === longBreakLength && "border-2 border-blue-900"
              )}
              variant="cold"
              onClick={() => selectBreak(longBreakLength)}
              disabled={hasStarted}
            >
              Uzun Mola
            </Button>
          </div>
          <div>
            <div className="text-7xl font-bold tabular-nums sm:text-9xl">
              {formatDisplayTime(timerMinutes)}:{formatDisplayTime(timerSeconds)}
            </div>
          </div>
          <div className="timer-control tabular-nums">
            <Button
              className="font-normal tabular-nums text-gray-800 hover:text-white dark:text-white"
              onClick={toggleCountDown}
              variant="cold"
            >
              <p className="tabular-nums">{hasStarted ? "Durdur" : "Başlat"}</p>
            </Button>
            <Button
              className="ml-4 font-normal tabular-nums text-gray-800 hover:text-white dark:text-white"
              variant="cold"
              onClick={handleResetTimer}
            >
              <p className="tabular-nums">Sıfırla</p>
            </Button>
            <Button
              className="ml-4 font-normal tabular-nums text-gray-800 hover:text-white dark:text-white"
              variant="cold"
              onClick={handleEarlyFinish}
            >
              <p className="tabular-nums">Erken Bitir</p>
            </Button>
          </div>
        </div>
      </div>
      <audio id="beep" preload="auto" ref={audioRef} src={alarm} />
    </div>
  );
};
