import { Box, Button, Flex, FormControl, HStack, Icon, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';




const SignUp = () => {

    const navigate = useNavigate();


    const hostURL = "http://localhost:8000";

    const handleSubmit = async (values) => {
        const response = await fetch(`${hostURL}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: values.name,  email: values.email, password: values.password }),
        })
        const data = await response.json();
        console.log(data)

        if (data.success) {
            navigate("/registerSuccessful");
        }
    }


    const initialValues = {
        name:'',
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
        .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    return (
        <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} bg={"linear-gradient(90deg, #1CB5E0 0%, #000851 100%)"}>

            <Text fontSize={"40px"} color={"whitesmoke"} fontWeight={"900"} as={"h1"}>REMEMBER NOTEBOOK</Text>
            <HStack shadow={"0px 2px 20px 0px black"} padding={"60px"} borderRadius={"30px"} display={"flex"} flexDirection={"column"} gap={"40px"} justifyContent={"space-between"} alignContent={"center"} bg={"linear-gradient(90deg, #d53369 0%, #daae51 100%)"} >

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Text color={"white"} fontSize={"50px"} textTransform={"uppercase"} fontWeight={"900"} borderRadius={"25px"} as={"h1"}>SIGN UP</Text>
                    <Text fontSize={"15px"} fontWeight={"600"} color={"#ffffffbd"} >Enter your Details and Create New Account.</Text>
                </Box>


                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>

                    {({ isSubmitting, errors, touched }) => (
                        <Form>

                            <Stack display={"flex"} flexDirection={"column"} gap={"35px"}>
                                <FormControl position={"relative"}>
                                    <Icon position={"absolute"} color={"white"} left={"5px"} top={"8px"} fontSize={"35px"} as={FaUser} _focus={{ color: "blue" }} />
                                    <Field as={Input} name="name" type="text" color={"white"} width={"500px"} paddingLeft={"50px"} height={"50px"} borderRadius={"8px"} outline={"2px solid white"} border={"none"} fontSize={"20px"} fontWeight={"600"} zIndex={"1"} bg={"transparent"}  placeholder={"NAME"} _placeholder={{ color: "whiteSmoke" }} _focus={{ outline: "3px solid black" }} />
                                    {errors.name && touched.name ? (
                                        <Text color="white" marginLeft={"30px"} marginTop={"5px"} fontSize="18px">{errors.name}</Text>
                                    ) : null}
                                </FormControl>

                                <FormControl position={"relative"}>
                                    <Icon position={"absolute"} color={"white"} left={"5px"} top={"8px"} fontSize={"35px"} as={MdEmail} _focus={{ color: "blue" }} />
                                    <Field as={Input} name="email" type="text" color={"white"} width={"500px"} paddingLeft={"50px"} height={"50px"} borderRadius={"8px"} outline={"2px solid white"} border={"none"} fontSize={"20px"} fontWeight={"600"} zIndex={"1"} bg={"transparent"}  placeholder={"EMAIL"} _placeholder={{ color: "whiteSmoke" }} _focus={{ outline: "3px solid black" }} />
                                    {errors.email && touched.email ? (
                                        <Text color="white" marginLeft={"30px"} marginTop={"5px"} fontSize="18px">{errors.email}</Text>
                                    ) : null}
                                </FormControl>

                                <FormControl position={"relative"}>
                                    <Icon position={"absolute"} color={"white"} left={"5px"} top={"8px"} fontSize={"35px"} as={RiLockPasswordFill} _focus={{ color: "blue" }} />
                                    <Field as={Input} name="password" type="password" color={"white"} width={"500px"} paddingLeft={"50px"} height={"50px"} borderRadius={"8px"} outline={"2px solid white"} border={"none"} fontSize={"20px"} fontWeight={"600"} zIndex={"1"} bg={"transparent"}  placeholder={"PASSWORD"} _placeholder={{ color: "whiteSmoke" }} _focus={{ outline: "3px solid black" }} />
                                    {errors.password && touched.password ? (
                                        <Text color="white" marginLeft={"30px"} marginTop={"5px"} fontSize="18px">{errors.password}</Text>
                                    ) : null}
                                </FormControl>

                                <FormControl position={"relative"}>
                                    <Icon position={"absolute"} color={"white"} left={"5px"} top={"8px"} fontSize={"35px"} as={RiLockPasswordFill} _focus={{ color: "blue" }} />
                                    <Field as={Input} name="confirmPassword" type="password" color={"white"} width={"500px"} paddingLeft={"50px"} height={"50px"} borderRadius={"8px"} outline={"2px solid white"} border={"none"} fontSize={"20px"} fontWeight={"600"} zIndex={"1"} bg={"transparent"}  placeholder={"CONFIRM PASSWORD"} _placeholder={{ color: "whiteSmoke" }} _focus={{ outline: "3px solid black" }} />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <Text color="white" marginLeft={"30px"} marginTop={"5px"} fontSize="18px">{errors.confirmPassword}</Text>
                                    ) : null}
                                </FormControl>

                                <Stack display="flex" justifyContent={"center"} alignItems={"center"} gap={"20px"} width={"100%"}>
                                    <Button type="submit" isLoading={isSubmitting} shadow={"-1px 4px 8px 0px #252525"} scale={"1"} cursor={"pointer"} bg={"whiteSmoke"} color={"black"} width={"400px"} height={"40px"} transition="all 0.5s" borderRadius={"30px"} border={"none"} fontSize={"25px"} fontWeight={"700"} transform="scale(1)" _hover={{ transform: "scale(1.1)", transition: "all 0.5s" }}>SIGN UP</Button>
                                    <Box display={"flex"} gap={"5px"} fontWeight={"700"} width={"full"}>Already have an account? <Link to={"/signIn"}><Text fontWeight={"800"} color={"purple"}>Log In</Text></Link> </Box>
                                </Stack>

                            </Stack>

                        </Form>
                    )}
                </Formik>

            </HStack>
        </Flex>
    )
}

export default SignUp
