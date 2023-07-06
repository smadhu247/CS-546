const people = require("./people");
const stocks = require("./stocks");

async function main(){

    //getPersonById
    console.log("getPersonById Tests");
    try{
        const peopledata = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById("        7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById(-1);
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById(1001); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById(); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById("          "); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff'); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }

    //sameEmail
    console.log("   ");
    console.log("sameEmail Tests");
    try{
        const peopledata = await people.sameEmail("harvard.edu");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("     harvard.edu     ");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("HARVARD.EDU");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("foobar"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("foobar."); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("foobar.123"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail(".com"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail(); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("google.com.hk"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("google.co.h"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("google.co."); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail(123); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("         "); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("google.co.c"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameEmail("ox.ac.uk"); //error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }

    

    //manipulateIp
    console.log("   ");
    console.log("manipulateIp Tests");
    try{
        const peopledata = await people.manipulateIp(); 
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }

    //sameBirthday
    console.log("   ");
    console.log("sameBirthday Tests");
    try{
        const peopledata = await people.sameBirthday(9, 25); // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge']
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await  people.sameBirthday("09", "25"); // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge'] because the parameters can be parsed into valid numbers.
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await  people.sameBirthday(9, 31); // Throws Error: There are not 31 days in Sept
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(13, 25); // Throws Error: Month > 12
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await  people.sameBirthday(2, 29); // Throws Error: There are not 29 days in Feb
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("09", "31"); //Throws Error: There are not 31 days in Sept
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("      ", "25"); // Throws Error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(" 09", "       "); // Throws Error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("09", "06"); // Throws Error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("    09     ", "  06     "); // Throws Error
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(); // Throws Error:
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(12,11); // Throws Error:
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(1,5); // Throws Error:
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(1,4); // Throws Error:
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }


    //listShareholders
    console.log("   ");
    console.log("listShareholders Tests");
    try{
        const stockdata = await stocks.listShareholders("Aeglea BioTherapeutics, Inc.");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders("       Aeglea BioTherapeutics, Inc.");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders("Powell Industries, Inc.");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders('foobar');
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders();
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders(123);
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listShareholders("        ");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }

    //totalShares
    console.log("   ");
    console.log("totalShares Tests");
    try{
        const stockdata = await stocks.totalShares("Aeglea BioTherapeutics, Inc.");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares('Nuveen Preferred and Income 2022 Term Fund');
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares('Powell Industries, Inc.'); 
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares('     Powell Industries, Inc.       '); 
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares(43);
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares(' '); 
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares('Foobar Inc');
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.totalShares();
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }

    // listStocks
    console.log("   ");
    console.log("listStocks Tests");
    try{
        const stockdata = await stocks.listStocks("Grenville", "Pawelke" );
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks("Lin", "Enterle" );
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks("Ossie", "Courage" );
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks('Patrick', "Hill");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks();
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks("foo");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks("      ", "        ");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks("hello", "        ");
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks(1,2);
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.listStocks("sanjana",2);
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }

    //getStockById
    console.log("   ");
    console.log("listStocks Tests");
    try{
        const stockdata = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"); 
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.getStockById("    f652f797-7ca0-4382-befb-2ab8be914ff0"); 
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.getStockById(-1);
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.getStockById(1001);
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.getStockById();
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stockdata = await stocks.getStockById('      ');
        console.log(stockdata);
    }catch(e){
        console.log (e);
    }

}

main();
