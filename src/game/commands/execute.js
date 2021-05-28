import move from "./fonctions/move";
import { createExecute } from "../../interpreter";

const execute = createExecute({ move });

export default execute;
