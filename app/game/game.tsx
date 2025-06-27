import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import CircularProgressWithLabel from "../ui/circularProgressWithLabel";

import { Herb } from "../components/herb";
import { Bunch } from "../components/bunch";
import { Goal } from "../components/goal";

export function Game() {
  const herbs = [
    new Herb("Fiuncho"),
    new Herb("Malva"),
    new Herb("Romeu"),
    new Herb("Rosal silvestre"),
    new Herb("Herba de San Xoán"),
    new Herb("Herba luisa"),
    new Herb("Fento macho"),
    new Herb("Sabugueiro"),
    new Herb("Flor de San Xoán"),
    new Herb("Codeso"),
    new Herb("Nogueira"),
    new Herb("Loureiro"),
    new Herb("Torvisco"),
    new Herb("Ruda"),
    new Herb("Hierbabuena"),
    new Herb("Salvia"),
    new Herb("Artemisa"),
  ];

  const maxPickedHerbs = 9;
  const maxSelectedHerbs = 15;
  const maxHoras = 10;

  const [pickedHerbs, setPickedHerbs] = useState(
    Array(maxPickedHerbs).fill(null)
  );
  const [selectedHerbs, setSelectedHerbs] = useState(
    Array(maxSelectedHerbs).fill(null)
  );
  const [ano, setAno] = useState(1);
  const [horas, setHoras] = useState(0);

  const [goals, setGoals] = useState([
    new Goal("Cacho de Maruja", [herbs[0], herbs[1]]),
    new Goal("Cacho de Ana", [herbs[2], herbs[3]]),
    new Goal("Cacho de Alba", [herbs[4], herbs[5]]),
  ]);

  const collerHerbas = function () {
    setPickedHerbs((prevpickedHerbs) => {
      const newPickedHerbs = [...prevpickedHerbs];
      for (let i = 0; i < newPickedHerbs.length; i++) {
        newPickedHerbs[i] = new Bunch(
          herbs[Math.floor(Math.random() * herbs.length)]
        );
      }
      return newPickedHerbs;
    });

    setHoras((prevHoras) => {
      const novasHoras = prevHoras + maxHoras / 3;
      return novasHoras;
    });
  };

  const facerCacho = function () {
    const cacho = pickedHerbs.filter((item) => item !== null);

    setGoals((prevGoals) => {
      console.log("Ano", ano);
      console.log("==========");
      const newGoals = [];

      const filteredHerbs = selectedHerbs.filter((herb) => herb !== null);

      for (const goal of prevGoals) {
        console.log("Comprobando obxectivo:", goal.name);
        if (goal.completed) {
          newGoals.push(goal);
          continue;
        }

        const targetHerbs = [...goal.herbs];
        let includedHerbs = 0;

        for (const herb of filteredHerbs) {
          console.log("Comprobando herba:", herb.herb.name);
          for (let i = 0; i < targetHerbs.length; i++) {
            console.log("Comparando con:", targetHerbs[i].name);
            if (herb.herb.name === targetHerbs[i].name) {
              // Borramos a herba do obxectivo
              targetHerbs.splice(i, 1);
              includedHerbs++;
              console.log("Herba atopada e eliminada:", herb.herb.name);
              break;
            }
          }
        }

        console.log("\n");

        if (
          targetHerbs.length === 0 &&
          filteredHerbs.length === includedHerbs
        ) {
          goal.completed = true;
        }

        newGoals.push(goal);
      }

      return newGoals;
    });

    setPickedHerbs(Array(maxPickedHerbs).fill(null));
    setSelectedHerbs(Array(maxSelectedHerbs).fill(null));
    setAno(ano + 1);
    setHoras(0);
  };

  const recoller = function (item: string | null, index: number): void {
    setPickedHerbs((prevpickedHerbs) => {
      const newPickedHerbs = [...prevpickedHerbs];
      newPickedHerbs[index] = null;
      return newPickedHerbs;
    });

    setSelectedHerbs((prevSelectedHerbs: (string | null)[]) => {
      const newSelectedHerbs = [...prevSelectedHerbs];
      for (let i = 0; i < newSelectedHerbs.length; i++) {
        if (newSelectedHerbs[i] === null) {
          newSelectedHerbs[i] = item;
          break;
        }
      }
      return newSelectedHerbs;
    });
  };

  const pickedHerbsList = pickedHerbs.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => recoller(item, index)}
        disabled={!item}
      >
        {item ? `${item.herb.name}` : `Nada`}
      </Button>
    </Grid>
  ));

  const selectedHerbsList = selectedHerbs.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => recoller(item, index)}
        disabled={!item}
      >
        {item ? `${item.herb.name}` : `Nada`}
      </Button>
    </Grid>
  ));

  const goalsList = goals.map((item, index) => (
    <Typography
      style={{
        textDecoration: item.completed ? "line-through" : "none",
      }}
      key={index}
      component="p"
      gutterBottom
    >
      {item.name} - {item.herbs.map((herb) => herb.name).join(", ")}
    </Typography>
  ));

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid size={8}>
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
            {pickedHerbsList}
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
            {selectedHerbsList}
          </Grid>

          <Button variant="contained" onClick={facerCacho}>
            Facer o cacho
          </Button>
        </Grid>
        <Grid style={{ paddingTop: "64px", paddingLeft: "16px" }} size={4}>
          <Typography component="h2" gutterBottom>
            Retos
          </Typography>
          {goalsList}
        </Grid>
      </Grid>
    </Container>
  );
}
