export async function main(ns: NS) {
    let maxRam: number = ns.getPurchasedServerMaxRam();
    let ramCost: number = ns.getPurchasedServerCost(maxRam);

    const currentMoney = ns.getServerMoneyAvailable("home");

    while(currentMoney < ramCost){
        maxRam = maxRam / 2;
        ramCost = ns.getPurchasedServerCost(maxRam)
    }

    ns.tprintf("purchased %s with %fGB of ram.",ns.purchaseServer("pserv-", maxRam), maxRam);

}