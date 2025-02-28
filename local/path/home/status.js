/** @param {NS} ns */
export async function main(ns) { 
  const cyan = "\u001b[36m";
  const yellow = "\u001b[33m";
  const green = "\u001b[32m";
  const red = "\u001b[31m";
  const white = "\u001b[37m";  
  const reset = "\u001b[0m";


  for (let i = 0; i < ns.args.length; i++){

    let cashRatio = ns.getServerMoneyAvailable(ns.args[i])/ns.getServerMaxMoney(ns.args[i]);
    let threatRatio = ns.getServerSecurityLevel(ns.args[i])/ns.getServerMinSecurityLevel(ns.args[i]);
    
    let cashColor = red;
    if (cashRatio > 0.8) cashColor = green;
    else if (cashRatio > 0.495) cashColor = yellow;
    
    let threatColor = red;
    if (threatRatio < 1.5) threatColor = green;
    else if (threatRatio < 3.0) threatColor = yellow;
    ns.tprintf(`${cyan}%-20s${white}\tMoney: ${cashColor}%.0f%%${white}\tThreat: ${threatColor}%.0f%%${reset}`, ns.args[i], cashRatio * 100, (threatRatio - 1) * 100);
  }
}