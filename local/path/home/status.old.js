/** @param {NS} ns */
export async function main(ns) { 
  const cyan = "\u001b[36m";
  const yellow = "\u001b[33m";
  const green = "\u001b[32m";
  const red = "\u001b[31m";
  const white = "\u001b[37m";  
  const reset = "\u001b[0m";
  let hostNames = ["sigma-cosmetics", "joesguns", "nectar-net", 
                  "hong-fang-tea", "harakiri-sushi", "iron-gym", 
                  "phantasy", "silver-helix"];


  for (let i = 0; i < hostNames.length; i++){

    let cashRatio = ns.getServerMoneyAvailable(hostNames[i])/ns.getServerMaxMoney(hostNames[i]);
    let threatRatio = ns.getServerSecurityLevel(hostNames[i])/ns.getServerMinSecurityLevel(hostNames[i]);
    
    let cashColor = red;
    if (cashRatio > 0.8) cashColor = green;
    else if (cashRatio > 0.495) cashColor = yellow;
    
    let threatColor = red;
    if (threatRatio < 1.5) threatColor = green;
    else if (threatRatio < 3.0) threatColor = yellow;
    ns.tprintf(`${cyan}%-20s${white}\tMoney: ${cashColor}%.0f%%${white}\tThreat: ${threatColor}%.0f%%${reset}`, hostNames[i], cashRatio * 100, (threatRatio - 1) * 100);
  }
}