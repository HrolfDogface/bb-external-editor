import { PortNumber } from "./port_enum";
import { Phase } from "./port_enum";

export async function main(ns: NS) {
  //ns.args[0] = maxLevel

  //ns.ui.openTail();
  const maxLevel: number = Number(ns.args[0]);
  let maxRam: number = ns.getPurchasedServerMaxRam();
  let ramCost: number = ns.getPurchasedServerCost(maxRam);

  ns.write("trash-log.txt", "starting full network scan\n", "w");

  let neighbors = search(ns, "home", maxLevel);

  neighbors = neighbors.sort(function (a, b) { return b.level - a.level; });
  for (let i = 0; i < neighbors.length; i++) {
    ns.write("trash-log.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");

  }
  //neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });
  neighbors = neighbors.sort(function (a, b) { return b.money/b.security - a.money/a.security; });

  let serverCount: number = 0;
  const currentMoney: number = ns.getServerMoneyAvailable("home");

  while(currentMoney < ramCost){
    maxRam = maxRam / 2;
    if(maxRam < 2048){
      maxRam = 2048;      
      ramCost = ns.getPurchasedServerCost(maxRam)
      break;
    }
    ramCost = ns.getPurchasedServerCost(maxRam)
  }

  if (currentMoney >= ramCost){
    serverCount = Math.floor(currentMoney/ramCost);
  }

  serverCount += ns.getPurchasedServers().length;
  
  ns.writePort(1, "clear");
  const hosts: string [] = [];
  let count: number = 0
  
  count = 1;
  hosts.push("home");

  const maxServers: number = ns.getPurchasedServerLimit();
  //const maxServers: number = 15;


  if(serverCount > maxServers){
    serverCount = maxServers;
  }

  if(ns.peek(PortNumber.phase) == Phase.gangGang){
    serverCount = 0;
  }
  const loopMax = serverCount + count;

 
  const countStart: number = count;
  for (; count < loopMax; count++) {
    //ns.write("trash-log.txt", neighbors[count].hostName + " " + neighbors[count].money + " " + neighbors[count].level + "\n", "a");
    let hostname = "pserv-" + (count - countStart);
    if (!ns.serverExists(hostname)) {
      if(ns.getPurchasedServerCost(maxRam) > ns.getServerMoneyAvailable("home")){
        break;
      }
      hostname = ns.purchaseServer("pserv-" + (count - countStart), maxRam);
    }else if(ns.getServerMaxRam(hostname) < maxRam){
        ns.upgradePurchasedServer(hostname, maxRam);
    }
    ns.scp("target_prep.ts", hostname);
    ns.scp("money.ts", hostname);
    ns.scp("security.ts", hostname);
    ns.scp("batch/gunner.ts", hostname);
    ns.scp("batch/H_worker.ts", hostname);
    ns.scp("batch/W_worker.ts", hostname);
    ns.scp("batch/G_worker.ts", hostname);
    ns.scp("batch/W_worker2.ts", hostname);
    
    hosts.push(hostname);

  }    

  //ns.exec("home_share.ts", "home");
  //ns.writePort(1, "joesguns");

  ns.exec("popz.ts", "home", 1, neighbors[0].hostName);
  await ns.sleep(2000);
  ns.exec("batch/gunner.ts", "home", 1, neighbors[0].hostName, ...hosts);
  ns.writePort(1, neighbors[0].hostName);  
  //ns.exec("hacknet/study_loop.ts", "home", 1, neighbors[0].hostName);

  //ns.exec("home_share.ts", "home");
}

export function search(ns: NS, hostName: string, maxLevel: number) {

  const neighbor = ns.scan(hostName);
  if(hostName != "home"){
    neighbor.splice(0, 1);
  }
  let neighborRet = []; //neighbor.slice();
  for (let i = 0; i < neighbor.length; i++) {
    const money: number = ns.getServerMaxMoney(neighbor[i]);
    const level: number = ns.getServerRequiredHackingLevel(neighbor[i]);
    const security: number = ns.getServerMinSecurityLevel(neighbor[i]);
    if ((level <= maxLevel) && (level > 5) && (money > 0)) {
      //neighborRet.push(neighbor[i])
      neighborRet.push(new serverInfo(neighbor[i], money, level, security));
      //ns.write("trash-log.txt", neighbor[i] + " " + money + " " + level + "\n", "a");
    }
    neighborRet = neighborRet.concat(search(ns, neighbor[i], maxLevel));
  }
  return neighborRet;
}

class serverInfo {

  hostName: string;
  money: number;
  level: number;
  security: number;

  constructor(hostName: string, money: number, level: number, security: number) {
    this.hostName = hostName;
    this.money = money;
    this.level = level;
    this.security = security;
  }
}  