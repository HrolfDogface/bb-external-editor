/** @param {NS} ns */
export async function main(ns) {

  //args[0]:target host name
  //args[1]:execution time
  //args[2]:completion time

  //ns.write("batch/batchLog.txt", Date.now() + "[H_worker.js]: starting Hack of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  let startTime = Date.now();
  let delay = ns.args[2] - startTime - ns.args[1];
  if (delay < 0){
    delay = 0;
  }
  let money = await ns.hack(ns.args[0], {additionalMsec:  delay});
  //let totalTime = Date.now() - startTime;
  
  //const error = Date.now() - ns.args[2];
  
  //ns.write("batch/batchLog.txt", Date.now() + "[H_worker.js]: finished Hack of " 
  //                  + ns.args[0] + " $" + money + " stolen in " + totalTime + " msec " +  error + " " + ns.pid + "\n", "a");

}