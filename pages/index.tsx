import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import Interface from "../components/Interface";
import styles from "../styles/Home.module.css";
import { FaGithub } from "react-icons/fa";
export type Props = {
  ethPrice: number;
};
const Home = (props: Props) => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 Payments App</title>
        <meta
          name="description"
          content="Created by https://github.com/ephcrat"
        />
      </Head>

      <div className={styles.main}>
        <ConnectButton />
        {isConnected && <Interface ethPrice={props.ethPrice} />}
      </div>

      <footer className={styles.footer}>
        <p>Made with ❤️ by Alejandro Hernández</p>
        <a
          href="https://github.com/ephcrat/web3payments"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </footer>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    "http://api.coingecko.com/api/v3/coins/ethereum"
  );
  const ethPrice = await response.json()
  return {
    props: {
      ethPrice: ethPrice.market_data.current_price.usd,
    },
  };
};
export default Home;
