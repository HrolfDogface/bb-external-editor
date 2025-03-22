export async function main(ns: NS) {
    while (true){
        ns.killall("home", true);
        let servers: string[] = ns.getPurchasedServers();
        for(let i: number = 0; i < servers.length; i++){
          ns.killall(servers[i]);
        }
        ns.exec("factions/meta_daemon.ts", "home", 1);
        await ns.sleep(0);
      
    
        const level: number = ns.getHackingLevel();
        let scanLevel: number = level/3;
        if (servers.length > 10) scanLevel = level/2;
        ns.exec("trash_bash.ts", "home", 1, scanLevel);
        await ns.sleep(20000);
        
    
        servers = ns.getPurchasedServers();
        const currentRam: number = ns.getServerMaxRam(servers[0]);    
        const serverCost = ns.getPurchasedServerCost(currentRam);
        const upgradeCost = ns.getPurchasedServerCost(currentRam*2);
        const maxCost = ns.getPurchasedServerCost(ns.getPurchasedServerMaxRam());
        while (true){
            await ns.sleep(600000);
            if (ns.getHackingLevel() > level * 1.15){
              break;
            }  
            if ((servers.length < 15)&&(ns.getServerMoneyAvailable("home") )> maxCost){
              break;
            }       
            if (ns.getServerMoneyAvailable("home") > upgradeCost){
              break;
            }
            if ((servers.length < 10)&&(ns.getServerMoneyAvailable("home") > serverCost)){
              break;
            }
            if(servers.length >= 15){        
            ns.exec("share_pserv.ts", "home", 1);
            }
        }
    
    
      }

}