import { BigInt } from "@graphprotocol/graph-ts"
import {
  EscrowFactory,
  Launched
} from "../generated/EscrowFactory/EscrowFactory"
import { EscrowFactory } from "../generated/schema"
import { Escrow } from "../generated/templates"

export function handleLaunched(event: Launched): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = EscrowFactory.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new EscrowFactory(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.eip20 = event.params.eip20
  entity.escrow = event.params.escrow

  // Entities can be written to the store with `.save()`
  entity.save()
  Escrow.create(event.params.escrow)

}
