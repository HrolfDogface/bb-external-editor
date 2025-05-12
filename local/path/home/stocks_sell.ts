export async function main(ns: NS) {

    
    const symbols = ns.stock.getSymbols();

    for (let i = 0; i < symbols.length; i++){
        const shares = ns.stock.getPosition(symbols[i])[0];
        if (shares > 0){
            ns.stock.sellStock(symbols[i], shares);
        }
    }

}