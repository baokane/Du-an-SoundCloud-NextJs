import { useState, useEffect } from 'react';
import WaveSurfer from "wavesurfer.js";
import { WaveSurferOptions } from "wavesurfer.js";

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}

export const useWavesurfer = (
    containerRef: React.RefObject<HTMLInputElement>,
    options: Omit<WaveSurferOptions, 'container'>
) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!containerRef.current) return

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        })

        setWavesurfer(ws)

        return () => {
            ws.destroy()
        }
    }, [options, containerRef])

    return wavesurfer
}
