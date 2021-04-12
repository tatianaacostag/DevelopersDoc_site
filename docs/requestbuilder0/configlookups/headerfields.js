var ipaddressheader = {

    requests: {

        Authorize: ["rsb", "credorax", "payusingleplatform","dalenys", "safecharge"],

        Charge: ["rsb", "credorax", "payeasecup","dalenys","safecharge"],

        Credit: ["credorax","dalenys", "safecharge"]
    }
    
}

var useragent = {

    requests: {

        Authorize: ["dalenys","credorax", "payusingleplatform"],

        Charge: ["dalenys","credorax", "payusingleplatform"],

        Credit: ["dalenys"]
    }
}