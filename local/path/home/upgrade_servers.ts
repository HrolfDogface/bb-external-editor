export async function main(ns: NS) {

    const maxRam: number = ns.getPurchasedServerMaxRam();

    const servers: string[] = ns.getPurchasedServers();
    let currentMoney: number;
    for(let i: number = 0; i < servers.length; i++){
        currentMoney = ns.getServerMoneyAvailable("home");
        if ( ns.getPurchasedServerUpgradeCost(servers[i], maxRam) > currentMoney){
            ns.upgradePurchasedServer(servers[i], maxRam);
        }
    }

}