export async function main(ns: NS) {

const hostName: string = String(ns.args[0]);

const maxMoney: number = ns.getServerMaxMoney(hostName);
ns.tprintf(`%s server has max $%d max money.`, hostName, maxMoney);
}