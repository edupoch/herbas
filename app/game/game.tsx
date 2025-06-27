import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export function Game() {
    const posiblesHerbas = [
        'Fiuncho',
        'Malva',
        'Romeu',
        'Rosal silvestre',
        'Herba de San Xoán',
        'Herba luisa',
        'Fento macho',
        'Sabugueiro',
        'Flor de San Xoán',
        'Codeso',
        'Nogueira',
        'Loureiro',
        'Torvisco',
        'Ruda',
        'Hierbabuena',
        'Salvia',
        'Artemisa'
    ];

    const nElementos = 9;
    
    const [inventario, setInventario] = useState(Array(nElementos).fill(null));
    const [ano, setAno] = useState(1);
    
    const collerHerbas = function() {
        setInventario(prevInventario => {
            const novoInventario = [...prevInventario];
            for (let i = 0; i < novoInventario.length; i++) {
                novoInventario[i] = posiblesHerbas[Math.floor(Math.random() * posiblesHerbas.length)];
            }
            return novoInventario;
        });
    };

    const facerCacho = function() {
        setInventario(Array(nElementos).fill(null));
        setAno(ano + 1);
    };

    const listaInventario = inventario.map((item, index) => (
        <Grid size={4} key={index}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="body1">
                    {item ? `${item}` : `Nada`}
                </Typography>
            </Paper>
        </Grid>
    ));

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                
            Ano {ano}
            </Typography>
            <Button variant="contained" onClick={collerHerbas}>
                Ir coller herbas
            </Button>

            <Grid style={{marginTop: '16px', marginBottom: '16px'}} container rowSpacing={2} columnSpacing={2}>
                {listaInventario}
            </Grid>

            <Button variant="contained" onClick={facerCacho}>
                Facer o cacho
            </Button>
        </Container>
    );
}