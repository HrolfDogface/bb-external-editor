/** @param {NS} ns */
export async function main(ns: NS) {

  const ram = 1024 * 1024;

  ns.write("scan-all.txt", "starting full network scan\n", "w");

  let neighbors = search(ns, "home");

  ns.write("scan-all.txt", "sorted by level\n", "a");
  neighbors = neighbors.sort(function (a, b) {  return b.level - a.level;  });
  for (let i = 0; i < neighbors.length; i++){
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");

  }
  neighbors = neighbors.sort(function (a, b) {  return b.money - a.money;  });
  
  //let targets = [""];

  ns.write("scan-all.txt", "sorted by money\n", "a");
  for (let i = 0; i < neighbors.length; i++){
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");
    //targets.push(neighbors[i].hostName);
  }
  //targets.splice(0,1);
  //targets = ["n00dles", "joesguns"];

  //for (let i = 0; i < targets.length; i++){
  //  ns.print(targets[i]);
  //}
  //ns.tail()
  //ns.exec("status-panel.js", "home", 1, targets);

/*
  ns.exec("pop.js", "home", 1, neighbors[0].hostName);  
  await ns.sleep(2000);
  ns.exec("batch/pre-batcher.js", "home", 1, neighbors[0].hostName, "home");
  ns.write("scan-all.txt", neighbors[0].hostName + " " + neighbors[0].money + " " + neighbors[0].level + "\n", "a");

  let loopMax = 26;
  if ( neighbors.length < 26){
    loopMax = neighbors.length;
  }

  for (let i = 1; i < loopMax; i++){
    ns.write("scan-all.txt", neighbors[i].hostName + " " + neighbors[i].money + " " + neighbors[i].level + "\n", "a");
    let hostname = "pserv-" + i;
    if (!ns.serverExists(hostname)){
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

  }
  */
  //ns.write("scan-all.txt", neighbor[i] + " " + money + " " + level + "\n", "a");

}

/** 
 * @param {NS} ns
 * @param {String} hostName
 *  */
export function search(ns: NS, hostName) {

  let neighbor = ns.scan(hostName);
  neighbor.splice(0, 1);
  let neighborRet = []; //neighbor.slice();
  for (let i = 0; i < neighbor.length; i++) {
    let money = ns.getServerMaxMoney(neighbor[i]);
    let level = ns.getServerRequiredHackingLevel(neighbor[i]);
    ns.write("scan-all.txt", neighbor[i] + " " + money + " " + level + "\n", "a");
    if ((level < 1000)){
      //neighborRet.push(neighbor[i])
      neighborRet.push(new serverInfo(neighbor[i], money, level));
    }
    neighborRet = neighborRet.concat(search(ns, neighbor[i]));
  }
  return neighborRet;
}

class serverInfo {

  hostName: String;
  money: String;
  level: String;

  constructor (hostName, money, level){
    this.hostName = hostName;
    this.money = money;
    this.level = level;
  }
}  