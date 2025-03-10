export async function main(ns: NS) {

    const currentRam: number = ns.getServerMaxRam("home");
    let ramUpgradeCost: number = ns.singularity.getUpgradeHomeRamCost();

    if (currentRam < (1024 * 8)){
        ramUpgradeCost = 2 * ramUpgradeCost * (1024 * 8) / currentRam;
    }

    const nfgBaseCost = ns.singularity.getAugmentationPrice("NeuroFlux Governor");
    const nfgCost = nfgBaseCost * Math.pow(1.14, 10) * Math.pow(1.9, 10);

    const installCost = ramUpgradeCost + nfgCost;

    //ns.tprint("Money threshold for buying and installing augments: " + ns.formatNumber(installCost));

    if (ns.getServerMoneyAvailable("home") > installCost){
        ns.singularity.upgradeHomeRam();
        while (ns.getServerMaxRam("home") < (1024 * 8)){
            ns.singularity.upgradeHomeRam();
        }

        //Purchase NFG
        //Purchase other augments
        //purchase cores
        //install

    }

}