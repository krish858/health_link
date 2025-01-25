import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/c2133b9a81b04e95a88f34e405c52acd"
);
const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "from",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "to",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "prescription",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "healthlinkRecorded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_from",
        type: "string",
      },
      {
        internalType: "string",
        name: "_to",
        type: "string",
      },
      {
        internalType: "string",
        name: "_prescription",
        type: "string",
      },
    ],
    name: "addRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecords",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "from",
            type: "string",
          },
          {
            internalType: "string",
            name: "to",
            type: "string",
          },
          {
            internalType: "string",
            name: "prescription",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct healthlinkRecord.Record[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recordCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "records",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "from",
        type: "string",
      },
      {
        internalType: "string",
        name: "to",
        type: "string",
      },
      {
        internalType: "string",
        name: "prescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
