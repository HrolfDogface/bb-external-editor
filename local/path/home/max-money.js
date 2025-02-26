/** @param {NS} ns */
export async function main(ns) {

  //const ram = 1024;
  const ram = 1024 * 1024;//ns.getPurchasedServerMaxRam();
  
  /*
  let cost = ns.getPurchasedServerCost(ram);

  ns.tprintf(`%dGB server costs $%d`, ram, cost);
  */
  
 /*
  let hostname = ns.purchaseServer("pserv-" + ns.args[0], ram);
  ns.scp("batch/target-prep.js", hostname);
  ns.scp("batch/pre-batcher.js", hostname);
  ns.scp("batch/money.js", hostname);
  ns.scp("batch/security.js", hostname);
  ns.scp("batch/H-worker.js", hostname);
  ns.scp("batch/W-worker.js", hostname);
  ns.scp("batch/G-worker.js", hostname);
  
  ns.exec("pop.js", "home", 1, ns.args[1]);
  await ns.sleep(2000);
  ns.exec("batch/pre-batcher.js", hostname, 1, ns.args[1], hostname);
*/
  /*
  for (let i = 1; i < ns.args.length; i++){
    ns.exec("pop.js", "home", 1, ns.args[i]);
    await ns.sleep(2000);
    ns.exec("controller-basic.js", "home", 1, ns.args[i], 179, 925, 45, hostname);
  }
*/


let maxMoney = ns.getServerMaxMoney(ns.args[0]);

ns.tprintf(`%s server has max $%d max money.`, ns.args[0], maxMoney);

/*
let servers = ns.getPurchasedServers();

for (let i = 0; i < servers.length; i++){
  ns.deleteServer(servers[i]);

}
 */
}