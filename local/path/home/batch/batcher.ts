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

  let workerPid = 0;
  let previousWorkerPid = -1;
  let ejectCount = 0;
  let finishedBatchCount = 0;
  let finishedSets = 0;
  let finishedFlag = false;

  let firstLoop: boolean = true;
  while (true){
    const hackTime: number = ns.getHackTime(targetHost);
    const growTime: number = ns.getGrowTime(targetHost);
    const weakenTime: number = ns.getWeakenTime(targetHost);   

    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: " + targetHost + " Hack time is "
            + hackTime + " and Grow time is " + growTime + " and Weaken time is " + weakenTime + "\n", "a");

    const hackDelay: number = weakenTime - hackTime - 30;
    const weaken1Delay: number = 0;
    const growDelay: number = weakenTime - growTime + 30;
    const weaken2Delay: number = 60;
    const batchDelay: number = 120;

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
    if (batches > (depth * .9)) batches = Math.floor(depth * .9);
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: batchRam = " + batchRam + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: batches = " + batches + "\n", "a");

    let level = ns.getHackingLevel();    
    ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: level = " + level + "\n", "a");    
    //if (batches > 50000) batches = 50000;
    if(firstLoop||finishedFlag){
      firstLoop = false;
      finishedFlag = false;
      for (let i: number = 0; i < batches; i++){
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackTime, Date.now() + hackTime + hackDelay + batchDelay * i);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken1Delay + batchDelay * i);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growTime, Date.now() + growTime + growDelay + batchDelay * i);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken2Delay + batchDelay * i, ns.pid, 0);
      }
    }

    
    const maxFinishedSets = 2;
    let tempPid = -1;
    while (true)
    {
     
      await ns.nextPortWrite(ns.pid);
      workerPid = ns.readPort(ns.pid);

      if (finishedFlag){
        if(tempPid != workerPid){
          continue;
        }else{
          break;
        }

      }
      finishedBatchCount++;

      if ( finishedBatchCount < batches){
        //if a batch finishes out of sequence do not trigger a new batch from it
        if (workerPid < previousWorkerPid){
          ns.write("batch/batchLog.txt", Date.now() + "[pre_batcher.ts]: eject batch with pid= " + workerPid + "\n", "a"); 
          ejectCount++;  
          continue;
        }
        previousWorkerPid = workerPid;
        ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackTime, Date.now() + hackTime + hackDelay + 30);    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken1Delay + 30);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growTime, Date.now() + growTime + growDelay + 30);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken2Delay + 30, ns.pid, workerPid);
      }else{
        //retrigger for all ejected batches plus one for the last batch
        for (let i: number = 0; i < (ejectCount + 1); i++){
          ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackTime, Date.now() + hackTime + hackDelay + batchDelay * i);    
          ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken1Delay + batchDelay * i);
          ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growTime, Date.now() + growTime + growDelay + batchDelay * i);    
          tempPid = ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken2Delay + batchDelay * i, ns.pid, 0);
        }
        ejectCount = 0;
        finishedBatchCount = 0
        finishedSets++;

        if(finishedSets == maxFinishedSets)
        {
          finishedSets = 0;
          finishedFlag = true;
          previousWorkerPid = 0;
        }
        
        if (level != ns.getHackingLevel()){
          level = ns.getHackingLevel()
          break;
        }
      }

    }

    
  }
  
}