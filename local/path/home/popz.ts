import { portHack } from "./pop"

export async function main(ns: NS) {
    const target: string = String(ns.args[0]);
    portHack(ns, target);
    ns.exec("pop.ts", "home", 1, target);
}