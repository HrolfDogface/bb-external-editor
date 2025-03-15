export async function main(ns: NS) {
    
    const cost: number = ns.getPurchasedServerCost(Number(ns.args[0]));
    ns.atExit(() => ns.writePort(ns.pid, cost));

}