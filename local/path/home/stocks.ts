export async function main(ns: NS) {

    
    const prices: number[][] = [[]];
    const symbols = ns.stock.getSymbols();

    for (let i = 0; i < symbols.length; i++){
        prices.push([]);
    }

    //for(let count = 0;count < 15; count ++){
    for(let count = 0;count < 2; count ++){
        for (let i = 0; i < symbols.length; i++){
            prices[i].push(ns.stock.getPrice(symbols[i]));
        }
        await ns.stock.nextUpdate();
    }

    //for (let i = 0; i < symbols.length; i++){
    //    ns.tprint("Stock symbol: " + symbols[i]);
    //    ns.tprint("Stock price: " + prices[i][0] + " " + prices[i][1]);
    //}

    while(true){        
        for (let i = 0; i < symbols.length; i++){
            prices[i].shift();
            prices[i].push(ns.stock.getPrice(symbols[i]));
            let direction: number = 0;
            //ns.tprint("Stock symbol: " + symbols[i]);

            //looking for flips algorithm
            /*
            if((prices[i][29] - prices[i][15]) < 0){
                direction = -1;
            }
            else if(((prices[i][14] - prices[i][0]) < -0.05) && ((prices[i][29] - prices[i][15]) / prices[i][29] > 0.05)){
                //direction = 1;

                //for(let count = 1;count < 15; count ++){
                //    if(prices[i][count] > prices[i][count - 1]){
                //        direction += 1;
                //    }
                //    else{
                //        direction -= 1;
                //    }
                //    
                //}
                //
                //if(direction < -4){
                //    direction = 0;
                //    for(let count = 15;count < 30; count ++){
                //        if(prices[i][count] > prices[i][count - 1]){
                //            direction += 1;
                //        }
                //        else{
                //            direction -= 1;
                //        }
                //        
                //    }
                //}
                //else{
                //    direction = 0;
                //}

                if((Math.abs(prices[i][29] - prices[i][28])/prices[i][28]) < .015){
                    direction = 1;
                }

            }
                */

            //tick based momentum algorithm:
            
            //for(let count = 1;count < 15; count ++){
            //    if(prices[i][count] > prices[i][count - 1]){
            //        direction += 1;
            //    }
            //    else{
            //        direction -= 1;
            //    }
            //    
            //}
                
            //ns.tprint("direction " + direction);

            //4S

            direction = 10 * ns.stock.getForecast(symbols[i]);
            //ns.tprint(symbols[i] + " direction " + direction);

            if (direction < 4){   
                ns.print(direction);             
                const shares = ns.stock.getPosition(symbols[i])[2];
                if (shares < ns.stock.getMaxShares(symbols[i])){
                    if (100000000 < ns.getServerMoneyAvailable("home")){
                        ns.stock.buyShort(symbols[i], Math.floor((ns.getServerMoneyAvailable("home") - ns.stock.getConstants().StockMarketCommission)/ns.stock.getAskPrice(symbols[i])))
                        ns.stock.buyShort(symbols[i], ns.stock.getMaxShares(symbols[i]))
                    }
                }
            } 
            if(direction > 4.5){
                //ns.print(direction);   
                const shares = ns.stock.getPosition(symbols[i])[2];
                if (shares > 0){
                    ns.stock.sellShort(symbols[i], shares);
                }
            }
            if(direction < 5.5){
                //ns.print(direction);   
                const shares = ns.stock.getPosition(symbols[i])[0];
                if (shares > 0){
                    ns.stock.sellStock(symbols[i], shares);
                }
            }
            if (direction > 6){   
                ns.print(direction);             
                const shares = ns.stock.getPosition(symbols[i])[0];
                if (shares < ns.stock.getMaxShares(symbols[i])){
                    if (100000000 < ns.getServerMoneyAvailable("home")){
                        ns.stock.buyStock(symbols[i], Math.floor((ns.getServerMoneyAvailable("home") - ns.stock.getConstants().StockMarketCommission)/ns.stock.getAskPrice(symbols[i])))
                        ns.stock.buyStock(symbols[i], ns.stock.getMaxShares(symbols[i]))
                    }
                }
            } 
        }
        await ns.stock.nextUpdate();

    }

}