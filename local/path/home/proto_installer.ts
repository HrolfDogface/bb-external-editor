export async function main(ns: NS) {

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
    
    const nfgBaseCost: number = ns.singularity.getAugmentationPrice("NeuroFlux Governor");
    const nfgCost: number = nfgBaseCost * Math.pow(1.14, 10) * Math.pow(1.9, 10);

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
            if (ns.singularity.getFactionRep(Object.values(ns.enums.FactionName)[i]) > 0){
                ns.tprint(ns.enums.FactionName[i]);
                const augmentations: string [] = ns.singularity.getAugmentationsFromFaction(Object.values(ns.enums.FactionName)[i]);
                for (let i = 0; i<augmentations.length;i++){
                    ns.tprint(augmentations[i]);
                }
            }


        }
        //Purchase other augments
            //go through each faction's augments and find the most expensive one that can be afforded across all factions
            //buy the most expensive augment then the next until can't afford any more or they are all purchased
            //look for augments that can be afforded after a donation then donate and buy

        //purchase cores
        //install

    }

}