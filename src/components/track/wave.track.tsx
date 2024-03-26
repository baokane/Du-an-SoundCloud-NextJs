'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
const WaveTrack = () => {
    const searchParams = useSearchParams()

    const fileName = searchParams.get('audio')
    console.log('>>> check search mp3:', fileName)

    // Ref giống với id giúp định danh, nếu dùng id mà có nhiều component dùng chung id thì sẽ sai
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {

        // có thể thêm dấu ! ở cuối => nếu là null thì không chạy, khác null mới chạy
        // const element = document.getElementById('hoidanit') => ko dùng cách này
        if (containerRef.current) {
            WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: `/api?audio=${fileName}`, //remote url
            })
        }
    }, [])
    return (
        <div ref={containerRef}>Wave Track</div>
    )
}

export default WaveTrack