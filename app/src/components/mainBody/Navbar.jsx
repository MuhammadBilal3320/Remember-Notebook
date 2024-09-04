import { Flex, Icon, Text, HStack, Box, Input } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import BodyContext from '../../useContext/BodyContext';
import LogoutButton from './LogoutButton';


const Navbar = () => {

    const { setIsFocused, setNotesChanger, notesCollection } = useContext(BodyContext);


    const handleSearch = (event) => {
        const value = event.target.value;
    
        if (value === "") {
            setNotesChanger(notesCollection); // Reset to original notes when search input is cleared
            return;
        } 
        
        else {
            
            const filteredData = notesCollection.filter((note) => 
                note.title.toLowerCase().includes(value.toLowerCase()) ||  note.tag.toLowerCase().includes(value.toLowerCase()) //-----> This is for filtering the notes based on the search input (title and tag)
        ) 

            setNotesChanger(filteredData);
            return filteredData;
        }
    };
    

    const LogoutIcon = () => (
        <svg viewBox="0 0 512 512" width="17px" fill="white">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
        </svg>
    );

    return (
        <HStack onClick={() => setIsFocused(false)} justifyContent={'space-around'} height={"70px"} bg={"#f7f7f7"} padding={"10px"}  >

            <Flex>
                <Flex flexDirection={"column"} lineHeight={"25px"} justifyContent={"space-around"} alignItems={"center"} >
                    <Text cursor={"pointer"} fontSize={"25px"} fontWeight={"800"}>REME<b style={{ fontSize: "25px", fontWeight: "800", color: "#e94b3c" }}>MB</b>ER</Text>
                    <Text cursor={"pointer"} fontSize={"25px"} fontWeight={"800"}>NOTEBOOK</Text>
                </Flex>
            </Flex>

            <Box marginLeft={"50px"} border={"none"} position={"relative"} display={"flex"}>
                <Input onChange={handleSearch} border={"none"} shadow={"0px 1px 5px 0px black"} borderRadius={"30px"} padding={"5px 60px"} fontSize={"20px"} fontWeight={"600"} type="text" placeholder='Search' width={"500px"} height={"40px"} _focus={{ outline: "none" }} />
                <Icon position={"absolute"} left={"15px"} top={"5"} as={FaSearch} fontSize={"30px"} />
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"200px"}><LogoutButton title={"LOGOUT"} logoColor={"rgb(233, 75, 60)"} icon={<LogoutIcon />} /></Box>

            {/* <Button fontSize={"20px"} fontWeight={"700"} color={'white'} bg={"black"} borderRadius={"30px"} padding={"5px 10px"} transform={("scale(0.9)")} cursor={"pointer"} transition={"all 0.3s"} _hover={{color:"#e94b3c", transform:("scale(1)"), transition:"all 0.3s"}} rightIcon={<Icon as={RiLogoutCircleRFill} fontSize={"30px"}/>}>LOG OUT</Button> */}

        </HStack>
    )
}

export default Navbar
