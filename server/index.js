var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import SunnyIcon from "@mui/icons-material/Sunny";
import Box from "@mui/material/Box";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
function CircularProgressWithLabel(props) {
  return /* @__PURE__ */ jsxs(Box, { sx: { position: "relative", display: "inline-flex" }, children: [
    /* @__PURE__ */ jsx(CircularProgress, { variant: "determinate", ...props }),
    /* @__PURE__ */ jsx(
      Box,
      {
        sx: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ jsx(SunnyIcon, {})
      }
    )
  ] });
}
class Herb {
  constructor(name) {
    __publicField(this, "name");
    this.name = name;
  }
}
class Bunch {
  constructor(herb) {
    __publicField(this, "herb");
    this.herb = herb;
  }
}
class Goal {
  constructor(name, herbs = []) {
    __publicField(this, "name");
    __publicField(this, "herbs", []);
    __publicField(this, "completed", false);
    this.name = name;
    this.herbs = herbs;
  }
}
function Game() {
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
    new Herb("Artemisa")
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
    new Goal("Cacho de Alba", [herbs[4], herbs[5]])
  ]);
  const collerHerbas = function() {
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
  const facerCacho = function() {
    pickedHerbs.filter((item) => item !== null);
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
              targetHerbs.splice(i, 1);
              includedHerbs++;
              console.log("Herba atopada e eliminada:", herb.herb.name);
              break;
            }
          }
        }
        console.log("\n");
        if (targetHerbs.length === 0 && filteredHerbs.length === includedHerbs) {
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
  const recoller = function(item, index) {
    setPickedHerbs((prevpickedHerbs) => {
      const newPickedHerbs = [...prevpickedHerbs];
      newPickedHerbs[index] = null;
      return newPickedHerbs;
    });
    setSelectedHerbs((prevSelectedHerbs) => {
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
  const pickedHerbsList = pickedHerbs.map((item, index) => /* @__PURE__ */ jsx(Grid, { size: 4, children: /* @__PURE__ */ jsx(
    Button,
    {
      style: { width: "100%" },
      variant: "outlined",
      onClick: () => recoller(item, index),
      disabled: !item,
      children: item ? `${item.herb.name}` : `Nada`
    }
  ) }, index));
  const selectedHerbsList = selectedHerbs.map((item, index) => /* @__PURE__ */ jsx(Grid, { size: 4, children: /* @__PURE__ */ jsx(
    Button,
    {
      style: { width: "100%" },
      variant: "outlined",
      onClick: () => recoller(item, index),
      disabled: !item,
      children: item ? `${item.herb.name}` : `Nada`
    }
  ) }, index));
  const goalsList = goals.map((item, index) => /* @__PURE__ */ jsxs(
    Typography,
    {
      style: {
        textDecoration: item.completed ? "line-through" : "none"
      },
      component: "p",
      gutterBottom: true,
      children: [
        item.name,
        " - ",
        item.herbs.map((herb) => herb.name).join(", ")
      ]
    },
    index
  ));
  return /* @__PURE__ */ jsx(Container, { maxWidth: "md", children: /* @__PURE__ */ jsxs(Grid, { container: true, children: [
    /* @__PURE__ */ jsxs(Grid, { size: 8, children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: [
        "Ano ",
        ano
      ] }),
      /* @__PURE__ */ jsxs(
        Grid,
        {
          style: { marginTop: "16px", marginBottom: "16px" },
          container: true,
          direction: "row",
          sx: {
            justifyContent: "space-between",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ jsx(Grid, { size: 4, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "contained",
                onClick: collerHerbas,
                disabled: horas >= maxHoras,
                children: "Ir coller herbas"
              }
            ) }),
            /* @__PURE__ */ jsx(Grid, { size: 1, children: /* @__PURE__ */ jsx(CircularProgressWithLabel, { value: horas / maxHoras * 100 }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(Typography, { component: "h2", gutterBottom: true, children: "Cesto" }),
      /* @__PURE__ */ jsx(
        Grid,
        {
          style: { marginTop: "16px", marginBottom: "16px" },
          container: true,
          rowSpacing: 2,
          columnSpacing: 2,
          children: pickedHerbsList
        }
      ),
      /* @__PURE__ */ jsx(Typography, { component: "h2", gutterBottom: true, children: "Herbas seleccionadas" }),
      /* @__PURE__ */ jsx(
        Grid,
        {
          style: { marginTop: "16px", marginBottom: "16px" },
          container: true,
          rowSpacing: 2,
          columnSpacing: 2,
          children: selectedHerbsList
        }
      ),
      /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: facerCacho, children: "Facer o cacho" })
    ] }),
    /* @__PURE__ */ jsxs(Grid, { style: { paddingTop: "64px", paddingLeft: "16px" }, size: 4, children: [
      /* @__PURE__ */ jsx(Typography, { component: "h2", gutterBottom: true, children: "Retos" }),
      goalsList
    ] })
  ] }) });
}
function meta({}) {
  return [{
    title: "Herbas de San Xoán"
  }, {
    name: "description",
    content: "Welcome to Herbas de San Xoán!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Game, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Cphskt5q.js", "imports": ["/assets/chunk-NL6KNZEE-DI6r6oF1.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Dsum6cpS.js", "imports": ["/assets/chunk-NL6KNZEE-DI6r6oF1.js"], "css": ["/assets/root-B9hGFApn.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-B2zetJFw.js", "imports": ["/assets/chunk-NL6KNZEE-DI6r6oF1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-4dc13f76.js", "version": "4dc13f76", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
