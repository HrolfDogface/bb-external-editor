export async function main(ns: NS) {

    const maxServers: number = ns.getPurchasedServerLimit();
    //const serverCount: number = ns.getPurchasedServers().length;
    const maxRam: number = ns.getPurchasedServerMaxRam();
    for (let count: number = 15 ; count < maxServers; count++) {
      let hostname = "pserv-" + (count);
      if (!ns.serverExists(hostname)) {
        if(ns.getPurchasedServerCost(maxRam) > ns.getServerMoneyAvailable("home")){
          break;
        }
        hostname = ns.purchaseServer("pserv-" + (count), maxRam);
      }else if(ns.getServerMaxRam(hostname) < maxRam){
          ns.upgradePurchasedServer(hostname, maxRam);
      }
      const freeRam: number = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);
      const threads: number = freeRam / 4;
      if (threads < 1) continue;
      ns.scp("share.ts", hostname);
      ns.exec("share.ts", hostname, threads);
  }

}