import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import CircularProgressWithLabel from "../ui/circularProgressWithLabel";
import SelectedBunchActions from "../ui/selectedBunchActions";

import { Herb } from "../components/herb";
import { Herbarium } from "../components/herbarium";
import { Bunch } from "../components/bunch";
import { Goal } from "../components/goal";
import { Place } from "../components/place";
import { Map } from "../components/map";

const herbs = [
  new Herb("Fiuncho", "Ule a anís", "Cura cousas", "Espanta demos"),
  new Herb("Malva", "Flor bonita", "Cura cousas", "Espanta demos"),
  new Herb("Romeu", "Ule a cocido", "Cura cousas", "Espanta demos"),
  new Herb("Rosal silvestre", "Pincha moito", "Cura cousas", "Espanta demos"),
  new Herb("Herba luisa", "Floreciñas malvas", "Cura cousas", "Espanta demos"),
  new Herb("Fento macho", "Plumeiro", "Cura cousas", "Espanta demos"),
  new Herb("Sabugueiro", "Nubes brancas", "Cura cousas", "Espanta demos"),
  new Herb(
    "Flor de San Xoán",
    "Estrelas amarelas",
    "Cura cousas",
    "Espanta demos"
  ),
  new Herb("Nogueira", "Aperitivo en verán", "Cura cousas", "Espanta demos"),
  new Herb("Loureiro", "Olor a comida", "Cura cousas", "Espanta demos"),
  new Herb("Torvisco", "Arbusto con boliñas", "Cura cousas", "Espanta demos"),
  new Herb("Ruda", "Nubes amarelas", "Cura cousas", "Espanta demos"),
  new Herb("Hierbabuena", "Ule ben", "Cura cousas", "Espanta demos"),
  new Herb("Salvia", "Nubes moradas", "Cura cousas", "Espanta demos"),
  new Herb("Artemisa", "Arboliño pequeno", "Cura cousas", "Espanta demos"),
];

function getRandomHerbs(count: number): Herb[] {
  const herbsCopy = [...herbs];
  const shuffled = herbsCopy.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const home = new Place("Casa", []);

const map = new Map([
  [
    null,
    new Place("Monte", getRandomHerbs(3)),
    new Place("Cemiterio", getRandomHerbs(3)),
  ],
  [
    new Place("Río", getRandomHerbs(3)),
    home,
    new Place("Igrexa", getRandomHerbs(3)),
  ],
  [null, new Place("Bosque", getRandomHerbs(3)), null],
]);

const cachoDaFamilia = getRandomHerbs(7);

const maxPickedHerbs = 9;
const minPickedHerbs = 3;
const maxSelectedHerbs = 15;
const maxHoras = 10;

export function Game() {
  const [activeSection, setActiveSection] = useState("home");
  const [openModal, setOpenModal] = useState(false);

  const [pickedHerbs, setPickedHerbs] = useState(
    Array(maxPickedHerbs).fill(null)
  );
  const [selectedHerbs, setSelectedHerbs] = useState(
    Array(maxSelectedHerbs).fill(null)
  );
  const [ano, setAno] = useState(1);
  const [horas, setHoras] = useState(0);

  const [goals, setGoals] = useState([
    // new Goal("Cacho da túa familia", cachoDaFamilia),
    // new Goal("Cacho de Maruja", [herbs[0], herbs[1]]),
    new Goal("Ana", "A miña cor favorita é o lila", [herbs[1], herbs[4]]),
    new Goal("Alba", "A miña cor favorita é o amarelo", [herbs[7], herbs[11]]),
  ]);

  const [position, setPosition] = useState(home);
  const [herbarium, setHerbarium] = useState(new Herbarium());

  const avanzarDia = function (percentaje: number) {
    setHoras((prevHoras) => {
      const novasHoras = Math.min(
        prevHoras + maxHoras * (percentaje / 100),
        maxHoras
      );
      return novasHoras;
    });
  };

  const collerHerbas = function (position: Place) {
    const nPickedHerbs =
      Math.floor(Math.random() * (maxPickedHerbs - minPickedHerbs)) +
      minPickedHerbs;
    console.log("N picked herbs:", nPickedHerbs);

    const tempPickedHerbs: Bunch[] = [];

    if (position.herbs.length > 0) {
      for (let i = 0; i < nPickedHerbs; i++) {
        tempPickedHerbs[i] = new Bunch(
          position.herbs[Math.floor(Math.random() * position.herbs.length)]
        );
      }
    }

    setPickedHerbs((prevpickedHerbs) => {
      const newPickedHerbs = [...prevpickedHerbs];
      newPickedHerbs.fill(null);

      for (let i = 0; i < nPickedHerbs; i++) {
        newPickedHerbs[i] = tempPickedHerbs[i];
      }

      return newPickedHerbs;
    });

    setHerbarium((prevHerbarium) => {
      const newHerbarium = prevHerbarium.clonar();

      for (const item of tempPickedHerbs) {
        if (!item) continue;

        console.log("Engadindo herba ao herbario:", item.herb.name);
        newHerbarium.addHerb(item.herb, position);
      }

      console.log("Herbario actualizado:", newHerbarium);

      return newHerbarium;
    });

    avanzarDia(33);
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
    setPosition(home);
  };

  const recoller = function (item: Bunch | null, index: number): void {
    setPickedHerbs((prevpickedHerbs) => {
      const newPickedHerbs = [...prevpickedHerbs];
      newPickedHerbs[index] = null;
      return newPickedHerbs;
    });

    setSelectedHerbs((prevSelectedHerbs: (Bunch | null)[]) => {
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

  const recollerTodo = function (): void {
    for (let i = 0; i < pickedHerbs.length; i++) {
      if (pickedHerbs[i] !== null) {
        recoller(pickedHerbs[i], i);
      }
    }
  };

  const nameHerb = (herb: Herb): string => {
    return herbarium.nameHerb(herb);
  };

  const pickedHerbsList = pickedHerbs.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => recoller(item, index)}
        disabled={!item}
      >
        {item ? `${nameHerb(item.herb)}` : `Nada`}
      </Button>
    </Grid>
  ));

  const selectedHerbsList = selectedHerbs.map((item, index) => (
    <SelectedBunchActions
      key={index}
      bunch={item}
      herbName={item ? nameHerb(item.herb) : "Nada"}
      onRemove={() => {
        setSelectedHerbs((prevSelectedHerbs) => {
          const newSelectedHerbs = [...prevSelectedHerbs];
          newSelectedHerbs[index] = null;
          return newSelectedHerbs;
        });
      }}
      onStudy={() => {
        setHerbarium((prevHerbarium) => {
          console.log("Herbario antes de estudar:", prevHerbarium);
          const newHerbarium = prevHerbarium.clonar();
          if (item) {
            newHerbarium.studyHerb(item.herb, position);
          }
          return newHerbarium;
        });

        avanzarDia(10);
      }}
    />
  ));

  const placesList = map.places.map((row, rowIndex) => (
    <Grid container direction="row" rowSpacing={2} columnSpacing={2}>
      {row.map((place, colIndex) => (
        <Grid size={4}>
          <Button
            key={`place-${rowIndex}-${colIndex}`}
            style={{ width: "100%" }}
            variant={
              place && place.name === position.name ? "contained" : "outlined"
            }
            disabled={!place}
            onClick={() => {
              if (!place) return;
              console.log("Cambiando a posición:", place.name);
              setOpenModal(false);
              collerHerbas(place);
              setPosition(place);
            }}
          >
            {place ? place.name : "Nada"}
          </Button>
        </Grid>
      ))}
    </Grid>
  ));

  const goalsList = goals.map((item, index) => (
    <Typography
      style={{
        textDecoration: item.completed ? "line-through" : "none",
        marginBottom: "16px",
      }}
      key={index}
      component="p"
      gutterBottom
    >
      <b>{item.name}</b>
      <br />
      {item.description}
    </Typography>
  ));

  const herbariumList = herbs.map((item, index) => (
    <div
      style={{
        display: herbarium.hasHerb(item) ? "block" : "none",
        marginBottom: "16px",
      }}
    >
      <Typography key={`herb-${index}`} variant="h4">
        {herbarium.nameHerb(item)} <br />
      </Typography>
      <Typography variant="body1">
        Encontrado en: {herbarium.getPlacesFound(item)}
        <br />
        Propiedades mediciñais: {herbarium.getMedicalProperties(item)}
        <br />
        Propiedades máxicas: {herbarium.getMagicalProperties(item)}
      </Typography>
    </div>
  ));

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Ano {ano}
      </Typography>
      <Tabs
        style={{ marginBottom: "16px" }}
        value={activeSection}
        onChange={(event, section) => setActiveSection(section)}
      >
        <Tab label="Cesto" value="home" />
        <Tab label="Herbario" value="herbarium" />
      </Tabs>
      <div hidden={activeSection !== "home"}>
        <Typography variant="body1" gutterBottom>
          Posición: {position.name}
        </Typography>
        <Grid container>
          <Grid size={8}>
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
                  key="coller-herbas"
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                  disabled={horas >= maxHoras}
                >
                  Ir coller herbas
                </Button>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 800,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography variant="h6" component="h2" sx={{ mb: "16px" }}>
                      Lugares
                    </Typography>
                    {placesList}
                  </Box>
                </Modal>
              </Grid>

              <Grid size={1}>
                <CircularProgressWithLabel value={(horas / maxHoras) * 100} />
              </Grid>
            </Grid>

            <Grid
              style={{ marginTop: "16px", marginBottom: "16px" }}
              container
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid size={6}>
                <Typography variant="h5" gutterBottom>
                  Cesto
                </Typography>
              </Grid>

              <Grid size={6}>
                <Button
                  variant="contained"
                  onClick={recollerTodo}
                  style={{ float: "right" }}
                >
                  Coller todo
                </Button>
              </Grid>
            </Grid>

            <Grid
              style={{ marginTop: "16px", marginBottom: "32px" }}
              container
              rowSpacing={2}
              columnSpacing={2}
            >
              {pickedHerbsList}
            </Grid>

            <Typography variant="h5" gutterBottom>
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
          <Grid style={{ paddingLeft: "32px" }} size={4}>
            <Typography variant="h5" gutterBottom>
              Retos
            </Typography>
            {goalsList}
          </Grid>
        </Grid>
      </div>
      <div hidden={activeSection !== "herbarium"}>{herbariumList}</div>
    </Container>
  );
}
