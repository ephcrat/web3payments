import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { parseEther } from "ethers/lib/utils";
import React from "react";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { Props } from "../pages";

const Interface = ({ ethPrice }: Props) => {
  const address = "0xc839b7c702C88e88dd31a29A942fB0dB59a00B06";
  const subAmount = "5";
  const priceInEth = (Number(subAmount) / ethPrice).toFixed(6).toString();
  const { config } = usePrepareSendTransaction({
    request: {
      to: address,
      value: parseEther(priceInEth),
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  //Wait for payment (ether or custom) to be completed
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash, //transaction hash
  });

  return (
    <Box
      w="26rem"
      mx="auto"
      mt="1.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem"
      bg="#D1DFE3"
      pb={5}
      pl={1}
    >
      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0"
      >
        <Flex color="black" fontWeight="500">
          <Text ml={1}>1 ETH = USD {ethPrice}</Text>
        </Flex>
      </Flex>
      <Box p="0.5rem" borderRadius="0 0 1.37rem 1.37rem">
        <Flex>
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendTransaction?.();
              }}
            >
              <FormControl>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="#f7f8fa"
                  pos="relative"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Input
                    color="black"
                    aria-label="Recipient"
                    value={address}
                    fontWeight="500"
                    width="100%"
                    size="1rem"
                    textAlign="right"
                    outline="none"
                    border="none"
                    focusBorderColor="none"
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="#f7f8fa"
                  pos="relative"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  mt="0.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Input
                    fontSize="36px"
                    width="100%"
                    size="19rem"
                    textAlign="left"
                    outline="none"
                    border="none"
                    focusBorderColor="none"
                    color="black"
                    aria-label="Amount (ether)"
                    value={priceInEth}
                  />
                  <Box
                    w={215}
                    boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
                    borderRadius="1.37rem"
                    bg="#D1DFE3"
                  ></Box>
                </Flex>
                <Box mt="0.5rem">
                  <Button
                    disabled={isLoading || isSuccess}
                    type={"submit"}
                    color="white"
                    bg="rgb(255,140,0)"
                    width="100%"
                    p="1.62rem"
                    borderRadius="1.25rem"
                    _hover={{ bg: "rgb(255,165,0)" }}
                  >
                    {isLoading ? "Sending Payment..." : "Send Payment"}
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Flex>
        {isSuccess && (
          <Flex color="black" mt={7} mb={7} textAlign="center">
            Successfully paid {priceInEth} ETH to {address}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Interface;
