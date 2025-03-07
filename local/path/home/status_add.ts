export async function main(ns: NS) {

    for (let i = 0; i < ns.args.length; i++){
        ns.writePort(1, String(ns.args[i]));
    }

}