import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { ClaimRewards } from "../generated/templates/Gauge/Gauge";

export function createClaimRewardsEvent(
  from: Address,
  reward: Address,
  amount: BigInt,
  logIndex: BigInt = new BigInt(0)
): ClaimRewards {
  let claimRewardsEvent = changetype<ClaimRewards>(newMockEvent());

  claimRewardsEvent.logIndex = logIndex;

  claimRewardsEvent.parameters = new Array();

  claimRewardsEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromAddress(reward))
  );
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return claimRewardsEvent;
}
