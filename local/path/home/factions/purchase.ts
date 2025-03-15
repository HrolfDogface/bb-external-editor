export async function main(ns: NS) {
    ns.singularity.purchaseAugmentation(String(ns.args[0]), String((ns.args[1])));
    ns.atExit(() => ns.writePort(ns.pid, true));
}