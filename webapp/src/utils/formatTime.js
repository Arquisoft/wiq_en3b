import { zeroPad } from "react-countdown";

export function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
}