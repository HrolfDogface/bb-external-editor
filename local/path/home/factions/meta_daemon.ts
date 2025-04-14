import { PortNumber } from "./../port_enum";
import { Phase } from "./../port_enum";

export async function main(ns: NS) {

    while(true){        
    ns.exec("pop_all.ts", "home", 1);
    await ns.sleep(10000);
    ns.exec("factions/join_all_factions.ts", "home", 1);
    await ns.sleep(10000);
    ns.exec("factions/auto_set_work.ts", "home", 1);
    if(ns.peek(PortNumber.phase) == Phase.gangGang){
        ns.exec("proto_installer.ts", "home", 1, 1);
    }else {
        ns.exec("proto_installer.ts", "home", 1, 10);
    }
    await ns.sleep(60000);
    }

}