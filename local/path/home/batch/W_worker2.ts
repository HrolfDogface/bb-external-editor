export async function main(ns: NS) {

  //args[0]:target host name
  //args[1]:execution time
  //args[2]:completion time
  //args[3]:port id  
  //args[4]:server worker is running on

  //ns.write("batch/batchLog.txt", performance.now() + "[W_worker.js]: starting Weaken of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  const startTime: number = performance.now();
  let delay: number = Number(ns.args[2]) - startTime - Number(ns.args[1]);
  if (delay < 0){
    delay = 0;
  }
  await ns.weaken(String(ns.args[0]), {additionalMsec:  delay});
  //let security: number = await ns.weaken(ns.args[0], {additionalMsec:  delay});
  //let totalTime = performance.now() - startTime;

  //const error = performance.now() - ns.args[2];
  ns.atExit(() => ns.writePort(Number(ns.args[3]), String(ns.args[4])));
  //ns.writePort(ns.args[3], ns.pid);
  //ns.write("batch/batchLog.txt", performance.now() + "[W_worker2.js]: finished Weaken of " 
  //                 + ns.args[0] + ". Security by " + security + " in" + totalTime + " msec " +  error + " " + ns.args[4] + " " + ns.pid + "\n", "a");

}