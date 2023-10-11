import { BoostedSale } from "../generated/schema";
import { Boosted as BoostedEvent } from "../generated/MaastaBoost/MaastaBoost";

export function handleBoosted(event: BoostedEvent): void {
  let sale = new BoostedSale(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  sale.timestamp = event.params._timestamp;
  sale.totalLocked = event.params._totalLocked;
  sale.locker = event.params._locker;
  sale.save();
}
