/** @param {NS} ns */
export async function main(ns) {

  //args[0]:target host name
  //args[1]:execution time
  //args[2]:completion time

  //ns.write("batch/batchLog.txt", Date.now() + "[W_worker.js]: starting Weaken of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  let startTime = Date.now();
  let delay = ns.args[2] - startTime - ns.args[1];
  if (delay < 0){
    delay = 0;
  }
  let money = await ns.weaken(ns.args[0], {additionalMsec:  delay});
  //let totalTime = Date.now() - startTime;
  
  //const error = Date.now() - ns.args[2];
  
  //ns.write("batch/batchLog.txt", Date.now() + "[W_worker.js]: finished Weaken of " 
  //                  + ns.args[0] + ". Security by " + money + " in" + totalTime + " msec " + error + " " + ns.pid + "\n", "a");

}