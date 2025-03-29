export async function main(ns: NS) {

  //args[0]:target host name
  //args[1 - n]:executing host names

  const exHosts: string [] = [];
  for (let i=1; i < ns.args.length; i++){
    exHosts.push(String(ns.args[i]));
  }
  const targetHost: string = String(ns.args[0]);

  ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: batcher starting\n", "w");
  ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: target host name = " + targetHost + "\n", "a");
  //ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: executing host name = " + exHost + "\n", "a");

  //get list of servers and figure out the minimum ram allocation, use that to calc minimum batch size
  
  //const freeRam: number = ns.getServerMaxRam(exHost) - ns.getServerUsedRam(exHost);
  //ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: free ram on " + exHost + "server is " + freeRam + "GB\n", "a");

  const freeRam: number = ns.getServerMaxRam(exHosts[0]) - ns.getServerUsedRam(exHosts[0]);
  const prepRam: number = ns.getScriptRam("target_prep.ts", exHosts[0]);
  const prepWRam: number = ns.getScriptRam("security.ts", exHosts[0]);
  const prepGRam: number = ns.getScriptRam("money.ts", exHosts[0]);
  const prepWThreads: number = Math.floor((freeRam - prepRam - 2) * 0.19 / prepWRam);
  const prepGThreads: number = Math.floor((freeRam - prepRam - 2) * 0.79 / prepGRam);
  
  const maxMoney: number = ns.getServerMaxMoney(targetHost);
  const minSecurity: number = ns.getServerMinSecurityLevel(targetHost);

  ns.exec("target_prep.ts", exHosts[0], 1, targetHost, prepWThreads, prepGThreads, exHosts[0]);
  
  while (ns.getServerMoneyAvailable(targetHost) < maxMoney){
    await ns.sleep(100);
  }

  while (ns.getServerSecurityLevel(targetHost) > minSecurity){
    await ns.sleep(100);
  }  
  await ns.sleep(150);

  ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: done waiting for target prep\n", "a");


  ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: " + targetHost + " max money is $"
          + maxMoney + " and min security is " + minSecurity + "\n", "a");

  

  let workerServer: string = ""; 
  const hackPids: number [] = [];

  let firstLoop: boolean = true;
  while (true){

    const server = ns.getServer(targetHost);
    const player = ns.getPlayer();

    server.moneyAvailable = server.moneyMax;
    server.hackDifficulty = server.minDifficulty;

    //need to use ns.formulas for these since we have not prepped the server ahead of time
    const hackTime: number = ns.formulas.hacking.hackTime(server, player);
    const growTime: number = ns.formulas.hacking.growTime(server, player);
    const weakenTime: number = ns.formulas.hacking.weakenTime(server, player); 

    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: " + targetHost + " Hack time is "
            + hackTime + " and Grow time is " + growTime + " and Weaken time is " + weakenTime + "\n", "w");

    const hackDelay: number = weakenTime - hackTime - 0;
    const weaken1Delay: number = 0;
    const growDelay: number = weakenTime - growTime + 0;
    const weaken2Delay: number = 0;
    const batchDelay: number = 3;

    let hackThreads: number =  Math.floor(0.2/ns.formulas.hacking.hackPercent(server, player));

    const cores: number = ns.getServer("home").cpuCores;
    server.moneyAvailable = server.moneyMax * 0.8;
    let growthThreads: number = Math.ceil(ns.formulas.hacking.growThreads(server, player, server.moneyMax, 1));    
    let growthThreadsHome: number = Math.ceil(ns.formulas.hacking.growThreads(server, player, server.moneyMax, cores));
    server.moneyAvailable = server.moneyMax;

    if (hackThreads < 1) hackThreads = 1;
    if (growthThreads < 1) growthThreads = 1;
    if (growthThreadsHome < 1) growthThreadsHome = 1;

    const hackSecurity: number = growthThreads * 0.002;
    const growSecurity: number = growthThreads * 0.004;

    const weakenAmountHome: number = ns.weakenAnalyze(10, cores);
    const weakenAmount: number = ns.weakenAnalyze(10, 1);

    let weaken1Threads: number = Math.ceil(hackSecurity/weakenAmount)*10;
    let weaken2Threads: number = Math.ceil(growSecurity/weakenAmount)*10;
    if ( weaken1Threads < 1)  weaken1Threads = 1;
    if ( weaken2Threads < 1)  weaken2Threads = 1;

    
    const weaken1ThreadsHome: number = Math.ceil(hackSecurity/weakenAmountHome)*10;
    const weaken2ThreadsHome: number = Math.ceil(growSecurity/weakenAmountHome)*10;
    if ( weaken1Threads < 1)  weaken1Threads = 1;
    if ( weaken2Threads < 1)  weaken2Threads = 1;

    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: hackThreads = " + hackThreads + "\n", "a");    
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: growthThreads = " + growthThreads + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: hackSecurity = " + hackSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: growSecurity = " + growSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: weakenAmount = " + weakenAmount + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: weaken1Threads = " + weaken1Threads + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: weaken2Threads = " + weaken2Threads + "\n", "a");

    let level = ns.getHackingLevel(); 
    let j: number = 0;  
    const depth: number = weakenTime / 3;
    let totalBatches:number = 0;
    for(const exHost of exHosts){
      const freeRam: number = ns.getServerMaxRam(exHost) - ns.getServerUsedRam(exHost);

      let batches: number;
      if(exHost == "home"){
        const hackRam: number = ns.getScriptRam("batch/H_worker.ts", exHost) * hackThreads;
        const growRam: number = ns.getScriptRam("batch/G_worker.ts", exHost) * growthThreadsHome;
        const weaken1Ram: number = ns.getScriptRam("batch/W_worker.ts", exHost) * weaken1ThreadsHome;      
        const weaken2Ram: number = ns.getScriptRam("batch/W_worker.ts", exHost) * weaken2ThreadsHome;
        const batchRam: number = hackRam + growRam + weaken1Ram + weaken2Ram;
        batches = Math.floor((freeRam - 12)/batchRam);
      }else{
        const hackRam: number = ns.getScriptRam("batch/H_worker.ts", exHost) * hackThreads;
        const growRam: number = ns.getScriptRam("batch/G_worker.ts", exHost) * growthThreads;
        const weaken1Ram: number = ns.getScriptRam("batch/W_worker.ts", exHost) * weaken1Threads;      
        const weaken2Ram: number = ns.getScriptRam("batch/W_worker.ts", exHost) * weaken2Threads;
        const batchRam: number = hackRam + growRam + weaken1Ram + weaken2Ram;
        batches = Math.floor((freeRam - 12)/batchRam);
      }

      
      if ((batches + totalBatches) > (depth * .9)) batches = Math.floor((depth - totalBatches) * .9);
      totalBatches += batches;
      //ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: batchRam = " + batchRam + "\n", "a");
      ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: batches = " + batches + "\n", "a");
 
      ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: level = " + level + "\n", "a");    
      //if (batches > 50000) batches = 50000;
      if(firstLoop){
        for (let i: number = 0; i < batches; i++){
          if(exHost == "home"){
            if(j > 200){
              hackPids.push(ns.exec("batch/H_worker.ts", exHost, hackThreads, targetHost, hackTime, performance.now() + hackTime + hackDelay + batchDelay * j));  
            }  
            ns.exec("batch/W_worker.ts", exHost, weaken1ThreadsHome, targetHost, weakenTime, performance.now() + weakenTime + weaken1Delay + batchDelay * j);
            if(j > 100){
              ns.exec("batch/G_worker.ts", exHost, growthThreadsHome, targetHost, growTime, performance.now() + growTime + growDelay + batchDelay * j);  
            }  
            ns.exec("batch/W_worker2.ts", exHost, weaken2ThreadsHome, targetHost, weakenTime, performance.now() + weakenTime + weaken2Delay + batchDelay * j, ns.pid, exHost);
          }else{
            if(j > 200){
              hackPids.push(ns.exec("batch/H_worker.ts", exHost, hackThreads, targetHost, hackTime, performance.now() + hackTime + hackDelay + batchDelay * j));    
            }
            ns.exec("batch/W_worker.ts", exHost, weaken1Threads, targetHost, weakenTime, performance.now() + weakenTime + weaken1Delay + batchDelay * j);
            if(j > 100){
              ns.exec("batch/G_worker.ts", exHost, growthThreads, targetHost, growTime, performance.now() + growTime + growDelay + batchDelay * j);    
            }
            ns.exec("batch/W_worker2.ts", exHost, weaken2Threads, targetHost, weakenTime, performance.now() + weakenTime + weaken2Delay + batchDelay * j, ns.pid, exHost);
          }
          j++
        }
      } 
    }     
    firstLoop = false;


    while (true)
    {
     
      await ns.nextPortWrite(ns.pid);
      workerServer = ns.readPort(ns.pid);

      //remove top hack worker pid from the list of pids
      hackPids.shift();


      if ((ns.getServerSecurityLevel(targetHost) > minSecurity)||(ns.getServerMoneyAvailable(targetHost) < (ns.getServerMaxMoney(targetHost) * 0.98))){ 
        let killNumber: number = 10;
        if (killNumber > hackPids.length) killNumber = hackPids.length;
        for (let i = 0; i < killNumber; i++){
          ns.kill(hackPids[i]);
        }
      }
      if(workerServer == "home"){
        hackPids.push(ns.exec("batch/H_worker.ts", workerServer, hackThreads, targetHost, hackTime, performance.now() + hackTime + hackDelay + batchDelay));
        ns.exec("batch/W_worker.ts", workerServer, weaken1ThreadsHome, targetHost, weakenTime, performance.now() + weakenTime + weaken1Delay + batchDelay);
        ns.exec("batch/G_worker.ts", workerServer, growthThreadsHome, targetHost, growTime, performance.now() + growTime + growDelay + batchDelay);    
        ns.exec("batch/W_worker2.ts", workerServer, weaken2ThreadsHome, targetHost, weakenTime, performance.now() + weakenTime + weaken2Delay + batchDelay, ns.pid, workerServer);
      }else{
        hackPids.push(ns.exec("batch/H_worker.ts", workerServer, hackThreads, targetHost, hackTime, performance.now() + hackTime + hackDelay + batchDelay));
        ns.exec("batch/W_worker.ts", workerServer, weaken1Threads, targetHost, weakenTime, performance.now() + weakenTime + weaken1Delay + batchDelay);
        ns.exec("batch/G_worker.ts", workerServer, growthThreads, targetHost, growTime, performance.now() + growTime + growDelay + batchDelay);    
        ns.exec("batch/W_worker2.ts", workerServer, weaken2Threads, targetHost, weakenTime, performance.now() + weakenTime + weaken2Delay + batchDelay, ns.pid, workerServer);
      }
      
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