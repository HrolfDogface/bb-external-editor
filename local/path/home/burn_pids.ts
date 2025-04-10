//reserve pids 1 - 50
//1: Targets Status Panel signaling
//2: Controller Status Panel signaling
//
//
//11: Travel Flag
//12: auto work flag
//13: sleeve task
//14: destroy bitnode flag
//


export async function main(ns: NS) {

    const count: number = Number(ns.args[0]) - 1;
    if(count > 0){
        ns.exec("burn_pids.ts", "home", 1, count);
    }
    ns.clearPort(11);
    ns.clearPort(12);
    ns.clearPort(13);
    ns.clearPort(14);
//
    ns.writePort(11, true);
    ns.writePort(12, false);
    ns.writePort(13, "murder");
    ns.writePort(14, true);

}