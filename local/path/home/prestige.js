/** @param {NS} ns */
export async function main(ns) {

  ns.exec("pop.js", "home", 1, "n00dles");
  await ns.sleep(10000);

  //ns.exec("security.js", "home", 89, "n00dles");

  //ns.exec("money.js", "home", 450, "n00dles");

  //sleep 3 minutes
  //ns.tprint("sleeping 3 minutes")
  //await ns.sleep(180000);

  //ns.exec("hack.js", "home", 45, "n00dles");
  //ns.exec("controller-basic.js", "home", 1, "n00dles", 200, 1500, 20, "home");
  ns.exec("controller-basic.js", "home", 1, "n00dles", 200, 1500, 20, "home");

  //sleep 2 minutes
  ns.tprint("sleeping 2 minute")
  await ns.sleep(120000);

  while (!ns.hasTorRouter()){
    ns.tprint("Buy Tor Router and scripts please");
    await ns.sleep(10000);
  }

  while (!ns.fileExists("BruteSSH.exe", "home")){
    ns.tprint("Buy BruteSSH.exe please");
    await ns.sleep(5000);
  }
  
  while (!ns.fileExists("FTPCrack.exe", "home")){
    ns.tprint("Buy FTPCrack.exe please");
    await ns.sleep(5000);
  }

  while (ns.getHackingLevel() < 250){
    ns.tprint("Waiting for level 500");
    await ns.sleep(250);
  }

  ns.kill("security.js", "home", "n00dles");
  ns.kill("money.js", "home", "n00dles");
  ns.kill("hack.js", "home", "n00dles");

  
  let hostNames = ["sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", 
                  "harakiri-sushi", "iron-gym", "phantasy", "silver-helix", 
                  "foodnstuff", "zer0"/*, "crush-fitness", "max-hardware", "neo-net", 
                  "omega-net"*/];

  for (let i = 0; i < hostNames.length; i++){
    ns.exec("pop.js", "home", 1, hostNames[i]);
    await ns.sleep(2000);
    //ns.exec("controller-basic.js", "home", 1, hostNames[i], 200, 1500, 20, "home");
    ns.exec("controller-basic.js", "home", 1, hostNames[i], 200, 1500, 20, "home");
  }

  /*while (ns.getHackingLevel() < 150){
    ns.tprint("Waiting for level 100");
    await ns.sleep(30000);
  }

  hostNames = ["iron-gym", "phantasy", "silver-helix"]

  for (let i = 0; i < hostNames.length; i++){
    ns.exec("pop.js", "home", 1, hostNames[i]);
    await ns.sleep(2000);
    ns.exec("controller-basic.js", "home", 1, hostNames[i], 179, 925, 45 );
  }*/

  ns.tprint("That death star is fully opperational!");
}