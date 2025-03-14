export async function main(ns: NS) {

    const level: number = ns.getHackingLevel();
    const daemonLevel: number = ns.getServerRequiredHackingLevel("w0r1d_d43m0n");
    if(level >= daemonLevel){
        ns.exec("popz.ts", "home", 1, "w0r1d_d43m0n");      
        await ns.sleep(10000);  
        ns.singularity.destroyW0r1dD43m0n(12, "prestige.ts");
    }

    const currentRam: number = ns.getServerMaxRam("home");
    let ramUpgradeCost: number = ns.singularity.getUpgradeHomeRamCost();

    if (currentRam < (1024 * 8)){
        ramUpgradeCost = 2 * ramUpgradeCost * (1024 * 8) / currentRam;
    }

    if (ns.getServerMoneyAvailable("home") > ramUpgradeCost){
        ns.singularity.upgradeHomeRam();
        while (ns.getServerMaxRam("home") < (1024 * 8)){
            ns.singularity.upgradeHomeRam();
        }
    }

    if (ns.getServerMaxRam("home") < (1024 * 8)) return;

    let nfgCount: number = 10 - ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length;
    if (nfgCount < 0) nfgCount = 0;
    const nfgBaseCost: number = ns.singularity.getAugmentationPrice("NeuroFlux Governor");
    const nfgCost: number = nfgBaseCost * Math.pow(1.14, nfgCount) * Math.pow(1.9, nfgCount);

    //const installCost: number = ramUpgradeCost + nfgCost;

   //ns.tprint("Money threshold for buying and installing augments: " + ns.formatNumber(nfgCost));

    if (ns.getServerMoneyAvailable("home") > nfgCost){
        
        //Purchase NFG
        while(ns.getServerMoneyAvailable("home") > ns.singularity.getAugmentationPrice("NeuroFlux Governor")){
            const nfgRepReq: number = ns.singularity.getAugmentationRepReq("NeuroFlux Governor");
            const csecRep: number = ns.singularity.getFactionRep("CyberSec");
            if(nfgRepReq > csecRep){
                //ns.tprint("debug pt. A");
                if(ns.getFavorToDonate() > ns.singularity.getFactionFavor("CyberSec")){
                    //ns.tprint("debug pt. B");
                    break;
                }else{
                    //ns.tprint("debug pt. C");
                    ns.singularity.donateToFaction("CyberSec", 100);
                    const donationResult: number = ns.singularity.getFactionRep("CyberSec") - csecRep;
                    const donationAmmount: number = 99 * (nfgRepReq - csecRep) / donationResult;
                    if(donationAmmount > ns.getServerMoneyAvailable("home")){
                        //ns.tprint("debug pt. D");
                        break;
                    }else {
                        //ns.tprint("debug pt. E");
                        ns.singularity.donateToFaction("CyberSec", donationAmmount);
                    }
                }
            }
            ns.singularity.purchaseAugmentation("CyberSec", "NeuroFlux Governor");
        }  

            //go through each faction to see which ones have any rep to detect joined factions
        for(let i = 0; i < Object.keys(ns.enums.FactionName).length; i++){
            const faction: string = Object.values(ns.enums.FactionName)[i];
            const rep: number = ns.singularity.getFactionRep(faction)
            if (rep > 0){
                //ns.tprint(faction);
                
                const ownedAugs: string [] = ns.singularity.getOwnedAugmentations(true);
                const augmentations: string [] = ns.singularity.getAugmentationsFromFaction(faction);
                for (let i = 0; i<augmentations.length;i++){
                    //ns.tprint(augmentations[i]);
                    //ns.tprint(ns.singularity.getAugmentationPrice(augmentations[i]));

                    if (ownedAugs.includes(augmentations[i])){
                        continue;
                    }
                    if (ns.singularity.getAugmentationPrice(augmentations[i]) > ns.getServerMoneyAvailable("home")){
                        continue;
                    }
                    //need to check if donation is possible to buy augmentation
                    if (rep > ns.singularity.getAugmentationRepReq(augmentations[i])){
                        ns.singularity.purchaseAugmentation(faction, augmentations[i]);
                    }else if(ns.getFavorToDonate() <= ns.singularity.getFactionFavor(faction)){
                        ns.singularity.donateToFaction(faction, 100);
                        const donationResult: number = ns.singularity.getFactionRep(faction) - rep;
                        const donationAmmount: number = 99 * (ns.singularity.getAugmentationRepReq(augmentations[i]) - rep) / donationResult;
                        if(donationAmmount <= ns.getServerMoneyAvailable("home")){
                           ns.singularity.donateToFaction(faction, donationAmmount);
                           ns.singularity.purchaseAugmentation(faction, augmentations[i]);
                        }
                    }

                    
                }
            }
        }

        if (ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length >= 10){
            while (ns.getServerMoneyAvailable("home") > ns.singularity.getUpgradeHomeRamCost()){
                ns.singularity.upgradeHomeRam();
            }

            while (ns.getServerMoneyAvailable("home") > ns.singularity.getUpgradeHomeCoresCost()){
                ns.singularity.upgradeHomeCores();
            }

            ns.singularity.installAugmentations("prestige_trash.ts")

        }


        //Purchase other augments
            //go through each faction's augments and find the most expensive one that can be afforded across all factions
            //buy the most expensive augment then the next until can't afford any more or they are all purchased
            //look for augments that can be afforded after a donation then donate and buy

        //purchase cores
        //install

    }

}