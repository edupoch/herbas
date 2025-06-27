import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export function Game() {
    const [counter, setCounter] = useState(0);

    return (
        <Container maxWidth="sm">
            <Button variant="contained" onClick={() => setCounter(counter + 1)}>
                Click me
            </Button>
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', fontFamily: 'body1' }}>
                <Typography>
                    <p>You clicked {counter} times</p>
                </Typography>
            </Paper>
        </Container>
    );
}