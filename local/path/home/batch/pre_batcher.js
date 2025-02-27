/** @param {NS} ns */
export async function main(ns) {

    //args[0]:target host name
    //args[1]:executing host name

    let targetHost = ns.args[0]
    let exHost = ns.args[1]
  
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: pre_batcher starting\n", "w");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: target host name = " + targetHost + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: executing host name = " + exHost + "\n", "a");
  
    let freeRam = ns.getServerMaxRam(exHost) - ns.getServerUsedRam(exHost);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: free ram on " + exHost + "server is " + freeRam + "GB\n", "a");
  
    let prepRam = ns.getScriptRam("batch/target_presp.js", exHost);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: prepRam = " + prepRam + "GB\n", "a");
  
    let prepWRam = ns.getScriptRam("batch/security.js", exHost);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: prepWRam = " + prepWRam + "GB\n", "a");
  
    let prepGRam = ns.getScriptRam("batch/money.js", exHost);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: prepGRam = " + prepGRam + "GB\n", "a");
  
    let prepWThreads = Math.floor((freeRam - prepRam - 2) * 0.19 / prepWRam);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: prepWThreads = " + prepWThreads + "\n", "a");
    
    let prepGThreads = Math.floor((freeRam - prepRam - 2) * 0.79 / prepGRam);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: prepGThreads = " + prepGThreads + "\n", "a");
  
    
    let maxMoney = ns.getServerMaxMoney(targetHost);
    let minSecurity = ns.getServerMinSecurityLevel(targetHost);

    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: " + targetHost + " max money is $"
            + maxMoney + " and min security is " + minSecurity + "\n", "a");

    ns.exec("batch/target_prep.js", exHost, 1, targetHost, prepWThreads, prepGThreads, exHost);
  
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: waiting for target prep\n", "a");
    
    while (ns.getServerMoneyAvailable(targetHost) < maxMoney){
      await ns.sleep(100);
    }
  
    while (ns.getServerSecurityLevel(targetHost) > minSecurity){
      await ns.sleep(100);
    }  
    await ns.sleep(150);
  
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: done waiting for target prep\n", "a");

    while (true){
      let hackTime = ns.getHackTime(targetHost);
      let growTime = ns.getGrowTime(targetHost);
      let weakenTime = ns.getWeakenTime(targetHost);   

      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: " + targetHost + " Hack time is "
              + hackTime + " and Grow time is " + growTime + " and Weaken time is " + weakenTime + "\n", "a");

      let hackDelay = weakenTime - hackTime - 15;
      let weaken1Delay = 0;
      let growDelay = weakenTime - growTime + 15;
      let weaken2Delay = 30;
      let batchDelay = 60;

      let hackThreads =  Math.floor(ns.hackAnalyzeThreads(targetHost, maxMoney/2));
      let growthThreads = Math.ceil(ns.growthAnalyze(targetHost, 2.2));
      let hackSecurity = ns.hackAnalyzeSecurity(hackThreads, targetHost);
      //let growSecurity = ns.growthAnalyzeSecurity(growthThreads, targetHost);
      let growSecurity = growthThreads * 0.004;

      let cores = 1;
      if (exHost == "home"){
        cores = 2;
      }
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: cores = " + cores + "\n", "a"); 
      let weakenAmount = ns.weakenAnalyze(10, cores);

      let weaken1Threads = Math.ceil(hackSecurity/weakenAmount)*10;
      let weaken2Threads = Math.ceil(growSecurity/weakenAmount)*10;

      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: hackThreads = " + hackThreads + "\n", "a");    
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: growthThreads = " + growthThreads + "\n", "a");
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: hackSecurity = " + hackSecurity + "\n", "a");
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: growSecurity = " + growSecurity + "\n", "a");
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: weakenAmount = " + weakenAmount + "\n", "a");
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: weaken1Threads = " + weaken1Threads + "\n", "a");
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: weaken2Threads = " + weaken2Threads + "\n", "a");

      let hackRam = ns.getScriptRam("batch/H_worker.js", exHost) * hackThreads;
      let growRam = ns.getScriptRam("batch/G_worker.js", exHost) * growthThreads;
      let weaken1Ram = ns.getScriptRam("batch/W_worker.js", exHost) * weaken1Threads;      
      let weaken2Ram = ns.getScriptRam("batch/W_worker.js", exHost) * weaken2Threads;
      let batchRam = hackRam + growRam + weaken1Ram + weaken2Ram;
      let batches = Math.floor((freeRam - 2)/batchRam);
      
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: batchRam = " + batchRam + "\n", "a");
      ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: batches = " + batches + "\n", "a");

      if (batches > 50000) batches = 50000;
      for (let i = 0; i < batches; i++){
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackDelay + batchDelay * i);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weaken1Delay + batchDelay * i);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growDelay + batchDelay * i);    
        ns.exec("batch/W_worker.js", exHost, weaken2Threads, targetHost, weaken2Delay + batchDelay * i);
      }

      await ns.sleep(weakenTime + 1080 + batchDelay * batches);

      let postBatchMoney = ns.getServerMoneyAvailable(targetHost);
      let postBatchSecurity = ns.getServerSecurityLevel(targetHost);

      if ((postBatchMoney == maxMoney) && (postBatchSecurity == minSecurity)){
        ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: Batch successfully completed\n", "w");
      } else {
        ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.js]: Error. After batch server money = $"
                + postBatchMoney + " and security = " + postBatchSecurity + "\n", "a");
      }
      //return;
    }
    
  }