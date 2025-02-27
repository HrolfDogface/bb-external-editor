/** @param {NS} ns */
export async function main(ns: NS) {
  //ns.args[0] = maxLevel

  const maxLevel: number = Number(ns.args[0]);
  ns.write("scan_all.txt", "starting full network scan\n", "w");

  let neighbors: ServerInfo[] = search(ns, "home", maxLevel);

  ns.write("scan_all.txt", "sorted by level\n", "a");
  neighbors = neighbors.sort(function (a, b) { return b.level - a.level; });
  for (let i: number = 0; i < neighbors.length; i++) {
    ns.write("scan_all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");

  }
  neighbors = neighbors.sort(function (a, b) { return b.money - a.money; });

  ns.write("scan_all.txt", "sorted by money\n", "a");
  for (let i = 0; i < neighbors.length; i++) {
    ns.write("scan_all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");
  }

}

/** 
 * @param {NS} ns
 * @param {String} hostName
 *  */
export function search(ns: NS, hostName: string, maxLevel: number) {

  const neighbor: string[] = ns.scan(hostName);
  neighbor.splice(0, 1);
  let neighborReturn: ServerInfo[] = [];
  for (let i: number = 0; i < neighbor.length; i++) {
    const money: number = ns.getServerMaxMoney(neighbor[i]);
    const level: number = ns.getServerRequiredHackingLevel(neighbor[i]);
    ns.write("scan_all.txt", neighbor[i] + " " + money + " " + level + "\n", "a");
    if (level < maxLevel) {
      neighborReturn.push(new ServerInfo(neighbor[i], money, level));
    }
    neighborReturn = neighborReturn.concat(search(ns, neighbor[i], maxLevel));
  }
  return neighborReturn;
}

class ServerInfo {

  hostName: string;
  money: number;
  level: number;

  constructor(hostName: string, money: number, level: number) {
    this.hostName = hostName;
    this.money = money;
    this.level = level;
  }
}  