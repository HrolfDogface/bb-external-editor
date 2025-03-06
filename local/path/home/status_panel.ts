export async function main(ns: NS) { 
  const cyan: string = "\u001b[36m";
  const yellow: string = "\u001b[33m";
  const green: string = "\u001b[32m";
  const red: string = "\u001b[31m";
  const white: string = "\u001b[37m";  
  const reset: string = "\u001b[0m";

  ns.disableLog('ALL');
  ns.clearLog();
  ns.tail();
  ns.resizeTail(495, 32 + (24 * ns.args.length));
  ns.setTitle("Targets Status");
  ns.moveTail(1635, 0);

  let targets: string[] = [];
  for (let i = 0; i < ns.args.length; i++){
    targets.push(String(ns.args[i]));
  }

  while(true)
  {
    const readValue: string = ns.readPort(1);
    if (readValue == "clear"){
      targets = [];
    }else if ((readValue != "NULL PORT DATA") && !targets.includes(readValue)){
      targets.push(readValue);
    }
    
    ns.resizeTail(495, 32 + (24 * targets.length));

    ns.clearLog();
    for (let i = 0; i < targets.length; i++){

      const cashRatio: number = ns.getServerMoneyAvailable(targets[i])/ns.getServerMaxMoney(targets[i]);
      const threatRatio: number = ns.getServerSecurityLevel(targets[i])/ns.getServerMinSecurityLevel(targets[i]);

      let cashColor: string = red;
      if (cashRatio > 0.8) cashColor = green;
      else if (cashRatio > 0.495) cashColor = yellow;

      let threatColor: string = red;
      if (threatRatio < 1.5) threatColor = green;
      else if (threatRatio < 3.0) threatColor = yellow;
      ns.printf(`${cyan}%-20s${white}Money: ${cashColor}%3.0f%%${white}\tThreat: ${threatColor}%3.0f%%${reset}`, targets[i], cashRatio * 100, (threatRatio - 1) * 100);
    }
    await ns.sleep(250);
  }
}