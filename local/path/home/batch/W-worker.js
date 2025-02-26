/** @param {NS} ns */
export async function main(ns) {

  //args[0]:target host name
  //args[1]:delay msec

  //ns.write("batch/batchLog.txt", Date.now() + "[W-worker.js]: starting Weaken of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  let startTime = Date.now();
  let money = await ns.weaken(ns.args[0], {additionalMsec:  ns.args[1]});
  let totalTime = Date.now() - startTime;
  
  //ns.write("batch/batchLog.txt", Date.now() + "[W-worker.js]: finished Weaken of " 
  //                  + ns.args[0] + ". Security by " + money + " in" + totalTime + " msec\n", "a");

}