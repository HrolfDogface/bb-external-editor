/** @param {NS} ns */
export async function main(ns) {

    //args[0]:target host name
    //args[1]:W thread count
    //args[2]:G thread count
    //args[3]:executing host name
    
    ns.write("batch/batchLog.txt", Date.now() + "[target_presp.js]: starting target prep\n", "a");
  
    ns.kill("security.js", ns.args[3], ns.args[0]);
    ns.kill("money.js", ns.args[3], ns.args[0]);
    ns.kill("hack.js", ns.args[3], ns.args[0]);

    ns.kill("batch/security.js", ns.args[3], ns.args[0]);
    ns.kill("batch/money.js", ns.args[3], ns.args[0]);
    ns.kill("batch/hack.js", ns.args[3], ns.args[0]);
  
    ns.exec("batch/security.js", ns.args[3], ns.args[1], ns.args[0]);
    while (ns.getServerSecurityLevel(ns.args[0]) > (ns.getServerMinSecurityLevel(ns.args[0]))){
      await ns.sleep(100);
    }
  
    ns.exec("batch/money.js", ns.args[3], ns.args[2], ns.args[0]);
    while (ns.getServerMoneyAvailable(ns.args[0]) < (ns.getServerMaxMoney(ns.args[0]))){
      await ns.sleep(100);
    }
    ns.kill("batch/money.js", ns.args[3], ns.args[0]);
  
    
    while (ns.getServerSecurityLevel(ns.args[0]) > (ns.getServerMinSecurityLevel(ns.args[0]))){
      await ns.sleep(100);
    }  
    ns.kill("batch/security.js", ns.args[3], ns.args[0]);
  
    ns.write("batch/batchLog.txt", Date.now() + "[target_presp.js]: finished target prep\n", "a");
  
  }