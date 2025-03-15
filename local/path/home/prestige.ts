export async function main(ns: NS) {

  
  ns.write("prestigeLog.txt", performance.now() + "[prestige.ts]: new bitnode starting\n", "a");

  //set aside 50 pids to use as port id's for global variable storage
  ns.exec("burn_pids.ts", "home", 1, 50);

  const universityTargetLevel: number = 80;
  ns.exec("university.ts", "home", 1);
  let tempPid: number = ns.exec("get_hacking_level.ts", "home");
  await ns.nextPortWrite(tempPid);
  let level: number = ns.readPort(tempPid);

  while (level < universityTargetLevel){
    await ns.sleep(10000);
    tempPid = ns.exec("get_hacking_level.ts", "home");
    await ns.nextPortWrite(tempPid);
    level = ns.readPort(tempPid);
  }

  ns.exec("pop.ts", "home", 1, "joesguns");
  
  await ns.sleep(2000);
  ns.exec("scp.ts", "home", 1, "status_panel.ts", "joesguns");
  ns.exec('status_panel.ts', "joesguns");

  //const crime: string = "Mug";
  ns.exec("gym_mug.ts", "home", 1);

  let currentMoney: number = 0;

  tempPid = ns.exec("get_purchased_server_cost.ts", "home", 1, 128);
  await ns.nextPortWrite(tempPid);
  let serverCost: number = ns.readPort(tempPid);

  //wait for enough money and then start the loop
  while (currentMoney < serverCost){
    currentMoney = ns.getServerMoneyAvailable("home");
    await ns.sleep(10000);
  }
  
  //ns.kill("security.ts", "home", "n00dles");
  //ns.kill("money.ts", "home", "n00dles");
  //ns.kill("hack.ts","home", "n00dles");

  let firstLoop: boolean = true;
  let maxRam: number = ns.getPurchasedServerMaxRam();
  const maxMaxRam: number = maxRam;
  let hostname: string;
  let previousTarget: string = "";
  while (true){
    tempPid = ns.exec("get_hacking_level.ts", "home");
    await ns.nextPortWrite(tempPid);
    level = ns.readPort(tempPid) / 2;

    tempPid = ns.exec("get_purchased_server_cost.ts", "home", 1, maxRam);
    await ns.nextPortWrite(tempPid);
    let ramCost: number = ns.readPort(tempPid);

    if (level < 10){
      level = 10;
    }
    
    if(firstLoop){
      while(currentMoney < ramCost){
        maxRam = maxRam / 2;
        tempPid = ns.exec("get_purchased_server_cost.ts", "home", 1, maxRam);
        await ns.nextPortWrite(tempPid);
        ramCost = ns.readPort(tempPid);
      }
    }
    ns.exec("purchase_server.ts", "home", 1, "pserv-prestige", maxRam);
    await ns.nextPortWrite(tempPid);
    hostname = ns.readPort(tempPid);

    ns.exec("scp.ts", "home", 1, "target_prep.ts", hostname);
    ns.exec("scp.ts", "home", 1, "loop_max.ts", hostname);
    ns.exec("scp.ts", "home", 1, "money.ts", hostname);
    ns.exec("scp.ts", "home", 1, "security.ts", hostname);
    ns.exec("scp.ts", "home", 1, "hack.ts", hostname);
    ns.exec("scp.ts", "home", 1, "batch/pre_batcher.ts", hostname);
    ns.exec("scp.ts", "home", 1, "batch/batcher.ts", hostname);
    ns.exec("scp.ts", "home", 1, "batch/H_worker.ts", hostname);
    ns.exec("scp.ts", "home", 1, "batch/W_worker.ts", hostname);
    ns.exec("scp.ts", "home", 1, "batch/G_worker.ts", hostname);
    ns.exec("scp.ts", "home", 1, "batch/W_worker2.ts", hostname);
    firstLoop = false;

    let neighbors = search(ns, "home", level);
    neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });
    let target: string;
    if (neighbors[0].hostName != previousTarget)
    {
      target = neighbors[0].hostName;
      previousTarget = target;
    } else {
      target = neighbors[1].hostName;
      previousTarget = target;
    }

    //need to add port check to pop
    //ns.exec("pop.ts", "home", 1, target);
    //while(!portHack(ns, target)){    
    //  await ns.sleep(15000);
    //  }
    //await ns.sleep(2000);
    tempPid = ns.exec("pop.ts", "home", 1, target, true);
    await ns.nextPortWrite(tempPid);
    await ns.sleep(2000);
    if(maxRam < 1024 * 4){
      ns.exec("loop_max.ts", hostname, 1, hostname, target);
    }else{
      ns.exec("batch/batcher.ts", hostname, 1, hostname, target);
    }

    ns.writePort(1, target);

    if (ns.getServerMaxRam("home") < 64){
      tempPid = ns.exec("get_upgraded_home_ram_cost.ts", "home");
      await ns.nextPortWrite(tempPid);
      const ramUpgradeCost: number = ns.readPort(tempPid);
        
      //wait for enough money and then upgrade home ram one time before doing anything else
      while (currentMoney < ramUpgradeCost){
        currentMoney = ns.getServerMoneyAvailable("home");
        await ns.sleep(10000);
      }
      ns.exec("upgrade_Ram.ts", "home", 1);
    }
    
    ns.exec("pop_all.ts", "home", 1);
    await ns.sleep(10000);
    ns.exec("factions/join_all_factions.ts", "home", 1);
    await ns.sleep(10000);
    ns.exec("factions/auto_set_work.ts", "home", 1);
    ns.exec("proto_installer.ts", "home", 1);

    if (ns.getPurchasedServers().length >= ns.getPurchasedServerLimit() )
    {
      break;
    }

    maxRam = maxRam * 2;
    if (maxRam > maxMaxRam){
      maxRam = maxMaxRam;
    }
    tempPid = ns.exec("get_purchased_server_cost.ts", "home", 1, maxRam);
    await ns.nextPortWrite(tempPid);
    serverCost = ns.readPort(tempPid);
    while(true){
      
      currentMoney = ns.getServerMoneyAvailable("home");
      if( currentMoney >= serverCost){
        if(maxRam != maxMaxRam){
          break;
        } else {          
          tempPid = ns.exec("get_hacking_level.ts", "home");
          await ns.nextPortWrite(tempPid);
          const tempLevel: number = ns.readPort(tempPid);          
          if(tempLevel > level * 2.5){
            break;        
          }
        }
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