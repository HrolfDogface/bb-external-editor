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

  for(const exHost of exHosts){
    ns.scp("target_prep.ts", exHost);
    ns.scp("money.ts", exHost);
    ns.scp("security.ts", exHost);
    ns.scp("batch/gunner.ts", exHost);
    ns.scp("batch/H_worker.ts", exHost);
    ns.scp("batch/W_worker.ts", exHost);
    ns.scp("batch/G_worker.ts", exHost);
    ns.scp("batch/W_worker2.ts", exHost);
  }


  const freeRam: number = ns.getServerMaxRam(exHosts[0]) - ns.getServerUsedRam(exHosts[0]);

  
  const prepRam: number = ns.getScriptRam("target_prep.ts", exHosts[0]);
  const prepWRam: number = ns.getScriptRam("security.ts", exHosts[0]);
  const prepGRam: number = ns.getScriptRam("money.ts", exHosts[0]);
  const prepWThreads: number = Math.floor((freeRam - prepRam - 2) * 0.19 / prepWRam);
  const prepGThreads: number = Math.floor((freeRam - prepRam - 2) * 0.79 / prepGRam);
  
  
  const maxMoney: number = ns.getServerMaxMoney(targetHost);
  const minSecurity: number = ns.getServerMinSecurityLevel(targetHost);

  while (true){
    ns.exec("target_prep.ts", exHosts[0], 1, targetHost, prepWThreads, prepGThreads, exHosts[0]);
    
    while (ns.getServerMoneyAvailable(targetHost) < maxMoney){
      await ns.sleep(100);
    }
    await ns.sleep(1000);

    while (ns.getServerSecurityLevel(targetHost) > minSecurity){
      await ns.sleep(100);
    }  
    await ns.sleep(150);

    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: done waiting for target prep\n", "a");


    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: " + targetHost + " max money is $"
          + maxMoney + " and min security is " + minSecurity + "\n", "a");

  

    let workerServer: string = ""; 
    const weakenPids: number [] = [];

    //let firstLoop: boolean = true;
    //while (true){

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
    const growDelay: number = weakenTime - growTime - 0;
    const weaken2Delay: number = 0;
    const batchDelay: number = .05;

    let hackThreads: number =  Math.floor(0.8/ns.formulas.hacking.hackPercent(server, player));
    if (hackThreads < 1) hackThreads = 1;

    const hackSecurity: number = hackThreads * 0.002;

    const cores: number = ns.getServer("home").cpuCores;
    server.moneyAvailable = server.moneyMax * 0.2;
    server.hackDifficulty = server.minDifficulty + hackSecurity;
    let growthThreads: number = Math.ceil(ns.formulas.hacking.growThreads(server, player, server.moneyMax, 1) * 1.2);    
    let growthThreadsHome: number = Math.ceil(ns.formulas.hacking.growThreads(server, player, server.moneyMax, cores) * 1.2);

    if (growthThreads < 1) growthThreads = 1;
    if (growthThreadsHome < 1) growthThreadsHome = 1;

    
    const growSecurity: number = growthThreads * 0.004;
    const growSecurityHome: number = growthThreadsHome * 0.004;

    const weakenAmountHome: number = ns.weakenAnalyze(1, cores);
    const weakenAmount: number = ns.weakenAnalyze(1, 1);

    let weaken2Threads: number = Math.ceil(1.2 * (hackSecurity + growSecurity)/weakenAmount);
    if ( weaken2Threads < 1)  weaken2Threads = 1;

    
    let weaken2ThreadsHome: number = Math.ceil(1.2 * (hackSecurity + growSecurityHome)/weakenAmountHome);
    if ( weaken2ThreadsHome < 1)  weaken2ThreadsHome = 1;

    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: hackThreads = " + hackThreads + "\n", "a");    
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: growthThreads = " + growthThreads + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: hackSecurity = " + hackSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: growSecurity = " + growSecurity + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: weakenAmount = " + weakenAmount + "\n", "a");
    ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: weaken2Threads = " + weaken2Threads + "\n", "a");

    let level = ns.getHackingLevel(); 
    let j: number = 0;  
    const depth: number = 90000;
    let totalBatches:number = 0;
    for(const exHost of exHosts){
      const freeRam: number = ns.getServerMaxRam(exHost) - ns.getServerUsedRam(exHost);

      let batches: number;
      if(exHost == "home"){
        const hackRam: number = ns.getScriptRam("batch/H_worker.ts", exHost) * hackThreads;
        const growRam: number = ns.getScriptRam("batch/G_worker.ts", exHost) * growthThreadsHome;   
        const weaken2Ram: number = ns.getScriptRam("batch/W_worker.ts", exHost) * weaken2ThreadsHome;
        const batchRam: number = hackRam + growRam + weaken2Ram;
        batches = Math.floor((freeRam - 12)/batchRam);
      }else{
        const hackRam: number = ns.getScriptRam("batch/H_worker.ts", exHost) * hackThreads;
        const growRam: number = ns.getScriptRam("batch/G_worker.ts", exHost) * growthThreads; 
        const weaken2Ram: number = ns.getScriptRam("batch/W_worker.ts", exHost) * weaken2Threads;
        const batchRam: number = hackRam + growRam + weaken2Ram;
        batches = Math.floor((freeRam - 12)/batchRam);
      }

      
      if ((batches + totalBatches) > depth){
        batches = Math.floor(depth - totalBatches);
        totalBatches += batches; // make sure that total batches is large enough that this is the last server deployed on
      }
      totalBatches += batches;
      ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: batches = " + batches + "\n", "a");
 
      ns.write("batch/batchLog.txt", performance.now() + "[batcherv2.ts]: level = " + level + "\n", "a");    

      if(true){
        for (let i: number = 0; i < batches; i++){
          if(exHost == "home"){
            
            ns.exec("batch/H_worker.ts", exHost, hackThreads, targetHost, hackTime, performance.now() + hackTime + hackDelay + batchDelay * j);
            
            ns.exec("batch/G_worker.ts", exHost, growthThreadsHome, targetHost, growTime, performance.now() + growTime + growDelay + batchDelay * j);  
              
            weakenPids.push(ns.exec("batch/W_worker2.ts", exHost, weaken2ThreadsHome, targetHost, weakenTime, performance.now() + weakenTime + weaken2Delay + batchDelay * j, ns.pid, exHost));
          }else{
            
            ns.exec("batch/H_worker.ts", exHost, hackThreads, targetHost, hackTime, performance.now() + hackTime + hackDelay + batchDelay * j);   
            
            ns.exec("batch/G_worker.ts", exHost, growthThreads, targetHost, growTime, performance.now() + growTime + growDelay + batchDelay * j);    
            
            weakenPids.push(ns.exec("batch/W_worker2.ts", exHost, weaken2Threads, targetHost, weakenTime, performance.now() + weakenTime + weaken2Delay + batchDelay * j, ns.pid, exHost));
          }
          j++

          if (j%5000 == 0) await ns.sleep(1);
        }
      } 
    }  

    while (true)
    {
     
      await ns.nextPortWrite(ns.pid);
      workerServer = ns.readPort(ns.pid);

      //remove top weaken worker pid from the list of pids
      weakenPids.shift();

      if (weakenPids.length < 1) break;
      

    }

    
  }
  
}