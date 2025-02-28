export async function main(ns: NS) {

    const servers: string[] = ns.getPurchasedServers();
    for (let i: number = 0; i < servers.length; i++){
        ns.deleteServer(servers[i]);
    }

}