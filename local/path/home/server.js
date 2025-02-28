/** @param {NS} ns */
export async function main(ns) {

  //const ram = 1024;
  const ram = 1024 * 1024;//ns.getPurchasedServerMaxRam();
  
  
  let cost = ns.getPurchasedServerCost(ram);

  ns.tprintf(`%dGB server costs $%d`, ram, cost);
  
  //ns.deleteServer("pserv-1");
  //ns.deleteServer("pserv-2");
  //ns.deleteServer("pserv-3");
  //ns.deleteServer("pserv-4");
  //ns.deleteServer("pserv-5");
  //ns.deleteServer("pserv-6");
  //ns.deleteServer("pserv-7");
  //ns.deleteServer("pserv-8");
  //ns.deleteServer("pserv-9");
  
 /*
  let hostname = ns.purchaseServer("pserv-" + ns.args[0], ram);
  ns.scp("batch/target_presp.js", hostname);
  ns.scp("batch/pre_batcher.js", hostname);
  ns.scp("batch/money.js", hostname);
  ns.scp("batch/security.js", hostname);
  ns.scp("batch/H_worker.js", hostname);
  ns.scp("batch/W_worker.js", hostname);
  ns.scp("batch/G_worker.js", hostname);
  
  ns.exec("pop.js", "home", 1, ns.args[1]);
  await ns.sleep(2000);
  ns.exec("batch/pre_batcher.js", hostname, 1, ns.args[1], hostname);
*/
  /*
  for (let i = 1; i < ns.args.length; i++){
    ns.exec("pop.js", "home", 1, ns.args[i]);
    await ns.sleep(2000);
    ns.exec("controller_basic.js", "home", 1, ns.args[i], 179, 925, 45, hostname);
  }
*/
/*
let maxMoney = ns.getServerMaxMoney(ns.args[0]);

ns.tprintf(`%s server has max $%d max money.`, ns.args[0], maxMoney);
  */
}