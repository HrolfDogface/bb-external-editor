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

    //ns.tprint(ns.singularity.getFactionRep("CyberSec"));
    //ns.tprint(ns.singularity.getAugmentationPrice("NeuroFlux Governor"));
    //ns.tprint(ns.singularity.getAugmentationRepReq("NeuroFlux Governor"));
    //const startRep: number = ns.singularity.getFactionRep("CyberSec");
    //ns.singularity.donateToFaction("CyberSec", 100);
    //const hundredRep: number = ns.singularity.getFactionRep("CyberSec");
    //ns.singularity.donateToFaction("CyberSec", 1000000);
    //const millionRep: number = ns.singularity.getFactionRep("CyberSec");
//
    //ns.tprint(hundredRep - startRep);
    //ns.tprint(millionRep - hundredRep);
    //
    //ns.tprint((millionRep - hundredRep)/(hundredRep - startRep));
    //ns.tprint((hundredRep - startRep)*10000);

    const factionName: string = ns.enums.FactionName.Daedalus;

    ns.tprint(factionName);
    ns.tprint(ns.singularity.getAugmentationsFromFaction(factionName));

    
    ns.writePort(ns.pid, true);

    // //go through each faction to see which ones have any rep to detect joined factions
    // for(let i = 0; i < Object.keys(ns.enums.FactionName).length; i++){
    //    if (ns.singularity.getFactionRep(Object.values(ns.enums.FactionName)[i]) > 0){
    //        ns.tprint(Object.values(ns.enums.FactionName)[i]);
    //        const augmentations: string [] = ns.singularity.getAugmentationsFromFaction(Object.values(ns.enums.FactionName)[i]);
    //        for (let i = 0; i < augmentations.length;i++){
    //            ns.tprint(augmentations[i]);
    //        }
    //    }
    //}


}