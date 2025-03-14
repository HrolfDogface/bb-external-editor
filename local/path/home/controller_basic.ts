export async function main(ns: NS) {

  //args[0]:target host name
  //args[1]:security thread count
  //args[2]:money thread count
  //args[3]:hack thread count
  //args[4]:executing host name
  
  ns.kill("security.ts", ns.args[4], ns.args[0]);
  ns.kill("money.ts", ns.args[4], ns.args[0]);
  ns.kill("hack.ts", ns.args[4], ns.args[0]);

  ns.exec("security.ts", ns.args[4], ns.args[1], ns.args[0]);
  while (ns.getServerSecurityLevel(ns.args[0]) > (ns.getServerMinSecurityLevel(ns.args[0]))){
    await ns.sleep(10000);
  }

  ns.exec("money.ts", ns.args[4], ns.args[2], ns.args[0]);
  while (ns.getServerMoneyAvailable(ns.args[0]) < (ns.getServerMaxMoney(ns.args[0]))){
    await ns.sleep(10000);
  }

  //ns.exec("security.ts", "home", ns.args[1], ns.args[0]);
  //ns.exec("money.ts", "home", ns.args[2], ns.args[0]);
  ns.exec("hack.ts", ns.args[4], ns.args[3], ns.args[0]);

}