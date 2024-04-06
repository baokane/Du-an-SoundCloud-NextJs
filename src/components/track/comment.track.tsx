'use client'
import { fetchDefaultImages } from '@/utils/api';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
dayjs.extend(relativeTime)

interface IProps {
    track: ITrackTop | null;
    comment: ITrackComment[];
}

const CommentTrack = (props: IProps) => {
    const { track, comment } = props
    const [yourComment, setYourComment] = useState('')

    return (
        <>
            <TextField id="standard-basic" label="Comment" variant="standard" fullWidth
                value={yourComment}
                onChange={(e) => setYourComment(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        alert('me')
                        // handleSubmit()
                    }
                }}
                sx={{
                    margin: '70px 0 30px'
                }}
            />
            <div
                className='container-wrapper'
                style={{ display: 'flex', }}
            >

                <div className='left' style={{ display: 'flex', gap: 100 }}>
                    <div className='avatar-info' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{
                            width: 100,
                            height: 100,
                            marginBottom: 15
                        }}
                            src={
                                //@ts-ignore
                                fetchDefaultImages(track?.uploader?.type)
                            }
                        />
                        <div>
                            {track?.uploader?.email}
                        </div>
                    </div>

                </div >

                <div className='right' style={{ flex: '1' }}>
                    <ul style={{ flex: '1', marginTop: '-15px' }}>
                        {comment.map(item => {
                            return (
                                <li
                                    key={item._id}
                                    style={{
                                        display: 'flex',
                                        gap: 30,
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 15
                                    }}>
                                    <div className='comment-info-left'
                                        style={{
                                            display: 'flex',
                                            gap: 30,
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: 30,
                                                height: 30,
                                                background: '#ccc'
                                            }}
                                            src={fetchDefaultImages(item?.user?.email)}
                                        />
                                        <div>
                                            <div style={{ fontSize: 16, color: '#958d8d' }}>{item?.user?.email}</div>
                                            <div style={{ fontSize: 18, color: 'black' }}>{item?.content}</div>
                                        </div>
                                    </div>
                                    <div className='comment-info-right' style={{ fontSize: 14, color: '#e4e0e0' }}>
                                        {dayjs(item?.createdAt).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        </>
    )
}

export default CommentTrack