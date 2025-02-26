/** @param {NS} ns */
export async function main(ns) {
  const red = "\u001b[31m";
  const reset = "\u001b[0m";
  //const hostNames = ["sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi"]
  const hostNames = ns.args;

  while (true){

    let count = 0;
    for (let i = 0; i < hostNames.length; i++){
      if (ns.getServerSecurityLevel(hostNames[i]) > (ns.getServerMinSecurityLevel(hostNames[i]))){
        await ns.weaken(hostNames[i]);
        count++
      }
    }
    
    //ns.printf(`${red}%d servers need weakening.${reset}`, count)
    await ns.sleep(100)
  }

}