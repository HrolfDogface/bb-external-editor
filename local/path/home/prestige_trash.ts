export async function main(ns: NS) {


  //let currentMoney: number = 0;
  //let serverCost: number = ns.getPurchasedServerCost(256);
  //while( currentMoney < serverCost){
  //  currentMoney = ns.getServerMoneyAvailable("home");
  //  await ns.sleep(10000);
  //}
  
  ns.exec("trash_bash.ts", "home", 1, 40);

  let currentMoney: number = 0;
  while( currentMoney < 500000000){
    currentMoney = ns.getServerMoneyAvailable("home");
    await ns.sleep(10000);
  }
/*
  while (!ns.hasTorRouter()){
    ns.tprint("Buy Tor Router and scripts please");
    await ns.sleep(10000);
  }

  while (!ns.fileExists("BruteSSH.exe", "home")){
    ns.tprint("Buy BruteSSH.exe please");
    await ns.sleep(5000);
  }
  
  while (!ns.fileExists("FTPCrack.exe", "home")){
    ns.tprint("Buy FTPCrack.exe please");
    await ns.sleep(5000);
  }
*/
  ns.killall("home", true);

  ns.exec("trash_bash.ts", "home", 1, 100);

  const maxRam: number = ns.getPurchasedServerMaxRam();
  const ramCost: number = ns.getPurchasedServerCost(maxRam);
  currentMoney = 0;
  while ( currentMoney < ramCost * 25){
    currentMoney = ns.getServerMoneyAvailable("home");
    await ns.sleep(10000);
  }


  while (true){
    ns.killall("home", true);
    const servers: string[] = ns.getPurchasedServers();
    for(let i: number = 0; i < servers.length; i++){
      ns.killall(servers[i]);
    }

    const level: number = ns.getHackingLevel();
    ns.exec("trash_bash.ts", "home", 1, level/2);

    while (true){
      if (ns.getHackingLevel() > level * 1.25){
        break;
      }
      await ns.sleep(10000);
    }


  }

  ns.tprint("That death star is fully opperational!");
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
    if ((level <= maxLevel) && (level > 1) && (money > 0)) {
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