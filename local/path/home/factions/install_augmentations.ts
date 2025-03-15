export async function main(ns: NS) {
    ns.singularity.installAugmentations("prestige_trash.ts")
    ns.atExit(() => ns.writePort(ns.pid, true));
}