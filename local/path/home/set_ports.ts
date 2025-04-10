import { PortNumber } from "./port_enum";

export async function main(ns: NS) {

    const dic = JSON.parse(ns.read("ports-state.json"));
    const map = new Map(Object.entries(dic));

    const ports = Object.keys(PortNumber).filter((item) => {
        return !isNaN(Number(item));
    });
    for (const port of ports){
        //if(ns.peek(Number(port)) != "NULL PORT DATA") map.set(port, ns.peek(Number(port)));
        ns.clearPort(Number(port));
        ns.writePort(Number(port), map.get(port));
    }

}