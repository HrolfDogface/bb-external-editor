export async function main(ns: NS) {
    const level: number = ns.getHackingLevel();
    ns.atExit(() => ns.writePort(ns.pid, level));
}