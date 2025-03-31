export async function main(ns: NS) {

  //const ram = 1024 * 1024;
  const ram = 1024 * 64;//ns.getPurchasedServerMaxRam();
  
  
  let cost = ns.getPurchasedServerCost(ram);

  ns.tprintf(`%s server costs $%s`, ns.formatRam(ram), ns.formatNumber(cost));

  cost = ns.getPurchasedServerUpgradeCost("pserv-prestige", ram);  

  ns.tprintf(`%s server upgrade costs $%s`, ns.formatRam(ram), ns.formatNumber(cost));

  //ns.upgradePurchasedServer("pserv-prestige", ram);
  
  //ns.deleteServer("pserv-1");
  //ns.deleteServer("pserv-2");
  //ns.deleteServer("pserv-3");
  //ns.deleteServer("pserv-4");
  //ns.deleteServer("pserv-5");
  //ns.deleteServer("pserv-6");
  //ns.deleteServer("pserv-7");
  //ns.deleteServer("pserv-8");
  //ns.deleteServer("foo-0");
  
 /*
  //let hostname = ns.purchaseServer("pserv-" + ns.args[0], ram);
  let hostname = ns.purchaseServer("foo", ram);
  ns.scp("target_prep.ts", hostname);
  ns.scp("batch/batcher2.ts", hostname);
  ns.scp("money.ts", hostname);
  ns.scp("security.ts", hostname);
  ns.scp("batch/H_worker.ts", hostname);
  ns.scp("batch/W_worker.ts", hostname);
  ns.scp("batch/G_worker.ts", hostname);
  ns.scp("batch/W_worker2.ts", hostname);
  */
  
  //ns.exec("pop.ts", "home", 1, ns.args[1]);
  //await ns.sleep(2000);
  //ns.exec("batch/pre_batcher.ts", hostname, 1, ns.args[1], hostname);

  /*
  for (let i = 1; i < ns.args.length; i++){
    ns.exec("pop.ts", "home", 1, ns.args[i]);
    await ns.sleep(2000);
    ns.exec("controller_basic.ts", "home", 1, ns.args[i], 179, 925, 45, hostname);
  }
*/
/*
let maxMoney = ns.getServerMaxMoney(ns.args[0]);

ns.tprintf(`%s server has max $%d max money.`, ns.args[0], maxMoney);
  */
}