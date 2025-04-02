//import { GangMemberInfo } from "NetscriptDefinitions";

export async function main(ns: NS) {

    const task: string = String(ns.args[0]);
    const names: string[] = ns.gang.getMemberNames();
    let bangers: GangMemberInfo[ ] = [];

    for (const name of names){
        bangers.push(ns.gang.getMemberInformation(name));
    }

    bangers = bangers.sort(function (a, b) { return a.str - b.str; });

    for(let i = 0; i < bangers.length; i++){
        if (i < 2){
            ns.gang.setMemberTask(bangers[i].name, "Train Combat");
            continue;
        }
        if (bangers[i].str < 600){
            ns.gang.setMemberTask(bangers[i].name, "Train Combat");
            continue;
        }
        ns.gang.setMemberTask(bangers[i].name, task);
    }


}