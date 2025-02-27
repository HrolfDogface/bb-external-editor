/** @param {NS} ns */
export async function main(ns: NS) {

  //args[0]:executing host name
  //args[1]:target host name

  const executingServer: string = String(ns.args[0]);
  const targetServer: string = String(ns.args[1]);
  
  ns.kill("security.js", executingServer, targetServer);
  ns.kill("money.js", executingServer, targetServer);
  ns.kill("hack.js", executingServer, targetServer);

  let freeRam = ns.getServerMaxRam(executingServer) - ns.getServerUsedRam(executingServer);
  if (freeRam > 2028){
    freeRam = 2028;
  }  
  
  const weakenRam = ns.getScriptRam("security.js", executingServer);
  
  const growRam = ns.getScriptRam("money.js", executingServer);  
  
  const hackRam = ns.getScriptRam("hack.js", executingServer);
  
  const weakenThreadCount: number = Math.floor((freeRam - 5) * 0.17 / weakenRam);
    
  const growThreadCount: number = Math.floor((freeRam - 5) * 0.78 / growRam);
    
  const hackThreadCount: number = Math.floor((freeRam - 5) * 0.04 / hackRam);

  ns.exec("security.js", executingServer, weakenThreadCount, targetServer);
  while (ns.getServerSecurityLevel(targetServer) > (ns.getServerMinSecurityLevel(targetServer))){
    await ns.sleep(10000);
  }

  ns.exec("money.js", executingServer, growThreadCount, targetServer);
  while (ns.getServerMoneyAvailable(targetServer) < (ns.getServerMaxMoney(targetServer))){
    await ns.sleep(10000);
  }


  ns.exec("hack.js", executingServer, hackThreadCount, targetServer);

}