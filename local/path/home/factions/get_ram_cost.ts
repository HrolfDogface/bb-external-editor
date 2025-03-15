export async function main(ns: NS) {
    const cost: number = ns.singularity.getUpgradeHomeRamCost();
    ns.atExit(() => ns.writePort(ns.pid, cost));
}