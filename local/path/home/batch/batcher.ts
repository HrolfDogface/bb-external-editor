export async function main(ns: NS) {

  //args[0]:executing host name
  //args[1]:target host name

  const exHost: string = String(ns.args[0]);
  const targetHost: string = String(ns.args[1]);

  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: batcher starting\n", "w");
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: target host name = " + targetHost + "\n", "a");
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: executing host name = " + exHost + "\n", "a");

  const freeRam: number = ns.getServerMaxRam(exHost) - ns.getServerUsedRam(exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: free ram on " + exHost + "server is " + freeRam + "GB\n", "a");

  const prepRam: number = ns.getScriptRam("target_prep.js", exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: prepRam = " + prepRam + "GB\n", "a");

  const prepWRam: number = ns.getScriptRam("security.js", exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: prepWRam = " + prepWRam + "GB\n", "a");

  const prepGRam: number = ns.getScriptRam("money.js", exHost);
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: prepGRam = " + prepGRam + "GB\n", "a");

  const prepWThreads: number = Math.floor((freeRam - prepRam - 2) * 0.19 / prepWRam);
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: prepWThreads = " + prepWThreads + "\n", "a");
  
  const prepGThreads: number = Math.floor((freeRam - prepRam - 2) * 0.79 / prepGRam);
  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: prepGThreads = " + prepGThreads + "\n", "a");

  
  const maxMoney: number = ns.getServerMaxMoney(targetHost);
  const minSecurity: number = ns.getServerMinSecurityLevel(targetHost);

  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: " + targetHost + " max money is $"
          + maxMoney + " and min security is " + minSecurity + "\n", "a");

  ns.exec("target_prep.js", exHost, 1, targetHost, prepWThreads, prepGThreads, exHost);

  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: waiting for target prep\n", "a");
  
  while (ns.getServerMoneyAvailable(targetHost) < maxMoney){
    await ns.sleep(100);
  }

  while (ns.getServerSecurityLevel(targetHost) > minSecurity){
    await ns.sleep(100);
  }  
  await ns.sleep(150);

  ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: done waiting for target prep\n", "a");

  let workerPid = 0;
  const hackPids: number [] = [];

  let firstLoop: boolean = true;
  while (true){
    const hackTime: number = ns.getHackTime(targetHost);
    const growTime: number = ns.getGrowTime(targetHost);
    const weakenTime: number = ns.getWeakenTime(targetHost);   

    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: " + targetHost + " Hack time is "
            + hackTime + " and Grow time is " + growTime + " and Weaken time is " + weakenTime + "\n", "w");

    const hackDelay: number = weakenTime - hackTime - 5;
    const weaken1Delay: number = 0;
    const growDelay: number = weakenTime - growTime + 5;
    const weaken2Delay: number = 10;
    const batchDelay: number = 20;

    let hackThreads: number =  Math.floor(ns.hackAnalyzeThreads(targetHost, maxMoney/5));
    let growthThreads: number = Math.ceil(ns.growthAnalyze(targetHost, 1.3));
    if (hackThreads < 1) hackThreads = 1;
    if (growthThreads < 1) growthThreads = 1;

    const hackSecurity: number = ns.hackAnalyzeSecurity(hackThreads, targetHost);
    const growSecurity: number = growthThreads * 0.004;

    const cores: number = ns.getServer(exHost).cpuCores;

    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: cores = " + cores + "\n", "a"); 
    const weakenAmount: number = ns.weakenAnalyze(10, cores);

    let weaken1Threads: number = Math.ceil(hackSecurity/weakenAmount)*10;
    let weaken2Threads: number = Math.ceil(growSecurity/weakenAmount)*10;
    if ( weaken1Threads < 1)  weaken1Threads = 1;
    if ( weaken2Threads < 1)  weaken2Threads = 1;

    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: hackThreads = " + hackThreads + "\n", "a");    
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: growthThreads = " + growthThreads + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: hackSecurity = " + hackSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: growSecurity = " + growSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: weakenAmount = " + weakenAmount + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: weaken1Threads = " + weaken1Threads + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: weaken2Threads = " + weaken2Threads + "\n", "a");

    const hackRam: number = ns.getScriptRam("batch/H_worker.js", exHost) * hackThreads;
    const growRam: number = ns.getScriptRam("batch/G_worker.js", exHost) * growthThreads;
    const weaken1Ram: number = ns.getScriptRam("batch/W_worker.js", exHost) * weaken1Threads;      
    const weaken2Ram: number = ns.getScriptRam("batch/W_worker.js", exHost) * weaken2Threads;
    const batchRam: number = hackRam + growRam + weaken1Ram + weaken2Ram;
    let batches: number = Math.floor((freeRam - 12)/batchRam);
    
    const depth: number = weakenTime / batchDelay;
    if (batches > (depth * .9)) batches = Math.floor(depth * .9);
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: batchRam = " + batchRam + "\n", "a");
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: batches = " + batches + "\n", "a");

    let level = ns.getHackingLevel();    
    ns.write("batch/batchLog.txt", Date.now() + "[batcher.ts]: level = " + level + "\n", "a");    
    //if (batches > 50000) batches = 50000;
    if(firstLoop){
      firstLoop = false;
      for (let i: number = 0; i < batches; i++){
        hackPids.push(ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackTime, Date.now() + hackTime + hackDelay + batchDelay * i));    
        ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken1Delay + batchDelay * i);
        ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growTime, Date.now() + growTime + growDelay + batchDelay * i);    
        ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken2Delay + batchDelay * i, ns.pid, 0);
      }
    }


    while (true)
    {
     
      await ns.nextPortWrite(ns.pid);
      workerPid = ns.readPort(ns.pid);

      //remove top hack worker pid from the list of pids
      hackPids.shift();


      if ((ns.getServerSecurityLevel(targetHost) > minSecurity)||(ns.getServerMoneyAvailable(targetHost) < (ns.getServerMaxMoney(targetHost) * 0.98))){ 
        let killNumber: number = 10;
        if (killNumber > hackPids.length) killNumber = hackPids.length;
        for (let i = 0; i < killNumber; i++){
          ns.kill(hackPids[i]);
        }
      }
      hackPids.push(ns.exec("batch/H_worker.js", exHost, hackThreads, targetHost, hackTime, Date.now() + hackTime + hackDelay + 5));
      ns.exec("batch/W_worker.js", exHost, weaken1Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken1Delay + 5);
      ns.exec("batch/G_worker.js", exHost, growthThreads, targetHost, growTime, Date.now() + growTime + growDelay + 5);    
      ns.exec("batch/W_worker2.js", exHost, weaken2Threads, targetHost, weakenTime, Date.now() + weakenTime + weaken2Delay + 5, ns.pid, workerPid);
      
      if (level != ns.getHackingLevel()){
        level = ns.getHackingLevel()
        for (let i = 0; i < hackPids.length; i += 10){
          ns.kill(hackPids[i]);
        }
        break;
      }
      

    }

    
  }
  
}