import { StaticImageData } from "next/image";
import EthIcon from "./img/etherLogo.png";
import UsdcIcon from "./img/usd-coin-usdc-logo.png";
export type TokenOptions = {
  label: string;
  icon: StaticImageData;
  value?: string;
};
export const tokenOptions: TokenOptions[] = [
  { value: undefined, label: "ETH", icon: EthIcon },
  {
    value: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    label: "USDC",
    icon: UsdcIcon,
  },
];
