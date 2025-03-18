//reserve pids 1 - 50
//1: Targets Status Panel signaling
//2: Controller Status Panel signaling
//
//
//11: Travel Flag
//
//
//


export async function main(ns: NS) {

    const count: number = Number(ns.args[0]) - 1;
    if(count > 0){
        ns.exec("burn_pids.ts", "home", 1, count);
    }

    ns.writePort(11, true);

}