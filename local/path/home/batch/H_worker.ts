export async function main(ns: NS) {

  //args[0]:target host name
  //args[1]:execution time
  //args[2]:completion time

  //ns.write("batch/batchLog.txt", performance.now() + "[H_worker.js]: starting Hack of " 
  //                  + ns.args[0] + " with a delay of " + ns.args[1] + " msec\n", "a");
  let startTime: number = performance.now();
  let delay: number = Number(ns.args[2]) - startTime - Number(ns.args[1]);
  if (delay < 0){
    delay = 0;
  }
  await ns.hack(ns.args[0], {additionalMsec:  delay, stock: false});
  //let money: number = await ns.hack(ns.args[0], {additionalMsec:  delay});
  //let totalTime = performance.now() - startTime;
  
  //const error = performance.now() - ns.args[2];
  
  //ns.write("batch/batchLog.txt", performance.now() + "[H_worker.js]: finished Hack of " 
  //                  + ns.args[0] + " $" + money + " stolen in " + totalTime + " msec " +  error + " " + ns.pid + "\n", "a");

}