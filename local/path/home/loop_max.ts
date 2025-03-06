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
  
  const weakenThreadCount: number = Math.floor((freeRam) * 0.16 / weakenRam);
    
  const growThreadCount: number = Math.floor((freeRam) * 0.77 / growRam);
    
  let hackThreadCount: number = Math.floor((freeRam) * 0.06 / hackRam);

  if (hackThreadCount < 1) {
    hackThreadCount = 1;
  }

  ns.exec("target_prep.js", executingServer, 1, targetServer, weakenThreadCount, growThreadCount, executingServer);

  const maxMoney = ns.getServerMaxMoney(targetServer);
  const minSecurity = ns.getServerMinSecurityLevel(targetServer);

  while (ns.getServerMoneyAvailable(targetServer) < maxMoney){
    await ns.sleep(100);
  }

  while (ns.getServerSecurityLevel(targetServer) > minSecurity){
    await ns.sleep(100);
  }  

  await ns.sleep(1000);

  ns.exec("security.js", executingServer, weakenThreadCount, targetServer);
  ns.exec("money.js", executingServer, growThreadCount, targetServer);
  ns.exec("hack.js", executingServer, hackThreadCount, targetServer);

}