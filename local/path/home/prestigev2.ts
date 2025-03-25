export async function main(ns: NS) {
    //set aside 50 pids to use as port id's for global variable storage
    ns.exec("burn_pids.ts", "home", 1, 50);
    await ns.sleep(0);

    //comment out crime for starting money once I have starter kit.
    //should automate this check.
    /*
    //mug for $500k
    ns.exec("gym_mug.ts", "home", 1, 50);
    await ns.sleep(0);
    let currentMoney: number = 0;
    while( currentMoney < 500000){
      currentMoney = ns.getServerMoneyAvailable("home");
      await ns.sleep(10000);
    }
*/
    //casino party
    ns.exec("casino.ts", "home", 1, 50);
    await ns.sleep(100);
    ns.exec("roulette.ts", "home", 1, 50);
    await ns.sleep(20000);

    if (ns.getServerMaxRam("home") < 64){
        ns.exec("upgrade_ram.ts", "home", 1);  
        await ns.sleep(0);
    }

    //return;

    const universityTargetLevel: number = 130;
    ns.exec("university.ts", "home", 1);
    while (ns.getHackingLevel() < universityTargetLevel){
        await ns.sleep(10000);
    }

    ns.exec("pop.ts", "home", 1, "joesguns");
  
    await ns.sleep(2000);
    ns.scp("status_panel.ts", "joesguns");
    ns.exec('status_panel.ts', "joesguns");

    ns.singularity.travelToCity(ns.enums.CityName.Chongqing);
    //ns.exec("factions/meta_daemon.ts", "home", 1);
    ns.exec("batch/batcher_controller.ts", "home", 1);
    await ns.sleep(0);

}