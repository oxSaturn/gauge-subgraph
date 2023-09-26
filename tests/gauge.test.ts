import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleClaimRewards } from "../src/gauge";
import { createClaimRewardsEvent } from "./gauge-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

const reward1 = "0x0000000000000000000000000000000000000002"
const reward2 = "0x0000000000000000000000000000000000000003"

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001");
    let reward = Address.fromString(
      reward1
    );
    let amount = BigInt.fromI32(234);
    let newClaimRewardsEvent = createClaimRewardsEvent(from, reward, amount);
    handleClaimRewards(newClaimRewardsEvent);

    handleClaimRewards(
      createClaimRewardsEvent(
        from,
        reward,
        BigInt.fromI32(123),
        BigInt.fromI32(1)
      )
    );

    handleClaimRewards(
      createClaimRewardsEvent(
        from,
        Address.fromString(reward2),
        BigInt.fromI32(256),
        BigInt.fromI32(2)
      )
    );
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClaimedReward created and stored", () => {
    assert.entityCount("ClaimedReward", 3);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClaimedReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a00000000",
      "from",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "ClaimedReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a00000000",
      "reward",
      reward1
    );
    assert.fieldEquals(
      "ClaimedReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a00000000",
      "amount",
      "234"
    );

    assert.entityCount("ClaimedRewardInTotal", 2);
    assert.fieldEquals(
      "ClaimedRewardInTotal",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a0000000000000000000000000000000000000002",
      "total",
      "357"
    );
    assert.fieldEquals(
      "ClaimedRewardInTotal",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a0000000000000000000000000000000000000003",
      "total",
      "256"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
