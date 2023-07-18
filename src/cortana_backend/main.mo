import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Array "mo:base/Array";
import Float "mo:base/Float";

actor Cortana {

    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var saleList : [Principal] = [];
    var mapOfPrices = HashMap.HashMap<Principal, Text>(1, Principal.equal, Principal.hash);

    public shared (msg) func mint(imgData : [Nat8], name : Text) : async Principal {
        let owner : Principal = msg.caller;

        Debug.print(debug_show (Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imgData);
        Debug.print(debug_show (Cycles.balance()));

        let newNFTPrincipal = await newNFT.getCanisterId();

        mapOfNFTs.put(newNFTPrincipal, newNFT);
        addToOwnershipMap(owner, newNFTPrincipal);

        return newNFTPrincipal;
    };

    private func addToOwnershipMap(owner : Principal, nftId : Principal) {
        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        mapOfOwners.put(owner, ownedNFTs);
    };

    public query func getOwnedNFTs(user : Principal) : async [Principal] {
        var userNFTs : List.List<Principal> = switch (mapOfOwners.get(user)) {
            case null { List.nil<Principal>() };
            case (?result) { result };
        };
        return List.toArray(userNFTs);
    };

    public shared func addToForSale(owner : Text, nftId : Principal) {
        var userNFTs : List.List<Principal> = switch (mapOfOwners.get(Principal.fromText(owner))) {
            case null { List.nil<Principal>() };
            case (?result) { result };
        };
        var filteredList = List.filter<Principal>(userNFTs, func n { n != nftId });
        mapOfOwners.put(Principal.fromText(owner), filteredList);
        saleList := Array.append(saleList, [nftId]);
    };

    public shared func getForSale() : async [Principal] {
        return saleList;
    };

    public shared func addSalePrice(nftId : Principal, price : Text) {
        mapOfPrices.put(nftId, price);
    };

    public query func getSalePrice(nftId : Principal) : async Text {
        var nftPrice : Text = switch (mapOfPrices.get(nftId)) {
            case null { "None" };
            case (?result) { result };
        };
        return nftPrice;
    };

    public shared func removeFromSale(nftId : Principal) {
        saleList := Array.filter<Principal>(saleList, func x = x != nftId);
        mapOfPrices.delete(nftId);
    };

    public shared (msg) func addToBoughtOwner(nftId : Principal) {
        let owner = msg.caller;
        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        mapOfOwners.put(owner, ownedNFTs);
    };

    public shared func clearData() : async () {
        mapOfNFTs := HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
        mapOfOwners := HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    };

};
