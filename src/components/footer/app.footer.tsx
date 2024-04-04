'use client'

import { useHasMounted } from '@/utils/customHook';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useContext } from 'react';
import { TrackContext } from '@/lib/track.wrapper';

const AppFooter = () => {
    const hasMounted = useHasMounted()
    if (!hasMounted) {
        return (<></>)
    }

    const { currentTrack, setCurrentTrack } = useContext(TrackContext) as ITrackContext;
    console.log('currentTrack:', currentTrack)

    return (
        <div style={{ marginTop: 90 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#f2f2f2', gap: 10 }}>
                <Container sx={{
                    display: 'flex',
                    gap: 10,
                    '.rhap_main': { gap: 10 }
                }}
                >
                    <AudioPlayer
                        layout='horizontal-reverse'
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/WORKOUT.mp3`}
                        volume={0.5}
                        style={{ boxShadow: "none", background: '#f2f2f2' }}
                    // Try other props!
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'center',
                        minWidth: 100
                    }}>
                        <div style={{ color: ' #ccc' }}>Baodung</div>
                        <div style={{ color: 'black' }}>Who am I?</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter