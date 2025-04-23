export async function main(ns: NS) {
    const hashCount = ns.hacknet.numHashes();
    ns.hacknet.spendHashes("Sell for Money", "home", Math.floor(hashCount/4));
}