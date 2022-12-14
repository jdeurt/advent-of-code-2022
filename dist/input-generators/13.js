import { makeInput } from "../util/make-input.js";
const PAIR_COUNT = 1000;
const PACKET_ITEM_MAX_VALUE = 10;
const PACKET_LEN_MIN = 70;
const PACKET_LEN_MAX = 100;
const SUBPACKET_LEN_MAX = 10;
const SUBPACKET_RATIO = 0.3;
const MAX_PACKET_DEPTH = 10;
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getPacketLen = () => rand(PACKET_LEN_MIN, PACKET_LEN_MAX);
const getSubpacketLen = () => rand(0, SUBPACKET_LEN_MAX);
const shouldMakeSubpacket = (currDepth) => currDepth <= MAX_PACKET_DEPTH && Math.random() < SUBPACKET_RATIO;
const makeSubpacket = (depth) => {
    const len = getSubpacketLen();
    const subpacket = [];
    for (let i = 0; i < len; i++) {
        if (shouldMakeSubpacket(depth)) {
            subpacket.push(makeSubpacket(depth + 1));
        }
        else {
            subpacket.push(rand(0, PACKET_ITEM_MAX_VALUE));
        }
    }
    return subpacket;
};
const pairs = [];
for (let i = 0; i < PAIR_COUNT; i++) {
    const pair = [[], []];
    for (let i = 0; i < 2; i++) {
        const currPacket = [];
        for (let i = 0; i < getPacketLen(); i++) {
            if (shouldMakeSubpacket(0)) {
                currPacket.push(makeSubpacket(1));
            }
            else {
                currPacket.push(rand(0, PACKET_ITEM_MAX_VALUE));
            }
        }
        pair[i] = currPacket;
    }
    pairs.push(pair);
}
makeInput(13, pairs
    .map((pair) => pair.map((packet) => JSON.stringify(packet)).join("\n"))
    .join("\n\n"));
