export async function main(ns: NS) {

    ns.disableLog('ALL');
    ns.ui.openTail();

    const startingMoney = ns.getServerMoneyAvailable("home");
    const startingTime = Date.now();

    while (true){
        await ns.sleep(500);
        ns.clearLog();
        ns.print("dollars per second: $" + ns.formatNumber((ns.getServerMoneyAvailable("home") - startingMoney) * 1000 / (Date.now() - startingTime)));
    }
}