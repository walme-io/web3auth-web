import { CHAIN_NAMESPACES, CONNECTOR_NAMESPACES } from "./constants";

// eip155 for all evm chains
export type ChainNamespaceType = (typeof CHAIN_NAMESPACES)[keyof typeof CHAIN_NAMESPACES];

// eip155 for all evm chains
export type ConnectorNamespaceType = (typeof CONNECTOR_NAMESPACES)[keyof typeof CONNECTOR_NAMESPACES];

export type ChainBlockExplorer = {
  name: string;
  url: string;
  apiUrl?: string | undefined;
};

export type ChainContract = {
  address: string;
  blockCreated?: number | undefined;
};

export type ChainNativeCurrency = {
  name: string;
  /** 2-6 characters long */
  symbol: string;
  decimals: number;
};

export type ChainRpcUrls = {
  http: readonly string[];
  webSocket?: readonly string[] | undefined;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & Record<string, unknown>;

export interface CustomChainConfig {
  chainNamespace: ChainNamespaceType;
  logo?: string | undefined;
  /** Collection of block explorers */
  blockExplorers?:
    | {
        [key: string]: ChainBlockExplorer;
        default: ChainBlockExplorer;
      }
    | undefined;

  /** Collection of contracts */
  contracts?:
    | Prettify<
        {
          [key: string]: ChainContract | { [sourceId: number]: ChainContract | undefined } | undefined;
        } & {
          ensRegistry?: ChainContract | undefined;
          ensUniversalResolver?: ChainContract | undefined;
          multicall3?: ChainContract | undefined;
        }
      >
    | undefined;
  /** ID in number form */
  id: number;
  /** Human-readable name */
  name: string;
  /** Currency used by chain */
  nativeCurrency: ChainNativeCurrency;
  /** Collection of RPC endpoints */
  rpcUrls: {
    [key: string]: ChainRpcUrls;
    default: ChainRpcUrls;
  };
  /** Source Chain ID (ie. the L1 chain) */
  sourceId?: number | undefined;
  /** Flag for test networks */
  testnet?: boolean | undefined;
}