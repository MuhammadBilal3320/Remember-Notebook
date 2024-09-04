import { Box, Button, Card, Container, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterSuccessful = () => {
    return (

        <Container display={"flex"} alignItems={"center"} height={"100vh"} bg={"linear-gradient(90deg, #1CB5E0 0%, #000851 100%)"}>
            <Card maxW="30%" mx="auto" p={"25px"} borderRadius={"15px"} shadow={"0px 2px 20px 0px black"} bg={"linear-gradient(90deg, #d53369 0%, #daae51 100%)"}>
                <VStack gap={"20px"}>
                    <Icon as={FaCircleCheck} fontSize={"50px"} color={"#00a170"} />
                    <Heading as="h2" size="lg">Successfully Registration</Heading>
                    <Text textAlign={"center"} fontSize={"15px"} color={"white"}>Hurray! You have successfully created your account. Enter the app to explore all it’s features.</Text>
                    <Box width="full"><Link to={"/signIn"}><Button bg={"#ffc700"} border={"none"} fontSize={"20px"} borderRadius={"50px"} fontWeight={"700"} transition={"all 0.3s"} transform={"scale(0.9)"} cursor={"pointer"} _hover={{ bg: "#ffa700", transition:"all 0.3s", transform:"scale(1)"}} height={"40px"} width={"300px"}>Login Account</Button></Link></Box>
                </VStack>
            </Card>
        </Container>
    )
}

export default RegisterSuccessful