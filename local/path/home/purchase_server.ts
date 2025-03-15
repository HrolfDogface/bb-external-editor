export async function main(ns: NS) {

    const hostname: string = ns.purchaseServer(String(ns.args[0]),Number(ns.args[1]));
    ns.atExit(() => ns.writePort(ns.pid, hostname));

}