/** @param {NS} ns */
export async function main(ns) {  
  const red = "\u001b[31m";
  const reset = "\u001b[0m";
  //const hostNames = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net"]
  const hostNames = ["n00dles", "joesguns", "nectar-net"];

  while (true){

    let count = 0;
    for (let i = 0; i < hostNames.length; i++){
      if (ns.getServerMoneyAvailable(hostNames[i]) < (ns.getServerMaxMoney(hostNames[i]) * 0.95)){
        await ns.grow(hostNames[i]);
        count++;
      }
    }
    
    ns.printf(`${red}%d servers need growing.${reset}`, count);
    await ns.sleep(1000)
  }

}