export async function main(ns: NS) {
    const ramUpgradeCost: number = ns.singularity.getUpgradeHomeRamCost();    
    ns.atExit(() => ns.writePort(ns.pid, ramUpgradeCost));
}