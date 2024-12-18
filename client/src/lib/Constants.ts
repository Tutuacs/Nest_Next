import { hostname } from "os";

const isDocker = hostname().includes("full_stack"); // Ajuste conforme o nome do serviço no Docker
export const Backend_URL = isDocker
  ? "http://full_stack_back:3333" // Backend no ambiente Docker
  : process.env.BACK_URL ?? "http://localhost:3333"; // Local
