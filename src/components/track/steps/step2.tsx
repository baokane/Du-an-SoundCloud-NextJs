'use client'
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Grid, TextField } from '@mui/material';
// import TextField from '@mui/material/TextField';

// Progress bar
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function ProgressBar() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}

// Upload button
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload() {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
                marginTop: '10px'
            }}
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

// Text Field
const currencies = [
    {
        value: 'chill',
        label: 'Chill',
    },
    {
        value: 'workout',
        label: 'Workout',
    },
    {
        value: 'party',
        label: 'Party',
    },
];
const Step2 = () => {
    return (
        <div>
            <div>Your uploading track:</div>
            <div style={{ marginBottom: 60 }}>
                <ProgressBar />
            </div>
            <Grid
                container
                spacing={2}

            >
                <Grid item xs={6} md={4} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div
                        style={{ height: 250, width: 250, background: '#ccc' }}
                    >

                    </div>
                    <InputFileUpload />

                </Grid>
                <Grid item xs={6} md={8} >
                    <TextField id="standard-basic" label="Title" variant="standard" fullWidth margin='dense' />
                    <TextField id="standard-basic" label="Description" variant="standard" fullWidth margin='dense' />
                    <TextField
                        margin='dense'
                        fullWidth
                        id="standard-select-currency-native"
                        select
                        label="Category"
                        defaultValue="chill"
                        SelectProps={{
                            native: true,
                        }}
                        // helperText="Please select your currency"
                        variant="standard"
                        sx={{
                            marginTop: '30px'
                        }}
                    >
                        {currencies.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        sx={{
                            marginTop: '37px'
                        }}
                    >
                        Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Step2