import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

import PublicIcon from "@mui/icons-material/Public";
import Person2Icon from "@mui/icons-material/Person2";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import GrassIcon from "@mui/icons-material/Grass";
import Diversity3Icon from "@mui/icons-material/Diversity3";

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

// Reordeamos as herbas aleatoriamente
herbs.sort(() => 0.5 - Math.random());

const map = new Map([
  [
    null,
    new Place("Monte", herbs.slice(0, 3).concat(getRandomHerbs(1))),
    new Place("Cemiterio", herbs.slice(3, 6).concat(getRandomHerbs(1))),
  ],
  [
    new Place("Río", herbs.slice(6, 9).concat(getRandomHerbs(1))),
    home,
    new Place("Igrexa", herbs.slice(9, 12).concat(getRandomHerbs(1))),
  ],
  [
    null,
    new Place("Bosque", herbs.slice(12, 15).concat(getRandomHerbs(1))),
    null,
  ],
]);

console.log("Map", map);

const familyBouquet = getRandomHerbs(7);

const minAge = 10;

const maxFoundHerbs = 9;
const minFoundHerbs = 3;

const maxPickedHerbs = 9;

const maxSelectedHerbs = 15;
const maxHours = 10;

export function Game() {
  const [activeSection, setActiveSection] = useState("home");
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");

  const [foundHerbs, setFoundHerbs] = useState(Array(maxFoundHerbs).fill(null));
  const [pickedHerbs, setPickedHerbs] = useState(
    Array(maxPickedHerbs).fill(null)
  );
  const [selectedHerbs, setSelectedHerbs] = useState(
    Array(maxSelectedHerbs).fill(null)
  );

  const [year, setYear] = useState(1);
  const [hours, setHours] = useState(0);

  const [goals, setGoals] = useState([
    // new Goal("Cacho da túa familia", familyBouquet),
    // new Goal("Cacho de Maruja", [herbs[0], herbs[1]]),
    new Goal("Ana", "A miña cor favorita é o lila", [
      herbs.filter((herb) => herb.name == "Malva")[0],
      herbs.filter((herb) => herb.name == "Herba luisa")[0],
    ]),
    new Goal("Alba", "A miña cor favorita é o amarelo", [
      herbs.filter((herb) => herb.name == "Flor de San Xoán")[0],
      herbs.filter((herb) => herb.name == "Ruda")[0],
    ]),
  ]);

  const [position, setPosition] = useState(home);
  const [herbarium, setHerbarium] = useState(new Herbarium());

  const advanceInDay = function (percentaje: number) {
    setHours((prevHours) => {
      const newHours = Math.min(
        prevHours + maxHours * (percentaje / 100),
        maxHours
      );
      return newHours;
    });
  };

  const findHerbs = function (position: Place) {
    const nFoundHerbs =
      Math.floor(Math.random() * (maxFoundHerbs - minFoundHerbs)) +
      minFoundHerbs;

    const tempFoundHerbs: Bunch[] = [];

    if (position.herbs.length > 0) {
      for (let i = 0; i < nFoundHerbs; i++) {
        tempFoundHerbs[i] = new Bunch(
          position.herbs[Math.floor(Math.random() * position.herbs.length)]
        );
      }
    }

    setFoundHerbs((prevFoundHerbs) => {
      const newFoundHerbs = [...prevFoundHerbs];
      newFoundHerbs.fill(null);

      for (let i = 0; i < nFoundHerbs; i++) {
        newFoundHerbs[i] = tempFoundHerbs[i];
      }

      return newFoundHerbs;
    });

    setHerbarium((prevHerbarium) => {
      const newHerbarium = prevHerbarium.clone();
      let hasNewHerbs = false;

      for (const item of tempFoundHerbs) {
        if (!item) continue;

        if (!newHerbarium.hasHerb(item.herb)) {
          hasNewHerbs = true;
        }
        newHerbarium.addHerb(item.herb, position);
      }

      if (hasNewHerbs) {
        const message = `Atopaches novas herbas!`;
        setSnackbarMessage(message);
        setOpenSnackbar(true);
      }

      return newHerbarium;
    });

    advanceInDay(34);
  };

  const createGift = function () {
    setGoals((prevGoals) => {
      const newGoals = [];

      const filteredHerbs = selectedHerbs.filter((herb) => herb !== null);

      for (const goal of prevGoals) {
        if (goal.completed) {
          newGoals.push(goal);
          continue;
        }

        const targetHerbs = [...goal.herbs];
        let includedHerbs = 0;

        for (const herb of filteredHerbs) {
          for (let i = 0; i < targetHerbs.length; i++) {
            if (herb.herb.name === targetHerbs[i].name) {
              // Borramos a herba do obxectivo
              targetHerbs.splice(i, 1);
              includedHerbs++;
              break;
            }
          }
        }

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

    setFoundHerbs(Array(maxFoundHerbs).fill(null));
    setPickedHerbs(Array(maxFoundHerbs).fill(null));
    setSelectedHerbs(Array(maxSelectedHerbs).fill(null));
    setYear(year + 1);
    setHours(0);
    setPosition(home);
  };

  const pickHerb = function (item: Bunch | null, index: number): void {
    setFoundHerbs((prevFoundHerbs) => {
      const newFoundHerbs = [...prevFoundHerbs];
      newFoundHerbs[index] = null;
      return newFoundHerbs;
    });

    setPickedHerbs((prevPickedHerbs: (Bunch | null)[]) => {
      const newPickedHerbs = [...prevPickedHerbs];
      for (let i = 0; i < newPickedHerbs.length; i++) {
        if (newPickedHerbs[i] === null) {
          newPickedHerbs[i] = item;
          break;
        }
      }
      return newPickedHerbs;
    });
  };

  const selectHerbInBasket = function (
    item: Bunch | null,
    index: number
  ): void {
    setPickedHerbs((prevpickedHerbs) => {
      const newPickedHerbs = [...prevpickedHerbs];
      newPickedHerbs[index] = null;
      return newPickedHerbs;
    });

    if (position.name === home.name) {
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
    }
  };

  const pickAllHerbs = function (): void {
    for (let i = 0; i < pickedHerbs.length; i++) {
      if (pickedHerbs[i] !== null) {
        pickHerb(pickedHerbs[i], i);
      }
    }
  };

  const nameHerb = (herb: Herb): string => {
    return herbarium.nameHerb(herb);
  };

  const goHome = function () {
    setPosition(home);
    advanceInDay(100);
  };

  const foundHerbsList = foundHerbs.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => pickHerb(item, index)}
        disabled={!item}
      >
        {item ? `${nameHerb(item.herb)}` : `Nada`}
      </Button>
    </Grid>
  ));

  const pickedHerbsList = pickedHerbs.map((item, index) => (
    <Grid size={4} key={index}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={() => selectHerbInBasket(item, index)}
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
      hasTime={hours < maxHours}
      onRemove={() => {
        setSelectedHerbs((prevSelectedHerbs) => {
          const newSelectedHerbs = [...prevSelectedHerbs];
          newSelectedHerbs[index] = null;
          return newSelectedHerbs;
        });
      }}
      onStudy={() => {
        setHerbarium((prevHerbarium) => {
          const newHerbarium = prevHerbarium.clone();
          if (item) {
            const message = newHerbarium.studyHerb(item.herb, position);
            setSnackbarMessage(message);
            setOpenSnackbar(true);
          }
          return newHerbarium;
        });

        advanceInDay(10);
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
              setOpenModal(false);
              findHerbs(place);
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
    <Grid size={4}>
      <Paper variant="elevation" style={{ padding: "16px" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Person2Icon />
          <Typography key={`goal-${index}`} variant="h5">
            {item.name}
          </Typography>
        </Stack>
        <Typography
          style={{
            textDecoration: item.completed ? "line-through" : "none",
            marginBottom: "16px",
          }}
          key={index}
          component="p"
          gutterBottom
        >
          <br />
          {item.description}
        </Typography>
      </Paper>
    </Grid>
  ));

  const herbariumList = herbs.map((item, index) => {
    if (!herbarium.hasHerb(item)) return null;

    return (
      <Grid size={4}>
        <Paper variant="elevation" style={{ padding: "16px" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalFloristIcon />
            <Typography key={`herb-${index}`} variant="h5">
              {herbarium.nameHerb(item)}
            </Typography>
          </Stack>
          <Typography variant="body1">
            <div
              style={{
                display: herbarium.isIdentified(item) ? "inline" : "none",
              }}
            >
              <em>{herbarium.getIgnorantName(item)}</em>
              <br />
            </div>
            <div
              style={{
                display: !herbarium.isIdentified(item) ? "inline" : "none",
              }}
            >
              <br />
            </div>
            <br />
            <b>Encontrado en</b>
            <br />{" "}
            {herbarium.getPlacesFound(item) || (
              <em style={{ color: "grey" }}>Descoñecido</em>
            )}
            <br />
            <br />
            <b>Propiedades mediciñais</b>
            <br />{" "}
            {herbarium.getMedicalProperties(item) || (
              <em style={{ color: "grey" }}>Descoñecido</em>
            )}
            <br />
            <br />
            <b>Propiedades máxicas</b>
            <br />{" "}
            {herbarium.getMagicalProperties(item) || (
              <em style={{ color: "grey" }}>Descoñecido</em>
            )}
          </Typography>
        </Paper>
      </Grid>
    );
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Ano {year}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <em>Tes {minAge + year - 1} anos</em>
      </Typography>
      <Tabs
        style={{ marginBottom: "16px" }}
        value={activeSection}
        onChange={(event, section) => setActiveSection(section)}
      >
        <Tab icon={<PublicIcon />} label="Mundo" value="home" />
        <Tab icon={<MenuBookIcon />} label="Herbario" value="herbarium" />
        <Tab icon={<Diversity3Icon />} label="Amigas" value="friends" />
      </Tabs>
      <div hidden={activeSection !== "home"}>
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
              style={{
                display: hours < maxHours ? "block" : "none",
              }}
            >
              Cambiar de lugar
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
            <Button
              key="volver-casa"
              variant="contained"
              onClick={goHome}
              style={{
                display:
                  position.name !== home.name && hours >= maxHours
                    ? "block"
                    : "none",
              }}
            >
              Volver a casa
            </Button>
          </Grid>

          <Grid size={1}>
            <CircularProgressWithLabel value={(hours / maxHours) * 100} />
          </Grid>
        </Grid>

        <div
          style={{
            display: position.name !== home.name ? "block" : "none",
          }}
        >
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <GrassIcon />
              <Typography variant="h5" gutterBottom>
                {position.name}
              </Typography>
            </Stack>
          </Grid>

          <Grid
            style={{
              marginTop: "16px",
              marginBottom: "32px",
            }}
            container
            rowSpacing={2}
            columnSpacing={2}
          >
            {foundHerbsList}
          </Grid>
        </div>

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
            <Stack direction="row" spacing={1} alignItems="center">
              <ShoppingBasketIcon />
              <Typography variant="h5" gutterBottom>
                Cesto
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Grid
          style={{
            marginTop: "16px",
            marginBottom: "32px",
          }}
          container
          rowSpacing={2}
          columnSpacing={2}
        >
          {pickedHerbsList}
        </Grid>

        <div
          style={{
            display: position.name === home.name ? "block" : "none",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <TableRestaurantIcon />
            <Typography variant="h5" gutterBottom>
              Mesa
            </Typography>
          </Stack>

          <Grid
            style={{ marginTop: "16px", marginBottom: "16px" }}
            container
            rowSpacing={2}
            columnSpacing={2}
          >
            {selectedHerbsList}
          </Grid>

          <Button variant="contained" onClick={createGift}>
            Facer o cacho
          </Button>
        </div>
      </div>
      <div hidden={activeSection !== "herbarium"}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {herbariumList}
        </Grid>
      </div>
      <div hidden={activeSection !== "friends"}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {goalsList}
        </Grid>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackBarMessage}
      />
    </Container>
  );
}
