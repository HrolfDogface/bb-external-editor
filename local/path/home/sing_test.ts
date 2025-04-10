//import { portHack } from "./pop";
import { PortNumber } from "./port_enum";



export async function main(ns: NS) {

   //ns.clearPort(14);
   //ns.writePort(14, true);

   //let map = new Map();
   //map.set(PortNumber.phase, 0);
   //map.set(PortNumber.autoWorkFlag, false);
   //map.set(PortNumber.destroyBitnodeFlag, true);
   //map.set(PortNumber.hackPercentage, 20);
   //map.set(PortNumber.sleeveTask, "murder");
   //map.set(PortNumber.travelFlag, true);

    //if(ns.peek(PortNumber.destroyBitnodeFlag) != "NULL PORT DATA") map.set(PortNumber.destroyBitnodeFlag, ns.peek(PortNumber.destroyBitnodeFlag));
    const ports = Object.keys(PortNumber).filter((item) => {
        return !isNaN(Number(item));
    });
    for (const port of ports){
        //if(ns.peek(Number(port)) != "NULL PORT DATA") map.set(Number(port), ns.peek(Number(port)));
        ns.tprint(port);
        ns.tprint(ns.peek(Number(port)));
    }

    //ns.write("ports-state.json", JSON.stringify(Object.fromEntries(map)), "w");
    //ns.tprint(map);
//
    //const dic = JSON.parse(ns.read("ports-state.json"));
//
    //ns.tprint(dic);
    //ns.tprint(dic[PortNumber.phase]);
    //
    //map = new Map(Object.entries(dic));
    //ns.tprint(map);

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

    //const factionName: string = ns.enums.FactionName.TianDiHui;

   //ns.tprint(ns.peek(PortNumber.destroyBitnodeFlag));
   //ns.clearPort(PortNumber.destroyBitnodeFlag);
   //ns.writePort(PortNumber.destroyBitnodeFlag, false);
   //ns.tprint(ns.peek(PortNumber.destroyBitnodeFlag));
   //ns.clearPort(PortNumber.destroyBitnodeFlag);
   //ns.writePort(PortNumber.destroyBitnodeFlag, true);
   //ns.tprint(ns.peek(PortNumber.destroyBitnodeFlag));
   //ns.tprint(ns.peek(PortNumber.hackPercentage));

    //ns.tprint(factionName);
    //ns.tprint(ns.singularity.getAugmentationsFromFaction(factionName));
//
    //
    //ns.clearPort(12);
    //ns.writePort(12, false);
//
    //
    //ns.clearPort(13);
    //ns.writePort(13, "murder");

    //ns.tprint(ns.peek(12));

/*
    const locations = ns.infiltration.getPossibleLocations();

    for (const location of locations){        
        const info = ns.infiltration.getInfiltration(location.name);
        if (info.difficulty < 2.75){
            ns.tprint(location);
            ns.tprint(info.difficulty);
            ns.tprint(info.reward);
        }
    }

    */

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