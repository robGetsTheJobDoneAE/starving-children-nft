import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Tap", function () {
  async function deployTap() {
    const Tap = await ethers.getContractFactory("Tap");
    const tap = await Tap.deploy();

    await tap.deployed();

    console.log("Lock with 1 ETH deployed to:", tap.address);

    const [owner, otherAccount] = await ethers.getSigners();
    return { tap, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should create supply", async function () {
      const { otherAccount, owner, tap } = await loadFixture(deployTap);

      expect(await tap.totalSupply()).to.equal(BigInt(10000000000000000000000));
    });
    it("Should create supply and transfer", async function () {
      const { otherAccount, owner, tap } = await loadFixture(deployTap);

      expect(await tap.totalSupply()).to.equal(BigInt(10000000000000000000000));
      expect(await tap.balanceOf(otherAccount.address)).to.equal(BigInt(0));
      expect(await tap.balanceOf(owner.address)).to.equal(
        BigInt(10000000000000000000000)
      );

      await tap.transfer(otherAccount.address, 10, { from: owner.address });
      expect(await tap.balanceOf(otherAccount.address)).to.equal(BigInt(10));
    });
  });
  it("Should give ten coins when calling faucet", async function () {
    const { otherAccount, owner, tap } = await loadFixture(deployTap);

    expect(await tap.totalSupply()).to.equal(BigInt(10000000000000000000000));
    expect(await tap.balanceOf(otherAccount.address)).to.equal(BigInt(0));
    expect(await tap.balanceOf(owner.address)).to.equal(
      BigInt(10000000000000000000000)
    );

    await tap.transfer(otherAccount.address, 10, { from: owner.address });
    expect(await tap.balanceOf(otherAccount.address)).to.equal(BigInt(10));
    await tap.connect(otherAccount).requestTokens();
    expect(await tap.balanceOf(otherAccount.address)).to.equal(BigInt(20));
  });
});
