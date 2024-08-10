const XYZCoin = artifacts.require("XYZCoin");
const assert = require("assert");

contract("XYZCoin", async accounts => {
  let xyzCoinInstance;

  before(async () => {
    xyzCoinInstance = await XYZCoin.deployed();
  });

  it("should set the token name correctly", async () => {
    const name = await xyzCoinInstance.name();
    assert.equal(name, "XYZCoin");
  });

  it("should set the initial balance of the creator to total supply", async () => {
    const balance = await xyzCoinInstance.balanceOf(accounts[0]);
    assert.equal(balance.toString(), (await xyzCoinInstance.totalSupply()).toString());
  });

  it("should transfer tokens", async () => {
    await xyzCoinInstance.transfer(accounts[1], 100, { from: accounts[0] });
    const balance = await xyzCoinInstance.balanceOf(accounts[1]);
    assert.equal(balance.toString(), "100");
  });

  it("should correctly set and read allowance", async () => {
    await xyzCoinInstance.approve(accounts[1], 200, { from: accounts[0] });
    const allowance = await xyzCoinInstance.allowance(accounts[0], accounts[1]);
    assert.equal(allowance.toString(), "200");
  });

  it("should transfer tokens on behalf of another account", async () => {
    await xyzCoinInstance.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] });
    const balance = await xyzCoinInstance.balanceOf(accounts[2]);
    assert.equal(balance.toString(), "50");
  });
});
