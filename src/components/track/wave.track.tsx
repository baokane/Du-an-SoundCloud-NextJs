'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { WaveSurferOptions } from "wavesurfer.js";
import { useSearchParams } from 'next/navigation';
import { useWavesurfer } from "@/utils/customHook";
import './wave.scss'

// Cắt sang file customHook.ts
// WaveSurfer hook
// const useWavesurfer = (
//     containerRef: React.RefObject<HTMLInputElement>,
//     options: Omit<WaveSurferOptions, 'container'>
// ) => {
//     const [wavesurfer, setWavesurfer] = useState<any>(null)

//     // Initialize wavesurfer when the container mounts
//     // or any of the props change
//     useEffect(() => {
//         if (!containerRef.current) return

//         const ws = WaveSurfer.create({
//             ...options,
//             container: containerRef.current,
//         })

//         setWavesurfer(ws)

//         return () => {
//             ws.destroy()
//         }
//     }, [options, containerRef])

//     return wavesurfer
// }

// Dùng state react
const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLInputElement>(null);

    const hoverRef = useRef<HTMLInputElement>(null);

    // Dùng ref
    // const timeRef = useRef<string>('0:00')
    // const durationRef = useRef<string>('0:00');

    // Dùng state react
    const [time, setTime] = useState<string>('0:00')
    const [duration, setDuration] = useState<string>('0:00')

    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {

        let gradient, progressGradient;
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }

        return {
            // waveColor: 'rgb(200, 0, 200)',
            // progressColor: 'rgb(100, 0, 100)',
            waveColor: gradient,
            progressColor: progressGradient,
            url: `/api?audio=${fileName}`,
            barWidth: 2,
        }
    }, []);

    // const options = {
    //     waveColor: 'rgb(200, 0, 200)',
    //     progressColor: 'rgb(100, 0, 100)',
    //     url: `/api?audio=${fileName}`,
    // }

    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        if (!wavesurfer) return
        setIsPlaying(false)

        // Hover
        const hover = hoverRef.current!

        const waveform = containerRef.current!
        // hoặc dùng:  const waveform = document.querySelector('.wave-form-container')!

        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),

            // wavesurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration))), // dùng ref -> ok
            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration))  //Dùng state -> ok
            }),
            // wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime))) // dùng ref-> ok
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime)) //Dùng state -> ok
            })
        ]
        return () => {
            subscriptions.forEach((unsub) => (unsub()))
        }
    }, [wavesurfer])

    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
            // setIsPlaying(wavesurfer.isPlaying())
        }
    }, [wavesurfer])

    // useEffect(() => {
    //     if (containerRef.current) {
    //         const wavesurfer = WaveSurfer.create({
    //             container: containerRef.current,
    //             waveColor: 'rgb(200, 0, 200)',
    //             progressColor: 'rgb(100, 0, 100)',
    //             url: `/api?audio=${fileName}`,
    //         })

    //         return () => {
    //             wavesurfer.destroy()
    //         }
    //     }
    // }, [])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    return (
        <div>
            <div ref={containerRef} className="wave-form-container">
                <div
                    // ref={timeRef}
                    className="time"
                >
                    {/* dùng state */}

                    {time}
                </div>
                <div
                    // ref={durationRef}
                    className="duration"
                >
                    {/* dùng state */}
                    {duration}
                </div>
                <div ref={hoverRef} className="hover-wave"></div>
            </div>
            <button onClick={() => onPlayClick()}>
                {isPlaying === true ? 'pause' : 'plays'}
            </button>
        </div>
    )
}

export default WaveTrack;