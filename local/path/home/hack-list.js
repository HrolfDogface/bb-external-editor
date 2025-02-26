/** @param {NS} ns */
export async function main(ns) {
  
  //const hostNames = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net"]
  //const hostNames = ["n00dles", "joesguns", "nectar-net"];
  const hostNames = ns.args;


  while (true){

    for (let i = 0; i < hostNames.length; i++){
      //if (ns.getServerMoneyAvailable(hostNames[i]) > (ns.getServerMaxMoney(hostNames[i]) * 0.95)){      
      //  while (ns.getServerMoneyAvailable(hostNames[i]) > (ns.getServerMaxMoney(hostNames[i]) * 0.40)){
      //    await ns.hack(hostNames[i]);
      //  }
      if (ns.getServerMoneyAvailable(hostNames[i]) == (ns.getServerMaxMoney(hostNames[i]))){
        await ns.hack(hostNames[i]);
      }
      //}
    }  
    await ns.sleep(100); 
  }
}