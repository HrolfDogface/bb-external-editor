import { PortNumber } from "./port_enum";
import { Phase } from "./port_enum";

export async function main(ns: NS) {

    //*****Begin block of code that exectues in every phase*****

    //set aside 50 pids to use as port id's for global variable storage
    ns.exec("init_ports.ts", "home", 1);
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

    const phase = ns.peek(PortNumber.phase);

    //*****End block of code that exectues in every phase*****

    
    const universityTargetLevel: number = 61;
    
    switch(phase){
        case(Phase.murderParty):
            phazeZero(ns);
            break;
        case(Phase.buyRam):
            phazeOne(ns);
            break;
        case(Phase.gangStartup1):
            phazeTwo(ns);
            break;
        case(Phase.gangStartup2):        
            phazeThree(ns);
            break;
        case(Phase.gangGang):  
            ns.exec("proto_installer.ts", "home", 1, 1);
            await ns.sleep(0);     
            phazeFour(ns);
            break;
        case(Phase.stackNFG):        
        case(Phase.stackNFG2):
        case(Phase.daedalusRep):
            ns.tprint("done with phase four");
            ns.exec("university.ts", "home", 1);
            while (ns.getHackingLevel() < universityTargetLevel){
                await ns.sleep(10000);
            }
            ns.exec("pop.ts", "home", 1, "joesguns");
            ns.exec("home_share.ts", "home");
            ns.scp("status_panel.ts", "joesguns");
            ns.exec('status_panel.ts', "joesguns");
            ns.exec("batch/batcher_controller.ts", "home", 1);
            break;

    }
    await ns.sleep(0);

    
    /*
    
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
    
    */

}

//prestige startup function for murder party phase
export function phazeZero(ns: NS){
    
    ns.singularity.commitCrime("Homicide");    
    
    ns.exec("gang/capo.ts", "home", 1);
}

//prestige startup function for buy ram phase
export function phazeOne(ns: NS){
    
    ns.singularity.commitCrime("Homicide");    

    if (ns.getServerMoneyAvailable("home") < ns.singularity.getUpgradeHomeRamCost()){

        ns.clearPort(PortNumber.phase);
        ns.writePort(PortNumber.phase, Phase.gangStartup1);
        ns.exec("soft_reset.ts", "home", 1);
        return;
    }

    while (ns.getServerMoneyAvailable("home") > ns.singularity.getUpgradeHomeRamCost()){
        ns.singularity.upgradeHomeRam();
    }

    ns.exec("soft_reset.ts", "home", 1);
}

//prestige startup function for first gang startup phase
export function phazeTwo(ns: NS){
    
    ns.singularity.commitCrime("Homicide");    
    
    ns.exec("gang/capo.ts", "home", 1);
}

//prestige startup function for second gang startup phase
export function phazeThree(ns: NS){
    
    ns.singularity.commitCrime("Homicide");    
    
    ns.exec("gang/capo.ts", "home", 1);

    //ns.tprint("done with phase two");
}

//prestige startup function for the slum snakes augmentation phase
export function phazeFour(ns: NS){
    
    ns.singularity.commitCrime("Homicide");    
    ns.singularity.travelToCity(ns.enums.CityName.Chongqing);
    ns.exec("batch/batcher_controller.ts", "home", 1);
    
}