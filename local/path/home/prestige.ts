export async function main(ns: NS) {

  //ns.exec("pop.js", "home", 1, "n00dles");
  //await ns.sleep(10000);

  //ns.exec("loop_max.ts", "home", 1, "home", "n00dles");


  let currentMoney: number = 0;
  let serverCost: number = ns.getPurchasedServerCost(64);
  while( currentMoney < serverCost){
    currentMoney = ns.getServerMoneyAvailable("home");
    await ns.sleep(10000);
  }
  
  //ns.kill("security.js", "home", "n00dles");
  //ns.kill("money.js", "home", "n00dles");
  //ns.kill("hack.js","home", "n00dles");

  let firstLoop: boolean = true;
  let maxRam: number = ns.getPurchasedServerMaxRam();
  const maxMaxRam: number = maxRam;
  let hostname: string;

  while (true){
    let level: number = ns.getHackingLevel() / 2;
    let ramCost: number = ns.getPurchasedServerCost(maxRam);

    if (level < 5){
      level = 5;
    }
    
    if(firstLoop){
      while(currentMoney < ramCost){
        maxRam = maxRam / 2;
        ramCost = ns.getPurchasedServerCost(maxRam)
      }
    }
    hostname = ns.purchaseServer("pserv-prestige", maxRam);
    
    ns.scp("target_prep.js", hostname);
    ns.scp("loop_max.ts", hostname);
    ns.scp("money.js", hostname);
    ns.scp("security.js", hostname);
    ns.scp("hack.js", hostname);
    ns.scp("batch/pre_batcher.ts", hostname);
    ns.scp("batch/H_worker.js", hostname);
    ns.scp("batch/W_worker.js", hostname);
    ns.scp("batch/G_worker.js", hostname);
    firstLoop = false;

    let neighbors = search(ns, "home", level);
    neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });
    const target: string = neighbors[0].hostName;

    //need to add port check to pop
    ns.exec("pop.js", "home", 1, target);
    await ns.sleep(2000);
    if(maxRam < 1024 * 4){
      ns.exec("loop_max.ts", hostname, 1, hostname, target);
    }else{
      ns.exec("batch/pre_batcher.ts", hostname, 1, hostname, target);
    }

    ns.exec('status_panel.js', "home", 1, target);

    if (ns.getPurchasedServers().length >= ns.getPurchasedServerLimit() )
    {
      break;
    }
    
    maxRam = maxRam * 4;
    if (maxRam > maxMaxRam){
      maxRam = maxMaxRam;
    }
    serverCost = ns.getPurchasedServerCost(maxRam);
    while(true){
      
      currentMoney = ns.getServerMoneyAvailable("home");
      if( currentMoney >= serverCost){
        if(maxRam != maxMaxRam){
          break;
        } else {
          if(ns.getHackingLevel() > level * 3){
            break;        
          }
        }
      }

      //if(ns.getHackingLevel() > level * 4.5){
      //  break;        
      //}

      await ns.sleep(10000);
    }

    //ns.kill('status_panel.js', "home", target);
  }

  //while (!ns.hasTorRouter()){
  //  ns.tprint("Buy Tor Router and scripts please");
  //  await ns.sleep(10000);
  //}
//
  //while (!ns.fileExists("BruteSSH.exe", "home")){
  //  ns.tprint("Buy BruteSSH.exe please");
  //  await ns.sleep(5000);
  //}
  //
  //while (!ns.fileExists("FTPCrack.exe", "home")){
  //  ns.tprint("Buy FTPCrack.exe please");
  //  await ns.sleep(5000);
  //}
//
  //while (ns.getHackingLevel() < 250){
  //  ns.tprint("Waiting for level 500");
  //  await ns.sleep(250);
  //}
//
  //ns.kill("security.js", "home", "n00dles");
  //ns.kill("money.js", "home", "n00dles");
  //ns.kill("hack.js", "home", "n00dles");
//
  //
  //const hostNames = ["sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", 
  //                "harakiri-sushi", "iron-gym", "phantasy", "silver-helix", 
  //                "foodnstuff", "zer0"/*, "crush-fitness", "max-hardware", "neo-net", 
  //                "omega-net"*/];

 //for (let i = 0; i < hostNames.length; i++){
 //  ns.exec("pop.js", "home", 1, hostNames[i]);
 //  await ns.sleep(2000);
 //  //ns.exec("controller_basic.js", "home", 1, hostNames[i], 200, 1500, 20, "home");
 //  ns.exec("controller_basic.js", "home", 1, hostNames[i], 200, 1500, 20, "home");
 //}

  /*while (ns.getHackingLevel() < 150){
    ns.tprint("Waiting for level 100");
    await ns.sleep(30000);
  }

  hostNames = ["iron-gym", "phantasy", "silver-helix"]

  for (let i = 0; i < hostNames.length; i++){
    ns.exec("pop.js", "home", 1, hostNames[i]);
    await ns.sleep(2000);
    ns.exec("controller_basic.js", "home", 1, hostNames[i], 179, 925, 45 );
  }*/

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