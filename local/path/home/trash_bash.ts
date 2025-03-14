export async function main(ns: NS) {
  //ns.args[0] = maxLevel

  const maxLevel: number = Number(ns.args[0]);
  let maxRam: number = ns.getPurchasedServerMaxRam();
  let ramCost: number = ns.getPurchasedServerCost(maxRam);

  ns.write("trash-log.txt", "starting full network scan\n", "w");

  let neighbors = search(ns, "home", maxLevel);

  neighbors = neighbors.sort(function (a, b) { return b.level - a.level; });
  for (let i = 0; i < neighbors.length; i++) {
    ns.write("trash-log.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");

  }
  neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });

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
  let count: number = 0
  if((maxRam <= ns.getServerMaxRam("home"))||(serverCount == 0)){
    count = 1;
    ns.exec("popz.ts", "home", 1, neighbors[0].hostName);
    await ns.sleep(2000);
    ns.exec("batch/batcher.ts", "home", 1, "home", neighbors[0].hostName);
    ns.write("trash-log.txt", neighbors[0].hostName + " " + neighbors[0].money + " " + neighbors[0].level + "\n", "a");
    ns.writePort(1, neighbors[0].hostName);
  }

  //const maxServers: number = ns.getPurchasedServerLimit();
  const maxServers: number = 15;


  if(serverCount > maxServers){
    serverCount = maxServers;
  }

  let loopMax = serverCount + count;
  if (neighbors.length < loopMax) {
    loopMax = neighbors.length;
  }

 
  const countStart = count
  for (; count < loopMax; count++) {
    ns.write("trash-log.txt", neighbors[count].hostName + " " + neighbors[count].money + " " + neighbors[count].level + "\n", "a");
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
    ns.scp("batch/batcher.ts", hostname);
    ns.scp("money.ts", hostname);
    ns.scp("security.ts", hostname);
    ns.scp("batch/H_worker.ts", hostname);
    ns.scp("batch/W_worker.ts", hostname);
    ns.scp("batch/G_worker.ts", hostname);
    ns.scp("batch/W_worker2.ts", hostname);

    ns.exec("popz.ts", "home", 1, neighbors[count].hostName);
    await ns.sleep(2000);
    ns.exec("batch/batcher.ts", hostname, 1, hostname, neighbors[count].hostName);
    ns.writePort(1, neighbors[count].hostName);

  }
  //ns.exec('status_panel.ts', "home", 1, ...targets);
  //ns.write("trash-log.txt", neighbor[i] + " " + money + " " + level + "\n", "a");

}

export function search(ns: NS, hostName: string, maxLevel: number) {

  const neighbor = ns.scan(hostName);
  if(hostName != "home"){
    neighbor.splice(0, 1);
  }
  let neighborRet = []; //neighbor.slice();
  for (let i = 0; i < neighbor.length; i++) {
    const money = ns.getServerMaxMoney(neighbor[i]);
    const level = ns.getServerRequiredHackingLevel(neighbor[i]);
    if ((level <= maxLevel) && (level > 5) && (money > 0)) {
      //neighborRet.push(neighbor[i])
      neighborRet.push(new serverInfo(neighbor[i], money, level));
      //ns.write("trash-log.txt", neighbor[i] + " " + money + " " + level + "\n", "a");
    }
    neighborRet = neighborRet.concat(search(ns, neighbor[i], maxLevel));
  }
  return neighborRet;
}

class serverInfo {

  hostName: string;
  money: string;
  level: string;

  constructor(hostName, money, level) {
    this.hostName = hostName;
    this.money = money;
    this.level = level;
  }
}  