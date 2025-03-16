export async function main(ns: NS) {

    //ns.tprint("debug pt. 1");
    const ownedAugs: string [] = ns.singularity.getOwnedAugmentations(false);
    if(ownedAugs.includes("The Red Pill")){    
        const level: number = ns.getHackingLevel();
        const daemonLevel: number = ns.getServerRequiredHackingLevel("w0r1d_d43m0n");
        if(level >= daemonLevel){
            ns.exec("popz.ts", "home", 1, "w0r1d_d43m0n");      
            await ns.sleep(10000);  
            ns.exec("destroy_world_daemon.ts", "home", 1, 12, "prestige.ts"); 
        }
    }
    
    const currentRam: number = ns.getServerMaxRam("home");
    
    //ns.tprint("debug pt. 2");
    let tempPid: number = ns.exec("factions/get_ram_cost.ts", "home");
    await ns.nextPortWrite(tempPid);
    let ramUpgradeCost: number = ns.readPort(tempPid);

    if (currentRam < (1024 * 8)){
        ramUpgradeCost = 2 * ramUpgradeCost * (1024 * 8) / currentRam;
    }

    if (ns.getServerMoneyAvailable("home") > ramUpgradeCost){ //BOOP
        tempPid = ns.exec("factions/upgrade_ram.ts", "home");
        await ns.nextPortWrite(tempPid);
        while (ns.getServerMaxRam("home") < (1024 * 8)){ //BOOP
            tempPid = ns.exec("factions/upgrade_ram.ts", "home");
            await ns.nextPortWrite(tempPid);
        }
    }
    
    if (ns.getServerMaxRam("home") < (1024 * 8)) return; //BOOP

    let nfgCount: number = 10 - ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length;
    if (nfgCount < 0) nfgCount = 0;
    const nfgBaseCost: number = ns.singularity.getAugmentationPrice("NeuroFlux Governor"); //BOOP
    const nfgCost: number = nfgBaseCost * Math.pow(1.14, nfgCount) * Math.pow(1.9, nfgCount);

    //const installCost: number = ramUpgradeCost + nfgCost;

   //ns.tprint("Money threshold for buying and installing augments: " + ns.formatNumber(nfgCost));
    
    if (ns.getServerMoneyAvailable("home") > nfgCost){ //BOOP
        
        //Purchase NFG
        while(ns.getServerMoneyAvailable("home") > ns.singularity.getAugmentationPrice("NeuroFlux Governor")){ //BOOP //BOOP
            const nfgRepReq: number = ns.singularity.getAugmentationRepReq("NeuroFlux Governor"); //BOOP
            const csecRep: number = ns.singularity.getFactionRep("CyberSec"); //BOOP
            //ns.tprint("debug pt. 3");
            
            if(nfgRepReq > csecRep){
                //ns.tprint("debug pt. A");
                if(ns.getFavorToDonate() > ns.singularity.getFactionFavor("CyberSec")){ //BOOP //BOOP
                    //ns.tprint("debug pt. B");
                    break;
                }else{
                    tempPid = ns.exec("factions/donate.ts", "home", 1, "CyberSec", 100);
                    await ns.nextPortWrite(tempPid);
                    const donationResult: number = ns.singularity.getFactionRep("CyberSec") - csecRep; //BOOP
                    const donationAmmount: number = 99 * (nfgRepReq - csecRep) / donationResult;
                    if(donationAmmount > ns.getServerMoneyAvailable("home")){ //BOOP
                        //ns.tprint("debug pt. D");
                        break;
                    }else {
                        tempPid = ns.exec("factions/donate.ts", "home", 1, "CyberSec", donationAmmount);
                        await ns.nextPortWrite(tempPid);
                    }
                }
            }
            //ns.tprint("debug pt. 4");
            tempPid = ns.exec("factions/purchase.ts", "home", 1, "CyberSec", "NeuroFlux Governor");
            await ns.nextPortWrite(tempPid);
            
        } 
        
            //go through each faction to see which ones have any rep to detect joined factions
        for(let i = 0; i < Object.keys(ns.enums.FactionName).length; i++){
            const faction: string = Object.values(ns.enums.FactionName)[i];
            const rep: number = ns.singularity.getFactionRep(faction) //BOOP
            if (rep > 0){
                //ns.tprint(faction);
                
                const ownedAugs: string [] = ns.singularity.getOwnedAugmentations(true);
                const augmentations: string [] = ns.singularity.getAugmentationsFromFaction(faction);
                for (let i = 0; i<augmentations.length;i++){

                    if (ownedAugs.includes(augmentations[i])){
                        continue;
                    }
                    if (ns.singularity.getAugmentationPrice(augmentations[i]) > ns.getServerMoneyAvailable("home")){ //BOOP //BOOP
                        continue;
                    }
                    //need to check if donation is possible to buy augmentation
                    if (rep > ns.singularity.getAugmentationRepReq(augmentations[i])){ //BOOP
                        tempPid = ns.exec("factions/purchase.ts", "home", 1, faction, augmentations[i]);
                        await ns.nextPortWrite(tempPid);
                    }else if(ns.getFavorToDonate() <= ns.singularity.getFactionFavor(faction)){ //BOOP                        
                        tempPid = ns.exec("factions/donate.ts", "home", 1, faction, 100);
                        await ns.nextPortWrite(tempPid);
                        const donationResult: number = ns.singularity.getFactionRep(faction) - rep; //BOOP
                        const donationAmmount: number = 99 * (ns.singularity.getAugmentationRepReq(augmentations[i]) - rep) / donationResult; //BOOP
                        if(donationAmmount <= ns.getServerMoneyAvailable("home")){ //BOOP
                            tempPid = ns.exec("factions/donate.ts", "home", 1, faction, donationAmmount);
                            await ns.nextPortWrite(tempPid);
                            tempPid = ns.exec("factions/purchase.ts", "home", 1, faction, augmentations[i]);
                            await ns.nextPortWrite(tempPid);
                        }
                    }

                    
                }
            }
        }
    }

    if (ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length >= 10){
        tempPid = ns.exec("factions/get_ram_cost.ts", "home");
        await ns.nextPortWrite(tempPid);
        ramUpgradeCost = ns.readPort(tempPid);
        while (ns.getServerMoneyAvailable("home") > ramUpgradeCost){ //BOOP
            ns.exec("factions/upgrade_ram.ts", "home");
            tempPid = ns.exec("factions/get_ram_cost.ts", "home");
            await ns.nextPortWrite(tempPid);
            ramUpgradeCost = ns.readPort(tempPid);
        }
        
        tempPid = ns.exec("factions/get_core_cost.ts", "home");
        await ns.nextPortWrite(tempPid);
        let coreUpgradeCost: number = ns.readPort(tempPid);
        while (ns.getServerMoneyAvailable("home") > coreUpgradeCost){ //BOOP
            ns.exec("factions/upgrade_cores.ts", "home");
            tempPid = ns.exec("factions/get_core_cost.ts", "home");
            await ns.nextPortWrite(tempPid);
            coreUpgradeCost = ns.readPort(tempPid);
        }
        ns.exec("factions/install_augmentations.ts", "home");
    }
    
}