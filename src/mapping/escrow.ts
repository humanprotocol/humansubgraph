import { BigInt } from "@graphprotocol/graph-ts"
import {
  Escrow,
  IntermediateStorage,
  Pending,
  StoreResultsCall
} from "../generated/templates/Escrow/Escrow"
import { ethereum } from '@graphprotocol/graph-ts'
import { ISEvent, PEvent} from "../generated/schema"

export function handleIntermediateStorage(event: IntermediateStorage): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.from.toHex() + event.address.toHex()
  let entity = ISEvent.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ISEvent(id)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._url = event.params._url
  entity._hash = event.params._hash

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handlePending(event: Pending): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.from.toHex() + event.address.toHex()
  let entity = PEvent.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new PEvent(id)
    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._url = event.params.manifest
  entity._hash = event.params.hash

  // Entities can be written to the store with `.save()`
  entity.save()
}

