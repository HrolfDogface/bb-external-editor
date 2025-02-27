/** @param {NS} ns */
export async function main(ns) {

  //args[0]:target host name
  //args[1]:delay msec

  //ns.write("batch/batchLog.txt", Date.now() + "[G_worker.js]: starting Grow of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  let startTime = Date.now();
  let money = await ns.grow(ns.args[0], {additionalMsec:  ns.args[1]});
  let totalTime = Date.now() - startTime;
  
  //ns.write("batch/batchLog.txt", Date.now() + "[G_worker.js]: finished Grow of " 
  //                  + ns.args[0] + ". Money grown by " + money + "% in" + totalTime + " msec\n", "a");

}