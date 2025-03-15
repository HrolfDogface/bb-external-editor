export async function main(ns: NS) {
    ns.singularity.donateToFaction(String(ns.args[0]), Number((ns.args[1])));
    ns.atExit(() => ns.writePort(ns.pid, true));
}