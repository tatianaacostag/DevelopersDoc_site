var unsupportedpaymentmethods = {

    ccards: {

    },
    banktransfer: {
        
    },

    dredirect: {
        
    },

    cash: {

    },
    loyalty: {
        payusouthafrica: {
            Authorize: [
                "EBUCKS",
            ],
            Capture: [
                "EBUCKS",
            ]
        }
    },
   ewallet: {
       payusouthafrica: {
            Authorize: [
                "MASTERPASS",
                "MOBICRED"
            ],
            Capture: [
                "MASTERPASS",
                "MOBICRED"
            ],
            Void: [
                "MASTERPASS",
                "MOBICRED",
                "VISA_CHECKOUT"
            ],
            Refund: [
                "MASTERPASS",
                "MOBICRED",
                "VISA_CHECKOUT"
            ],
       },

       paypal: {

        Token: [
            "paypalexpress"
        ]
       }
    
   } 
}