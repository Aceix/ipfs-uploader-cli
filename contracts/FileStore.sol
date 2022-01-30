// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;
pragma experimental ABIEncoderV2;

contract FileStore {
    string[] private cids;

    function saveCid(string memory cid) public {
        cids.push(cid);
    }

    function getCids() public view returns (string[] memory) {
        return cids;
    }
}
