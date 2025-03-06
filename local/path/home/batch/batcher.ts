export async function main(ns: NS) {

  //args[0]:executing host name
  //args[1]:target host name

  const exHost: string = String(ns.args[0]);
  const targetHost: string = String(ns.args[1]);

  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: pre_batcher starting\n", "w");
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: target host name = " + targetHost + "\n", "a");
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: executing host name = " + exHost + "\n", "a");

  const freeRam: number = ns.getServerMaxRam(exHost) - ns.getServerUsedRam(exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: free ram on " + exHost + "server is " + freeRam + "GB\n", "a");

  const prepRam: number = ns.getScriptRam("target_prep.js", exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: prepRam = " + prepRam + "GB\n", "a");

  const prepWRam: number = ns.getScriptRam("security.js", exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: prepWRam = " + prepWRam + "GB\n", "a");

  const prepGRam: number = ns.getScriptRam("money.js", exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: prepGRam = " + prepGRam + "GB\n", "a");

  const prepWThreads: number = Math.floor((freeRam - prepRam - 2) * 0.19 / prepWRam);
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: prepWThreads = " + prepWThreads + "\n", "a");
  
  const prepGThreads: number = Math.floor((freeRam - prepRam - 2) * 0.79 / prepGRam);
  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: prepGThreads = " + prepGThreads + "\n", "a");

  
  const maxMoney: number = ns.getServerMaxMoney(targetHost);
  const minSecurity: number = ns.getServerMinSecurityLevel(targetHost);

  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: " + targetHost + " max money is $"
          + maxMoney + " and min security is " + minSecurity + "\n", "a");

  ns.exec("target_prep.js", exHost, 1, targetHost, prepWThreads, prepGThreads, exHost);

  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: waiting for target prep\n", "a");
  
  while (ns.getServerMoneyAvailable(targetHost) < maxMoney){
    await ns.sleep(100);
  }

  while (ns.getServerSecurityLevel(targetHost) > minSecurity){
    await ns.sleep(100);
  }  
  await ns.sleep(150);

  ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: done waiting for target prep\n", "a");

  let firstLoop: boolean = true;
  let firstLoop2 = false;
  while (true){
    const hackTime: number = ns.getHackTime(targetHost);
    const growTime: number = ns.getGrowTime(targetHost);
    const weakenTime: number = ns.getWeakenTime(targetHost);   

    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: " + targetHost + " Hack time is "
            + hackTime + " and Grow time is " + growTime + " and Weaken time is " + weakenTime + "\n", "a");

    const hackDelay: number = weakenTime - hackTime - 50;
    const weaken1Delay: number = 0;
    const growDelay: number = weakenTime - growTime + 50;
    const weaken2Delay: number = 100;
    const batchDelay: number = 200;

    const hackThreads: number =  Math.floor(ns.hackAnalyzeThreads(targetHost, maxMoney/2));
    const growthThreads: number = Math.ceil(ns.growthAnalyze(targetHost, 2.2));
    const hackSecurity: number = ns.hackAnalyzeSecurity(hackThreads, targetHost);
    const growSecurity: number = growthThreads * 0.004;

    const cores: number = ns.getServer(exHost).cpuCores;

    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: cores = " + cores + "\n", "a"); 
    const weakenAmount: number = ns.weakenAnalyze(10, cores);

    const weaken1Threads: number = Math.ceil(hackSecurity/weakenAmount)*10;
    const weaken2Threads: number = Math.ceil(growSecurity/weakenAmount)*10;

    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: hackThreads = " + hackThreads + "\n", "a");    
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: growthThreads = " + growthThreads + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: hackSecurity = " + hackSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: growSecurity = " + growSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: weakenAmount = " + weakenAmount + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: weaken1Threads = " + weaken1Threads + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: weaken2Threads = " + weaken2Threads + "\n", "a");

    const hackRam: number = ns.getScriptRam("batch/H_worker.js", exHost) * hackThreads;
    const growRam: number = ns.getScriptRam("batch/G_worker.js", exHost) * growthThreads;
    const weaken1Ram: number = ns.getScriptRam("batch/W_worker.js", exHost) * weaken1Threads;      
    const weaken2Ram: number = ns.getScriptRam("batch/W_worker.js", exHost) * weaken2Threads;
    const batchRam: number = hackRam + growRam + weaken1Ram + weaken2Ram;
    let batches: number = Math.floor((freeRam - 12)/batchRam);
    
    const depth: number = weakenTime / batchDelay;
    if (batches > depth) batches = depth;
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: batchRam = " + batchRam + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: batches = " + batches + "\n", "a");

    let level = ns.getHackingLevel();    
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: level = " + level + "\n", "a");    
    //if (batches > 50000) batches = 50000;
    if(firstLoop){
      firstLoop = false;
      for (let i: number = 0; i < batches; i++){
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackDelay + batchDelay * i);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weaken1Delay + batchDelay * i);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growDelay + batchDelay * i);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weaken2Delay + batchDelay * i, ns.pid, "foo");
      }
    }

    let delayFlagInternal = false;
    //while (level == ns.getHackingLevel())
    while (true)
    {
      if (!firstLoop2){
        await ns.nextPortWrite(ns.pid);
        if (ns.readPort(ns.pid) == "true"){
          firstLoop2 = true;
          ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: debug point 1 \n", "a");
          break;
        }
      }

      if (delayFlagInternal){   
        await ns.sleep(10000);     
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackDelay);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weaken1Delay);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growDelay);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weaken2Delay, ns.pid, "baz");
        delayFlagInternal = false;
        firstLoop2 = false;
        ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: debug point 2 \n", "a");
      }else if (level != ns.getHackingLevel()){        
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackDelay + 50);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weaken1Delay + 50);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growDelay + 50);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weaken2Delay + 50, ns.pid, "delay");
        delayFlagInternal = true;
        firstLoop2 = false;
        level = ns.getHackingLevel()
        ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: debug point 3 \n", "a");
      }else {
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackDelay + 50);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weaken1Delay + 50);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growDelay + 50);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weaken2Delay + 50, ns.pid, "foo");
        delayFlagInternal = false;   
        firstLoop2 = false;     
        //ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: debug point 4 \n", "a");
      }

    }

    
  }
  
}