/** @param {NS} ns */
export async function main(ns: NS) {
  //ns.args[0] = maxLevel

  const maxLevel: number = Number(ns.args[0]);
  ns.write("scan-all.txt", "starting full network scan\n", "w");

  let neighbors = search(ns, "home", maxLevel);

  ns.write("scan-all.txt", "sorted by level\n", "a");
  neighbors = neighbors.sort(function (a, b) { return b.level - a.level; });
  for (let i = 0; i < neighbors.length; i++) {
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");

  }
  neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });

  ns.write("scan-all.txt", "sorted by money\n", "a");
  for (let i = 0; i < neighbors.length; i++) {
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");
  }

}

/** 
 * @param {NS} ns
 * @param {String} hostName
 *  */
export function search(ns: NS, hostName: string, maxLevel: number) {

  const neighbor = ns.scan(hostName);
  neighbor.splice(0, 1);
  let neighborRet = []; //neighbor.slice();
  for (let i = 0; i < neighbor.length; i++) {
    const money = ns.getServerMaxMoney(neighbor[i]);
    const level = ns.getServerRequiredHackingLevel(neighbor[i]);
    ns.write("scan-all.txt", neighbor[i] + " " + money + " " + level + "\n", "a");
    if (level < maxLevel) {
      //neighborRet.push(neighbor[i])
      neighborRet.push(new serverInfo(neighbor[i], money, level));
    }
    neighborRet = neighborRet.concat(search(ns, neighbor[i], maxLevel));
  }
  return neighborRet;
}

class serverInfo {

  hostName: string;
  money: string;
  level: string;

  constructor(hostName, money, level) {
    this.hostName = hostName;
    this.money = money;
    this.level = level;
  }
}  