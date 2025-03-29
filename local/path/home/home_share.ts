export async function main(ns: NS) {

const freeRam: number = ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
const prepGRam: number = ns.getScriptRam("money.ts", "home");
const prepGThreads: number = Math.floor((freeRam - 32) / prepGRam);
const shareRam: number = ns.getScriptRam("share.ts", "home");
const shareThreads: number = Math.floor((freeRam - 32) / shareRam);

const pid = ns.exec("money.ts", "home", prepGThreads, "joesguns");

let levelStart = ns.getHackingLevel();

while(true){
await ns.sleep(15000);
if(levelStart == ns.getHackingLevel()) break;
levelStart = ns.getHackingLevel();
}

ns.kill(pid);

ns.exec("share.ts", "home", shareThreads);

}