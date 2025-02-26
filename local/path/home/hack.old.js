/** @param {NS} ns */
export async function main(ns) {
  
  //const hostNames = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net"]
  const hostNames = ["n00dles", "joesguns", "nectar-net"];

  while (true){

    for (let i = 0; i < hostNames.length; i++){
      await ns.hack(hostNames[i]);
      }
    }
    
}