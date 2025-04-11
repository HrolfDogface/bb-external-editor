import { PortNumber } from "./port_enum";

export async function main(ns: NS) {
    ns.exec("set_ports.ts", "home", 1);
    await ns.sleep(10);

    ns.clearPort(PortNumber.phase);
    ns.writePort(PortNumber.phase, 0);

    ns.exec("save_ports.ts", "home", 1);
    await ns.sleep(10);
    
    ns.exec("prestigev3.ts", "home", 1);
    await ns.sleep(10);

}