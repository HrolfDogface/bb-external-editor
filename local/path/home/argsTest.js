/** @param {NS} ns */
export async function main(ns) {
  ns.print("entering test\n");
  
    ns.print(ns.args[0] + "\n");
  for (let i = 0; i < ns.args.length; i++){
    ns.print(ns.args[i] + "\n");
  }
  ns.tail();
}