import { GaugeCreated as GaugeCreatedEvent } from "../generated/Voter/Voter";
import { Gauge } from "../generated/templates";
import { Gauge as GaugeEntity } from "../generated/schema";

export function handleGaugeCreated(event: GaugeCreatedEvent): void {
  let gauge = GaugeEntity.load(event.params.gauge);
  if (gauge == null) {
    gauge = new GaugeEntity(event.params.gauge);
    gauge.creator = event.params.creator;
    gauge.external_bribe = event.params.external_bribe;
    gauge.pool = event.params.pool;
    gauge.save();
  }

  Gauge.create(event.params.gauge);
}
