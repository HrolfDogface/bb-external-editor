/** @param {NS} ns */
export async function main(ns) {

  const ram = 1024 * 1024;

  ns.write("scan-all.txt", "starting full network scan\n", "w");

  let neighbors = search(ns, "home");

  neighbors = neighbors.sort(function (a, b) { return b.level - a.level; });
  for (let i = 0; i < neighbors.length; i++) {
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");

  }
  neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });

  ns.exec("pop.js", "home", 1, neighbors[0].hostName);
  await ns.sleep(2000);
  ns.exec("batch/pre-batcher.js", "home", 1, neighbors[0].hostName, "home");
  ns.write("scan-all.txt", neighbors[0].hostName + " " + neighbors[0].money + " " + neighbors[0].level + "\n", "a");

  let loopMax = 26;
  if (neighbors.length < 26) {
    loopMax = neighbors.length;
  }

  let targets = [];
  targets.push(neighbors[0].hostName);

  for (let i = 1; i < loopMax; i++) {
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");
    let hostname = "pserv-" + i;
    if (!ns.serverExists(hostname)) {
      hostname = ns.purchaseServer("pserv-" + i, ram);
    }
    ns.scp("batch/target-prep.js", hostname);
    ns.scp("batch/pre-batcher.js", hostname);
    ns.scp("batch/money.js", hostname);
    ns.scp("batch/security.js", hostname);
    ns.scp("batch/H-worker.js", hostname);
    ns.scp("batch/W-worker.js", hostname);
    ns.scp("batch/G-worker.js", hostname);

    ns.exec("pop.js", "home", 1, neighbors[i].hostName);
    await ns.sleep(2000);
    ns.exec("batch/pre-batcher.js", hostname, 1, neighbors[i].hostName, hostname);
    targets.push(neighbors[i].hostName);

  }
  ns.exec('status-panel.js', "home", 1, ...targets);
  //ns.write("scan-all.txt", neighbor[i] + " " + money + " " + level + "\n", "a");

}

/** 
 * @param {NS} ns
 * @param {String} hostName
 *  */
export function search(ns, hostName) {

  let neighbor = ns.scan(hostName);
  neighbor.splice(0, 1);
  let neighborRet = []; //neighbor.slice();
  for (let i = 0; i < neighbor.length; i++) {
    let money = ns.getServerMaxMoney(neighbor[i]);
    let level = ns.getServerRequiredHackingLevel(neighbor[i]);
    if ((level < 2000) && (level > 5) && (money > 0)) {
      //neighborRet.push(neighbor[i])
      neighborRet.push(new serverInfo(neighbor[i], money, level));
      //ns.write("scan-all.txt", neighbor[i] + " " + money + " " + level + "\n", "a");
    }
    neighborRet = neighborRet.concat(search(ns, neighbor[i]));
  }
  return neighborRet;
}

class serverInfo {

  constructor(hostName, money, level) {
    this.hostName = hostName;
    this.money = money;
    this.level = level;
  }
}  