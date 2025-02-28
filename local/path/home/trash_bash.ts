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
  const currentMoney = ns.getServerMoneyAvailable("home");

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
  
  const targets = [];
  let count: number = 0
  if((maxRam <= ns.getServerMaxRam("home"))||(serverCount == 0)){
    count = 1;
    ns.exec("pop.js", "home", 1, neighbors[0].hostName);
    await ns.sleep(2000);
    ns.exec("batch/pre_batcher.js", "home", 1, neighbors[0].hostName, "home");
    ns.write("trash-log.txt", neighbors[0].hostName + " " + neighbors[0].money + " " + neighbors[0].level + "\n", "a");
    targets.push(neighbors[0].hostName);
  }

  const maxServers: number = ns.getPurchasedServerLimit();

  if(serverCount > maxServers){
    serverCount = maxServers;
  }

  let loopMax = serverCount + count;
  if (neighbors.length < loopMax) {
    loopMax = neighbors.length;
  }

 

  for (; count < loopMax; count++) {
    ns.write("trash-log.txt", neighbors[count].hostName + " " + neighbors[count].money + " " + neighbors[count].level + "\n", "a");
    let hostname = "pserv-" + count;
    if (!ns.serverExists(hostname)) {
      hostname = ns.purchaseServer("pserv-" + count, maxRam);
    }
    ns.scp("batch/target_prep.js", hostname);
    ns.scp("batch/pre_batcher.js", hostname);
    ns.scp("batch/money.js", hostname);
    ns.scp("batch/security.js", hostname);
    ns.scp("batch/H_worker.js", hostname);
    ns.scp("batch/W_worker.js", hostname);
    ns.scp("batch/G_worker.js", hostname);

    ns.exec("pop.js", "home", 1, neighbors[count].hostName);
    await ns.sleep(2000);
    ns.exec("batch/pre_batcher.js", hostname, 1, neighbors[count].hostName, hostname);
    targets.push(neighbors[count].hostName);

  }
  ns.exec('status_panel.js', "home", 1, ...targets);
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
    if ((level < maxLevel) && (level > 5) && (money > 0)) {
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