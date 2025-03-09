//import { portHack } from "./pop";


export async function main(ns: NS) {

    //ns.writePort(1, "omega-net");
    //ns.writePort(1, "silver-helix");
    //ns.writePort(1, "phantasy");
    //ns.writePort(1, "zer0");
    //ns.writePort(1, "harakiri-sushi");

    //ns.tprint("foo");
    //ns.kill();
    //ns.tprint("baz");

    //const pid: number = ns.exec("factions/join_faction.ts", "home", 1, "CyberSec");
    //await ns.nextPortWrite(pid);
    //const result: boolean = ns.readPort(pid);
    //ns.tprint(result);

    ns.tprint(ns.singularity.getFactionRep("CyberSec"));



}