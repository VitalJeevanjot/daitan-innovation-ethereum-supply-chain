
import { computerListManager, addItemToList, format_date, init_web3, computerPartListManager, getMultipleActivePart, getActivePart, clearcomputerDetails, getOwnerHistoryFromEvents, getOwnedItemsFromEvent, updateAddress } from "./utils.js"

$(document).ready(function () {
    var x = init_web3().then(() => {

        // document.getElementById("register-part").addEventListener("click", function () {
        //     console.log("Register Received Part")

        //     var addr = document.getElementById("part-addr").value

        //     if(addr != ""){
        //         addItemToList(addr, "computer-part-list", computerPartListManager)
        //     }
        // })

        var address_text = document.getElementById('computer-factory-address')
        updateAddress(address_text)

        //Get products
        getOwnedItemsFromEvent(window.accounts[0], 'TransferProductOwnership').then((products) => {
            console.log("prod Events")
            console.log(products)
            for (var i = 0; i < products.length; i++) {
                addItemToList(products[i], "computer-list", computerListManager)
            }
        })

        //Get all the parts that belonged to this factory and then check the ones that still do
        getOwnedItemsFromEvent(window.accounts[0], 'TransferPartOwnership').then((parts) => {
            console.log(parts)
            for (var i = 0; i < parts.length; i++) {
                getOwnerList(parts, i)
            }
        })
        async function getOwnerList (parts, i) {
            var owners = await getOwnerHistoryFromEvents('TransferPartOwnership', parts[i])
            console.log(owners)
            if (owners[owners.length - 1] == window.accounts[0]) {
                addItemToList(parts[i], "computer-part-list", computerPartListManager)
            }
        }


        document.getElementById("build-computer").addEventListener("click", function () {
            console.log("Build computer")

            //First, get the serial number
            var serial = document.getElementById("create-computer-serial-number").value
            if (serial != "") {
                //Then the parts that will be present on the computer
                var part_list = getMultipleActivePart()
                var part_array = []
                for (var i = 0; i < part_list.length; i++) {
                    part_array.push(part_list[i].textContent)
                }

                // //Fill part array with dummy elements for the unprovided parts
                // while(part_array.length < 6){
                //     part_array.push("0x0")
                // }
                var creation_date = format_date()

                console.log("Create computer with params")
                console.log(serial)
                console.log(part_array)
                console.log(part_array)
                console.log(creation_date)
                //Finally, build the computer
                window.pm.methods.buildProduct(serial, "computer", creation_date, part_array).send({ from: window.accounts[0], gas: 2000000 }, function (error, result) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("computer created")
                        //Add hash to computer owned list
                        var computer_sha = web3.utils.soliditySha3(window.accounts[0], web3.utils.fromAscii(serial),
                            web3.utils.fromAscii("computer"), web3.utils.fromAscii(creation_date))
                        addItemToList(computer_sha, "computer-list", computerListManager)

                        //Remove parts from available list
                        for (var i = 0; i < part_list.length; i++) {
                            part_list[i].removeEventListener("click", computerPartListManager)
                            part_list[i].parentElement.removeChild(part_list[i])
                        }
                    }
                })
            }
        })

        document.getElementById("computer-change-ownership-btn").addEventListener("click", function () {
            console.log("Change Ownership")
            //Get computer hash from active item on owned list

            var hash_element = getActivePart("computer-list")
            if (hash_element != undefined) {
                var to_address = document.getElementById("computer-change-ownership-input").value
                if (to_address != "") {
                    window.co.methods.changeOwnership(1, hash_element.textContent, to_address).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log("Changed ownership")
                            //Logic to remove item from owned list
                            hash_element.parentElement.removeChild(hash_element)
                            clearcomputerDetails()
                        }
                    })
                }

            }
        })
    })
})

//0xaa39f40ab0633ae9a1bbf643addfa3063a89666755ce1395a0742c4baf77e86e
//0x3fa38b7252038199b6c7ebb5b98bad3e97078790994d4ead584251015373eeac
//0x6adc265a4f62967693e499536e46c923506d5e55acf3f5502a15021c06c56a31
//0xaf11934fcff38d5bda623b4d16d18049e6200e19cf9a0da94368e98bc5794c1a
//0xca42aef82d8e832fa9532872772e3dbdf472e4f29790647654bb4df17cf55f7e
//0x73013ace31bfcdbf3810945b74ceb9e1516e09dabd157eb6b5ccdf8f78a5ac99