import type { Route } from "./+types/home";
import { Game } from "../game/game";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Herbas de San Xoán" },
    { name: "description", content: "Welcome to Herbas de San Xoán!" },
  ];
}

export default function Home() {
  return <Game />;
}
