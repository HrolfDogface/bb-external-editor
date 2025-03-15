export async function main(ns: NS) {

    const count: number = Number(ns.args[0]) - 1;
    if(count > 0){
        ns.exec("burn_pids.ts", "home", 1, count);
    }

}