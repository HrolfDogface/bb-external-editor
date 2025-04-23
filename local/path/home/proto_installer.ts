import { PortNumber } from "./port_enum";

export async function main(ns: NS) {

    const augmentsMin: number = Number(ns.args[0]);

    //ns.tprint("debug pt. 1");
    const ownedAugs: string [] = ns.singularity.getOwnedAugmentations(false);
    if(ownedAugs.includes("The Red Pill")){    
        const level: number = ns.getHackingLevel();
        const daemonLevel: number = ns.getServerRequiredHackingLevel("w0r1d_d43m0n");
        if(level >= daemonLevel){
            ns.exec("popz.ts", "home", 1, "w0r1d_d43m0n");      
            await ns.sleep(10000);  
            if (ns.peek(PortNumber.destroyBitnodeFlag)){
                ns.exec("save_ports.ts", "home", 1);
                await ns.sleep(10);
                ns.exec("destroy_world_daemon.ts", "home", 1, ns.peek(PortNumber.nextBitnode), "enter_bitnode.ts"); 
            }   
            ns.tprint("destoy bitNode turned off");     
        }
    }
    
    //const currentRam: number = ns.getServerMaxRam("home");
    
    //ns.tprint("debug pt. 2");
    let tempPid: number = ns.exec("factions/get_ram_cost.ts", "home");
    await ns.nextPortWrite(tempPid);
    let ramUpgradeCost: number = ns.readPort(tempPid);

    //if (currentRam < (1024 * 8)){
    //    ramUpgradeCost = 2 * ramUpgradeCost * (1024 * 8) / currentRam;
    //}

    if (ns.getServerMoneyAvailable("home") > ramUpgradeCost){ //BOOP
        tempPid = ns.exec("factions/upgrade_ram.ts", "home");
        await ns.nextPortWrite(tempPid);
        ns.readPort(tempPid);
        //while (ns.getServerMaxRam("home") < (1024 * 8)){ //BOOP
        //    tempPid = ns.exec("factions/upgrade_ram.ts", "home");
        //    await ns.nextPortWrite(tempPid);
        //}
    }
    
    //if (ns.getServerMaxRam("home") < (1024 * 8)) return; //BOOP

    let nfgCount: number = augmentsMin - (ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length);
    if (nfgCount < 0) nfgCount = 0;
    const nfgBaseCost: number = ns.singularity.getAugmentationPrice("NeuroFlux Governor"); //BOOP
    const nfgCost: number = nfgBaseCost * Math.pow(1.14, nfgCount) * Math.pow(1.9, nfgCount);

    //const installCost: number = ramUpgradeCost + nfgCost;

   //ns.tprint("Money threshold for buying and installing augments: " + ns.formatNumber(nfgCost));
    
    if (ns.getServerMoneyAvailable("home") > nfgCost){ //BOOP
        
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
                        ns.readPort(tempPid);
                    }else if(ns.getFavorToDonate() <= ns.singularity.getFactionFavor(faction)){ //BOOP                        
                        tempPid = ns.exec("factions/donate.ts", "home", 1, faction, 100);
                        await ns.nextPortWrite(tempPid);
                        ns.readPort(tempPid);
                        const donationResult: number = ns.singularity.getFactionRep(faction) - rep; //BOOP
                        const donationAmmount: number = 99 * (ns.singularity.getAugmentationRepReq(augmentations[i]) - rep) / donationResult; //BOOP
                        if(donationAmmount <= ns.getServerMoneyAvailable("home")){ //BOOP
                            tempPid = ns.exec("factions/donate.ts", "home", 1, faction, donationAmmount);
                            await ns.nextPortWrite(tempPid);
                            ns.readPort(tempPid);
                            tempPid = ns.exec("factions/purchase.ts", "home", 1, faction, augmentations[i]);
                            await ns.nextPortWrite(tempPid);
                            ns.readPort(tempPid);
                        }
                    }

                    
                }
            }
        }

        //Purchase NFG
        while(ns.getServerMoneyAvailable("home") > ns.singularity.getAugmentationPrice("NeuroFlux Governor")){ //BOOP //BOOP
            const nfgRepReq: number = ns.singularity.getAugmentationRepReq("NeuroFlux Governor"); //BOOP
            const csecRep: number = ns.singularity.getFactionRep("NiteSec"); //BOOP
            //ns.tprint("debug pt. 3");
            
            if(nfgRepReq > csecRep){
                //ns.tprint("debug pt. A");
                if(ns.getFavorToDonate() > ns.singularity.getFactionFavor("NiteSec")){ //BOOP //BOOP
                    //ns.tprint("debug pt. B");
                    break;
                }else{
                    tempPid = ns.exec("factions/donate.ts", "home", 1, "NiteSec", 100);
                    await ns.nextPortWrite(tempPid);
                    ns.readPort(tempPid);
                    const donationResult: number = ns.singularity.getFactionRep("NiteSec") - csecRep; //BOOP
                    const donationAmmount: number = 99 * (nfgRepReq - csecRep) / donationResult;
                    if(donationAmmount > ns.getServerMoneyAvailable("home")){ //BOOP
                        //ns.tprint("debug pt. D");
                        break;
                    }else {
                        tempPid = ns.exec("factions/donate.ts", "home", 1, "NiteSec", donationAmmount);
                        await ns.nextPortWrite(tempPid);
                        ns.readPort(tempPid);
                    }
                }
            }
            //ns.tprint("debug pt. 4");
            tempPid = ns.exec("factions/purchase.ts", "home", 1, "NiteSec", "NeuroFlux Governor");
            await ns.nextPortWrite(tempPid);
            ns.readPort(tempPid);
            
        } 
    }

    if (ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length >= augmentsMin){
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
            tempPid = ns.exec("factions/upgrade_cores.ts", "home");
            await ns.nextPortWrite(tempPid);
            if(!ns.readPort(tempPid)) break;
            tempPid = ns.exec("factions/get_core_cost.ts", "home");
            await ns.nextPortWrite(tempPid);
            coreUpgradeCost = ns.readPort(tempPid);
        }
        ns.exec("save_ports.ts", "home", 1);
        await ns.sleep(10);
        ns.exec("factions/install_augmentations.ts", "home");
    }else if (ns.singularity.getOwnedAugmentations(true).includes("The Red Pill") && !ns.singularity.getOwnedAugmentations(false).includes("The Red Pill")){
        //install imediately if you have The Red Pill
        ns.exec("save_ports.ts", "home", 1);
        await ns.sleep(10);
        ns.exec("factions/install_augmentations.ts", "home");
    }else if (ns.singularity.getFactionFavor("NiteSec") + ns.singularity.getFactionFavorGain("NiteSec") > ns.getFavorToDonate()){
        //install if Cybersec has earmed enough faction to start donating on the next run
        if (ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length >= 1){
            if (ns.singularity.getFactionFavor("NiteSec") < ns.getFavorToDonate()){
                ns.exec("save_ports.ts", "home", 1);
                await ns.sleep(10);
                ns.exec("factions/install_augmentations.ts", "home");
            }
        }
    }
    
}