export async function main(ns: NS) {

  const universityTargetLevel: number = 80;
  ns.exec("university.ts", "home", 1);
  while (ns.getHackingLevel() < universityTargetLevel){
    await ns.sleep(10000);
  }

  ns.exec("pop.ts", "home", 1, "joesguns");
  
  await ns.sleep(2000);
  ns.scp("status_panel.ts", "joesguns");
  ns.exec('status_panel.ts', "joesguns");

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

  const maxRam: number = ns.getServerMaxRam("home");
  const ramCost: number = ns.getPurchasedServerCost(maxRam);
  currentMoney = 0;
  while (( currentMoney < ramCost)&&(ns.getHackingLevel() < 600)){
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
    let scanLevel: number = level/3;
    if (servers.length > 10) scanLevel = level/2
    ns.exec("trash_bash.ts", "home", 1, scanLevel);
    const serverCost = ns.getPurchasedServerCost(ns.getServerMaxRam(servers[0]);
    while (true){
      if (ns.getHackingLevel() > level * 1.25){
        break;
      }
      if ((servers.length < 10)&&(ns.getServerMoneyAvailable("home") > serverCost)){
        break;
      }
      await ns.sleep(10000);
    }


  }

  ns.tprint("That death star is fully opperational!");
} 