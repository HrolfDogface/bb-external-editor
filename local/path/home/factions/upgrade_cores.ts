export async function main(ns: NS) {
    const result: boolean = ns.singularity.upgradeHomeCores();
    ns.atExit(() => ns.writePort(ns.pid, result));
}