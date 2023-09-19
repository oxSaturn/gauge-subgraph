import { ClaimRewards as ClaimRewardsEvent, Gauge } from "../generated/templates/Gauge/Gauge";
import { ClaimedReward, ClaimedRewardInTotal } from "../generated/schema";

export function handleClaimRewards(event: ClaimRewardsEvent): void {
  let entity = new ClaimedReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.reward = event.params.reward;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.contract = event.address;

  entity.save();

  // contract address + reward token address
  const id = event.address.concat(event.params.reward);
  let claimedRewardInTotal = ClaimedRewardInTotal.load(id);
  if (claimedRewardInTotal == null) {
    claimedRewardInTotal = new ClaimedRewardInTotal(id);
    claimedRewardInTotal.total = event.params.amount;
    claimedRewardInTotal.contract = event.address;
    claimedRewardInTotal.rewardToken = event.params.reward;
  } else {
    claimedRewardInTotal.total = claimedRewardInTotal.total.plus(
      event.params.amount
    );
  }
  claimedRewardInTotal.save();
}

