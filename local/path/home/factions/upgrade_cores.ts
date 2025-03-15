export async function main(ns: NS) {
    ns.singularity.upgradeHomeCores();
    ns.atExit(() => ns.writePort(ns.pid, true));
}