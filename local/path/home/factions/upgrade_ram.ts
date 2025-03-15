export async function main(ns: NS) {
    ns.singularity.upgradeHomeRam();
    ns.atExit(() => ns.writePort(ns.pid, true));
}