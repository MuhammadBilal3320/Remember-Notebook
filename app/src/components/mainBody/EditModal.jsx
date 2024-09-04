import { Flex, Icon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Box, Button, Container, Input, Textarea } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import { RiCloseCircleFill } from "react-icons/ri";
import BodyContext from '../../useContext/BodyContext';

const EditModal = ({ editModal, setEditModal }) => {

    const { editNote, setEditNote, updateNote} = useContext(BodyContext);

    const onChange = (event)=>{
        setEditNote({ ...editNote, [event.target.name]: event.target.value }); //-----> fetch Data from input field and assign to createNote State
    }

    const handleEditClick = ()=>{
        updateNote(editNote.id, editNote.editTitle, editNote.editDescription,  editNote.editTag);
        setEditModal(false);
    }

    const handleChild = (e) => {
        e.stopPropagation();
    };

    const handleParent = () => {
        setEditModal(false);
    };

    return createPortal(
        <Flex
            onClick={handleParent}
            display={editModal ? "flex" : "none"}
            bg={"#a7a3a38c"}
            position={"fixed"}
            top={"0"}
            justifyContent={"center"}
            alignItems={'center'}
            height={"100vh"}
            width={"100%"}
        >
            <Container
                bg={"white"}
                onClick={handleChild}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                maxW={"700px"}
            >
                <Box
                    position={"relative"}
                    transition={"height 0.3s ease-in-out"}
                    overflow={"hidden"}
                    shadow={"0px 1px 5px 0px black"}
                    borderRadius={"10px"}
                    padding={"10px"}
                    display={"flex"}
                    gap={"20px"}
                    alignItems={"center"}
                    flexDirection={"column"}
                >
                    <Button
                        onClick={() => setEditModal(false)}
                        position={"absolute"}
                        top={"0"}
                        right={"0"}
                        width={"35px"}
                        height={"30px"}
                        border={'none'}
                        borderRadius={"20px"}
                        margin={"10px"}
                        cursor={"pointer"}
                        fontWeight={"700"}
                        fontSize={"12px"}
                        _hover={{ transform: "scale(1.1)" }}
                    >
                        <Icon as={RiCloseCircleFill} color={"rgb(233, 75, 60)"} fontSize={"35px"} />
                    </Button>
                    <Box>
                        <Input
                            fontSize={"18px"}
                            fontWeight={"600"}
                            height={"42px"}
                            width={"600px"}
                            padding={"10px"}
                            border={"none"}
                            _focus={{ outline: "none" }}
                            placeholder='Title'
                            value={editNote.editTitle}
                            name='editTitle'
                            onChange={onChange}
                        />
                        <Textarea
                            resize="none"
                            height="100px"
                            width="600px"
                            padding="10px"
                            border="none"
                            _focus={{ outline: "none" }}
                            _placeholder={{ color: "black" }}
                            placeholder='Create New Note'
                            name='editDescription'
                            value={editNote.editDescription}
                            onChange={onChange}
                        />
                    </Box>
                    <Box display="flex" justifyContent={"space-around"} alignItems={"center"}>
                        <Input
                            width={"300px"}
                            padding={"10px"}
                            border={"none"}
                            _focus={{ outline: "none" }}
                            _placeholder={{ color: "black" }}
                            placeholder='Tags'
                            name='editTag'
                            value={editNote.editTag}
                            onChange={onChange}
                        />
                        <Box>
                            <Button
                                onClick={handleEditClick}
                                shadow="0px 1px 5px 0px black"
                                width={"250px"}
                                borderRadius={"10px"}
                                fontSize={"18px"}
                                fontWeight={"700"}
                                bg={"black"}
                                color={"white"}
                                border={"none"}
                                padding={"5px"}
                                transition={"all 0.3s"}
                                transform={"scale(0.9)"}
                                cursor={"pointer"}
                                _hover={{ transform: "scale(1)", transition: "all 0.3s" }}
                            >
                                SAVE
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Flex>,
        document.querySelector(".editModal")
    );
};

export default EditModal;
