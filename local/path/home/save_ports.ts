import { PortNumber } from "./port_enum";

export async function main(ns: NS) {

    const map = new Map();

    const ports = Object.keys(PortNumber).filter((item) => {
        return !isNaN(Number(item));
    });

    for (const port of ports){
        //if(ns.peek(Number(port)) != "NULL PORT DATA") map.set(port, ns.peek(Number(port)));
        map.set(port, ns.peek(Number(port)));
    }

    ns.write("ports-state.json", JSON.stringify(Object.fromEntries(map)), "w");

}