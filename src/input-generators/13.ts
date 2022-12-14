import { makeInput } from "../util/make-input.js";

interface Packet extends Array<unknown> {
    readonly [n: number]: number | Packet;
}

const PAIR_COUNT = 500;
const PACKET_ITEM_MAX_VALUE = 10;
const PACKET_LEN_MIN = 80;
const PACKET_LEN_MAX = 100;
const SUBPACKET_LEN_MAX = 5;
const SUBPACKET_RATIO = 0.3;
const MAX_PACKET_DEPTH = 10;

const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getPacketLen = () => rand(PACKET_LEN_MIN, PACKET_LEN_MAX);
const getSubpacketLen = () => rand(0, SUBPACKET_LEN_MAX);

const shouldMakeSubpacket = (currDepth: number) =>
    currDepth <= MAX_PACKET_DEPTH && Math.random() < SUBPACKET_RATIO;

const makeSubpacket = (depth: number) => {
    const len = getSubpacketLen();

    const subpacket: Packet = [];

    for (let i = 0; i < len; i++) {
        if (shouldMakeSubpacket(depth)) {
            subpacket.push(makeSubpacket(depth + 1));
        } else {
            subpacket.push(rand(0, PACKET_ITEM_MAX_VALUE));
        }
    }

    return subpacket;
};

const pairs: [Packet, Packet][] = [];

for (let i = 0; i < PAIR_COUNT; i++) {
    const pair: [Packet, Packet] = [[], []];

    for (let i = 0; i < 2; i++) {
        const currPacket: Packet = [];

        for (let i = 0; i < getPacketLen(); i++) {
            if (shouldMakeSubpacket(0)) {
                currPacket.push(makeSubpacket(1));
            } else {
                currPacket.push(rand(0, PACKET_ITEM_MAX_VALUE));
            }
        }

        pair[i] = currPacket;
    }

    pairs.push(pair);
}

makeInput(
    13,
    pairs
        .map((pair) =>
            pair.map((packet: any) => JSON.stringify(packet)).join("\n")
        )
        .join("\n\n")
);
