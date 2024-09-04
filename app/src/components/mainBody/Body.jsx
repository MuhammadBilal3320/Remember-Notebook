import { Box, Button, Container, Input, Stack, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import CardContainer from './CardContainer'
import BodyContext from '../../useContext/BodyContext'
import EditModal from './EditModal'
import { ToastContainer } from 'react-toastify'

const Body = () => {

    const { isFocused, setIsFocused, addNewNote } = useContext(BodyContext);
    const [createNote, setCreateNote] = useState({ title: "", description: "", tag: "" });
    const [editModal, setEditModal] = useState(false);


    const handleChild = (e) => {
        e.stopPropagation();
        setIsFocused(true);
    }

    const handleParent = () => {
        setIsFocused(false);
    }

    const onChange = (event) => {
        setCreateNote({ ...createNote, [event.target.name]: event.target.value }); //-----> fetch Data from input field and assign to createNote State
    }

    const handleCreateClick = (event) => {
        event.preventDefault();
        addNewNote(createNote.title, createNote.description, createNote.tag);
        setCreateNote({ title: "", description: "", tag: "" });
        setIsFocused(false);
    }


    return (
        <Stack onClick={handleParent} display={"flex"} flexDirection={"column"} width={"100%"} alignItems={"center"} justifyContent={"center"} height={'cal(100vh-80px)'} >

            <Container onClick={handleChild} display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"30px 0"} maxW={"700px"} padding={"25px"}>
                <Box height={isFocused ? "" : "60px"} transition={"height 0.3s ease-in-out"} overflow={"hidden"} shadow={"0px 1px 5px 0px black"} borderRadius={"10px"} padding={"10px"} display={"flex"} gap={"20px"} alignItems={"center"} flexDirection={"column"}>
                    <Box>
                        <Input onFocus={() => setIsFocused(true)} display={isFocused ? "block" : "none"} fontSize={"18px"} fontWeight={"600"} height={"42px"} width={"600px"} padding={"10px"} border={"none"} _focus={{ outline: "none" }} placeholder='Title' name='title' value={createNote.title} onChange={onChange} />
                        <Textarea onFocus={() => setIsFocused(true)} resize={"none"} height={"100px"} width={"600px"} padding={"10px"} border={"none"} _focus={{ outline: "none" }} _placeholder={{ color: "black" }} placeholder='Create New Note' name='description' value={createNote.description} onChange={onChange} />
                    </Box>
                    <Box display={isFocused ? "flex" : "none"} justifyContent={"space-around"} alignItems={"center"}>
                        <Input onFocus={() => setIsFocused(true)} width={"300px"} padding={"10px"} border={"none"} _focus={{ outline: "none" }} _placeholder={{ color: "black" }} placeholder='Tags' name='tag' value={createNote.tag} onChange={onChange} />
                        <Box display={isFocused ? "block" : "none"}>
                            <Button type='submit' onClick={handleCreateClick} shadow="0px 1px 5px 0px black" width={"250px"} display={isFocused ? "block" : "none"} borderRadius={"10px"} fontSize={"18px"} fontWeight={"700"} bg={"black"} color={"white"} border={"none"} padding={"5px"} transition={"all 0.3s"} transform={"scale(0.9)"} cursor={"pointer"} _hover={{ transform: "scale(1)", transition: "all 0.3s" }} >CREATE</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Container onClick={() => setIsFocused(false)} display={"flex"} flexWrap={"wrap"} height={"450px"} maxHeight={"450px"} width={"90%"} maxW={"90%"}>
                <CardContainer setEditModal={setEditModal} />
            </Container>

            <EditModal editModal={editModal} setEditModal={setEditModal} />
            <ToastContainer style={{width:350}} position="bottom-center" />

        </Stack>
    )
}

export default Body
