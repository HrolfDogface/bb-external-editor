export async function main(ns: NS) {

    const currentRam: number = ns.getServerMaxRam("home");
    let ramUpgradeCost: number = ns.singularity.getUpgradeHomeRamCost();

    if (currentRam < (1024 * 8)){
        ramUpgradeCost = 2 * ramUpgradeCost * (1024 * 8) / currentRam;
    }

    const nfgBaseCost: number = ns.singularity.getAugmentationPrice("NeuroFlux Governor");
    const nfgCost: number = nfgBaseCost * Math.pow(1.14, 10) * Math.pow(1.9, 10);

    const installCost: number = ramUpgradeCost + nfgCost;

   // ns.tprint("Money threshold for buying and installing augments: " + ns.formatNumber(installCost));

    if (ns.getServerMoneyAvailable("home") > installCost){
        ns.singularity.upgradeHomeRam();
        while (ns.getServerMaxRam("home") < (1024 * 8)){
            ns.singularity.upgradeHomeRam();
        }

        //Purchase NFG
        while(ns.getServerMoneyAvailable("home") > ns.singularity.getAugmentationPrice("NeuroFlux Governor")){
            const nfgRepReq: number = ns.singularity.getAugmentationRepReq("NeuroFlux Governor");
            const csecRep: number = ns.singularity.getFactionRep("CyberSec");
            if(nfgRepReq > csecRep){
                if(ns.getFavorToDonate() > ns.singularity.getFactionFavor("CyberSec")){
                    break;
                }else{
                    ns.singularity.donateToFaction("CyberSec", 100);
                    const donationResult: number = ns.singularity.getFactionRep("CyberSec") - csecRep;
                    const donationAmmount: number = 99 * (nfgRepReq - csecRep) / donationResult;
                    if(donationAmmount > ns.singularity.getFactionFavor("CyberSec")){
                        break;
                    }else {
                        ns.singularity.donateToFaction("CyberSec", donationAmmount);
                    }
                }
            }
            ns.singularity.purchaseAugmentation("CyberSec", "NeuroFlux Governor");
        }

       

        
        //Purchase other augments
        //purchase cores
        //install

    }

}