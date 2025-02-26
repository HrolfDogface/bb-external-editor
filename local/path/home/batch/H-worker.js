/** @param {NS} ns */
export async function main(ns) {

  //args[0]:target host name
  //args[1]:delay msec

  //ns.write("batch/batchLog.txt", Date.now() + "[H-worker.js]: starting Hack of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  let startTime = Date.now();
  let money = await ns.hack(ns.args[0], {additionalMsec:  ns.args[1]});
  let totalTime = Date.now() - startTime;
  
  //ns.write("batch/batchLog.txt", Date.now() + "[H-worker.js]: finished Hack of " 
  //                  + ns.args[0] + " $" + money + " stolen in " + totalTime + " msec\n", "a");

}