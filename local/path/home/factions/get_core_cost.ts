export async function main(ns: NS) {
    const cost: number = ns.singularity.getUpgradeHomeCoresCost();
    ns.atExit(() => ns.writePort(ns.pid, cost));
}