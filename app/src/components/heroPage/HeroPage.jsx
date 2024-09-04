import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HeroPage = () => {
    return (
        <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} bg={"linear-gradient(90deg, #1CB5E0 0%, #000851 100%)"}>
            <Text color={"white"} fontSize={"50px"} textTransform={"uppercase"} fontWeight={"900"}  borderRadius={"25px"} as={"h4"}>Your Personal Digital Notebook</Text>

            <HStack shadow={"0px 2px 20px 0px black"} padding={"40px"} borderRadius={"30px"} display={"flex"} justifyContent={"space-between"} alignContent={"center"} maxW={"80%"} height={"75%"} bg={"linear-gradient(90deg, #d53369 0%, #daae51 100%)"} >

                <Stack display={"flex"} flexDirection={"column"} spacing={"50px"}>
                    <Text fontSize={"80px"} fontWeight={"800"} lineHeight={"70px"} width={"700px"} color={"whiteSmoke"} as={"h1"}><b style={{ color: "black", fontWeight: "900" }}>CAPTURE</b> EVERY THOUGHT, ANYWHERE, ANY<b style={{ color: "black", fontWeight: "900" }}>TIME</b></Text>
                    <Stack >
                        <Text color={"#ffffffc7"} fontSize={"15px"} fontWeight={"600"} as={"h4"}>Easily organize your ideas, notes, and thoughts all in one place. Whether you're quickly writing down ideas or planning a project, Our Easy-to-use interface keeps everything within reach. Stay creative and productive.</Text>
                    </Stack>

                    <HStack display={"flex"} justifyContent={"end"} gap={"30px"} width={"500px"} height={"100px"}>
                        <Link to={"/signIn"}><Button shadow={"-1px 4px 8px 0px #252525"} scale={"1"} cursor={"pointer"} bg={"linear-gradient(90deg, #000000 0%, #000851 100%)"} color={"white"} width={"180px"} height={"40px"} transition="all 0.5s" borderRadius={"30px"} border={"none"} fontSize={"25px"} fontWeight={"700"} transform="scale(1)" _hover={{ transform: "scale(1.1)", transition: "all 0.5s" }}>LOGIN</Button></Link>
                        <Link to={"/signUp"}><Button shadow={"-1px 4px 8px 0px #252525"} scale={"1"} cursor={"pointer"} bg={"linear-gradient(90deg, #000000 0%, #000851 100%)"} color={"white"} width={"180px"} height={"40px"} transition="all 0.5s" borderRadius={"30px"} border={"none"} fontSize={"25px"} fontWeight={"700"} transform="scale(1)" _hover={{ transform: "scale(1.1)", transition: "all 0.5s" }}>SIGN UP</Button></Link>
                    </HStack>
                </Stack>

                <Stack display={"flex"} justifyContent={"end"} alignContent={"center"}>
                    <img src="./images/heroImage.png" alt="This is image" height={"800px"} width={"800px"} />
                </Stack>

            </HStack>

        </Flex>
    )
}

export default HeroPage
