import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..", "..", "src", "configs");
const envFilePath = resolve(__dirname, "..", "..", "..", ".env");
config({ path: envFilePath });
