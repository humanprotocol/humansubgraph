import { BigInt } from "@graphprotocol/graph-ts";
import {
  HMToken,
  Approval,
  Transfer,
  BulkApproval,
  BulkTransfer,
<<<<<<< HEAD
} from "../../generated/HMToken/HMToken";
import { HMBulkTransferEvent, HMTransferEvent } from "../../generated/schema";
=======
} from "../generated/HMToken/HMToken";
import { HMBulkTransferEvent, HMTransferEvent } from "../generated/schema";
>>>>>>> 4831e9f9c7921ad218c07da1466b492341dcaf50

export function handleTransfer(event: Transfer): void {
  let entity = HMTransferEvent.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  if (!entity) {
    entity = new HMTransferEvent(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
  }
  entity.token = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  entity.block = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.transaction = event.transaction.hash;

  entity.save();
}

export function handleBulkTransfer(event: BulkTransfer): void {

  let entity = HMBulkTransferEvent.load(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  if (!entity) {
    entity = new HMBulkTransferEvent(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
  }

  entity.bulkCount = event.params._bulkCount;
  entity.txId = event.params._txId;

  entity.block = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.transaction = event.transaction.hash;

  entity.save();
}

export function handleBulkApproval(event: BulkApproval): void {}
<<<<<<< HEAD
export function handleApproval(event: Approval): void {}
=======
export function handleApproval(event: Approval): void {}
>>>>>>> 4831e9f9c7921ad218c07da1466b492341dcaf50
