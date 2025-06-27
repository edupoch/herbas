import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import CircularProgressWithLabel from "../ui/circularProgressWithLabel";

export function Game() {
  const posiblesHerbas = [
    "Fiuncho",
    "Malva",
    "Romeu",
    "Rosal silvestre",
    "Herba de San Xoán",
    "Herba luisa",
    "Fento macho",
    "Sabugueiro",
    "Flor de San Xoán",
    "Codeso",
    "Nogueira",
    "Loureiro",
    "Torvisco",
    "Ruda",
    "Hierbabuena",
    "Salvia",
    "Artemisa",
  ];

  const maxHerbasRecollidas = 9;
  const maxHerbasSeleccionadas = 15;
  const maxHoras = 10;

  const [herbasRecollidas, setHerbasRecollidas] = useState(
    Array(maxHerbasRecollidas).fill(null)
  );
  const [herbasSeleccionadas, setHerbasSeleccionadas] = useState(
    Array(maxHerbasSeleccionadas).fill(null)
  );
  const [ano, setAno] = useState(1);
  const [horas, setHoras] = useState(0);

  const collerHerbas = function () {
    setHerbasRecollidas((prevHerbasRecollidas) => {
      const novoHerbasRecollidas = [...prevHerbasRecollidas];
      for (let i = 0; i < novoHerbasRecollidas.length; i++) {
        novoHerbasRecollidas[i] =
          posiblesHerbas[Math.floor(Math.random() * posiblesHerbas.length)];
      }
      return novoHerbasRecollidas;
    });

    setHoras((prevHoras) => {
      const novasHoras = prevHoras + maxHoras / 3;
      return novasHoras;
    });
  };

  const facerCacho = function () {
    setHerbasRecollidas(Array(maxHerbasRecollidas).fill(null));
    setHerbasSeleccionadas(Array(maxHerbasSeleccionadas).fill(null));
    setAno(ano + 1);
    setHoras(0);
  };

  const recoller = function (item: string | null, index: number): void {
    setHerbasRecollidas((prevHerbasRecollidas) => {
      const novoHerbasRecollidas = [...prevHerbasRecollidas];
      novoHerbasRecollidas[index] = null;
      return novoHerbasRecollidas;
    });

    setHerbasSeleccionadas((prevHerbasSeleccionadas: (string | null)[]) => {
      const novoHerbasRecollidas = [...prevHerbasSeleccionadas];
      for (let i = 0; i < novoHerbasRecollidas.length; i++) {
        if (novoHerbasRecollidas[i] === null) {
          novoHerbasRecollidas[i] = item;
          break;
        }
      }
      return novoHerbasRecollidas;
    });
  };

  const listaHerbasRecollidas = herbasRecollidas.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => recoller(item, index)}
        disabled={!item}
      >
        {item ? `${item}` : `Nada`}
      </Button>
    </Grid>
  ));

  const listaHerbasSeleccionadas = herbasSeleccionadas.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => recoller(item, index)}
        disabled={!item}
      >
        {item ? `${item}` : `Nada`}
      </Button>
    </Grid>
  ));

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Ano {ano}
      </Typography>

      <Grid
        style={{ marginTop: "16px", marginBottom: "16px" }}
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid size={4}>
          <Button
            variant="contained"
            onClick={collerHerbas}
            disabled={horas >= maxHoras}
          >
            Ir coller herbas
          </Button>
        </Grid>

        <Grid size={1}>
          <CircularProgressWithLabel value={(horas / maxHoras) * 100} />
        </Grid>
      </Grid>

      <Typography component="h2" gutterBottom>
        Cesto
      </Typography>

      <Grid
        style={{ marginTop: "16px", marginBottom: "16px" }}
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        {listaHerbasRecollidas}
      </Grid>

      <Typography component="h2" gutterBottom>
        Herbas seleccionadas
      </Typography>

      <Grid
        style={{ marginTop: "16px", marginBottom: "16px" }}
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        {listaHerbasSeleccionadas}
      </Grid>

      <Button variant="contained" onClick={facerCacho}>
        Facer o cacho
      </Button>
    </Container>
  );
}
