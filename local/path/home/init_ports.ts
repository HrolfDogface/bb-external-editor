import { PortNumber } from "./port_enum";
import { Phase } from "./port_enum";

export async function main(ns: NS) {
    
    ns.exec("burn_pids.ts", "home", 1, 50);
    ns.exec("set_ports.ts", "home", 1);

    ns.clearPort(PortNumber.travelFlag);
    ns.clearPort(PortNumber.autoWorkFlag);
    ns.clearPort(PortNumber.sleeveTask);
    ns.clearPort(PortNumber.joinFlag);

    ns.writePort(PortNumber.travelFlag, true);

    switch(ns.peek(PortNumber.phase)){
        case(Phase.murderParty):
            ns.writePort(PortNumber.autoWorkFlag, false);
            ns.writePort(PortNumber.joinFlag, false);
            ns.writePort(PortNumber.sleeveTask, "murder");
            break;
        case(Phase.buyRam):
        case(Phase.gangStartup1):
        case(Phase.gangStartup2):
            ns.writePort(PortNumber.autoWorkFlag, false);
            ns.writePort(PortNumber.joinFlag, true);
            ns.writePort(PortNumber.sleeveTask, "uni");
            break;        
        case(Phase.gangGang):
        case(Phase.stackNFG):        
        case(Phase.stackNFG2):
        case(Phase.daedalusRep):
            ns.writePort(PortNumber.autoWorkFlag, true);
            ns.writePort(PortNumber.joinFlag, true);
            ns.writePort(PortNumber.sleeveTask, "uni");
            break;

    }

}