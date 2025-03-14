export async function main(ns: NS) {

    //args[0]:target host name
    //args[1]:W thread count
    //args[2]:G thread count
    //args[3]:executing host name
    
    ns.write("batch/batchLog.txt", performance.now() + "[target_presp.ts]: starting target prep\n", "a");
  
    ns.kill("security.ts", ns.args[3], ns.args[0]);
    ns.kill("money.ts", ns.args[3], ns.args[0]);
    ns.kill("hack.ts", ns.args[3], ns.args[0]);
  
    ns.exec("security.ts", ns.args[3], ns.args[1] + ns.args[2], ns.args[0]);
    while (ns.getServerSecurityLevel(ns.args[0]) > (ns.getServerMinSecurityLevel(ns.args[0]))){
      await ns.sleep(100);
    }
    ns.kill("security.ts", ns.args[3], ns.args[0]);
    ns.exec("security.ts", ns.args[3], ns.args[1], ns.args[0]);
  
    ns.exec("money.ts", ns.args[3], ns.args[2], ns.args[0]);
    while (ns.getServerMoneyAvailable(ns.args[0]) < (ns.getServerMaxMoney(ns.args[0]))){
      await ns.sleep(100);
    }
    ns.kill("money.ts", ns.args[3], ns.args[0]);
  
    
    while (ns.getServerSecurityLevel(ns.args[0]) > (ns.getServerMinSecurityLevel(ns.args[0]))){
      await ns.sleep(100);
    }  
    ns.kill("security.ts", ns.args[3], ns.args[0]);
  
    ns.write("batch/batchLog.txt", performance.now() + "[target_presp.ts]: finished target prep\n", "a");
  
  }