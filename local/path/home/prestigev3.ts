export async function main(ns: NS) {
    //set aside 50 pids to use as port id's for global variable storage
    ns.exec("init_ports.ts", "home", 1, 50);
    await ns.sleep(10);
    
    //mug for $500k
    let currentMoney: number = ns.getServerMoneyAvailable("home");
    if( currentMoney < 500000){
        ns.exec("gym_mug.ts", "home", 1, 50);
        await ns.sleep(0);
        while( currentMoney < 500000){
          currentMoney = ns.getServerMoneyAvailable("home");
          await ns.sleep(10000);
        }
    }

    //casino party
    ns.exec("casino.ts", "home", 1, 50);
    await ns.sleep(100);
    ns.exec("roulette.ts", "home", 1, 50);
    await ns.sleep(20000);

    while (ns.getServerMaxRam("home") < 512){
        ns.exec("upgrade_ram.ts", "home", 1);  
        await ns.sleep(100);
    }

    //return;
    ns.exec("sleever.ts", "home", 1);
    await ns.sleep(10);

    ns.exec("pop.ts", "home", 1, "joesguns");
    ns.exec("home_share.ts", "home");

    
    
    ns.exec("proto_installer.ts", "home", 1, 1);
    await ns.sleep(0);

    const universityTargetLevel: number = 61;
    ns.exec("university.ts", "home", 1);
    while (ns.getHackingLevel() < universityTargetLevel){
        await ns.sleep(10000);
    }

  
    await ns.sleep(60000);
    ns.scp("status_panel.ts", "joesguns");
    ns.exec('status_panel.ts', "joesguns");

    
    ns.singularity.commitCrime("Homicide");
    
    ns.exec("proto_installer.ts", "home", 1, 1);
    await ns.sleep(100);

    ns.singularity.travelToCity(ns.enums.CityName.Chongqing);
    //ns.exec("factions/meta_daemon.ts", "home", 1);
    ns.exec("batch/batcher_controller.ts", "home", 1);
    await ns.sleep(0);

    
    //ns.exec("gym_murder.ts", "home", 1, 50);
    //await ns.sleep(0);
    


}