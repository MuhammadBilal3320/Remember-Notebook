import { Formik, Form, Field } from 'formik';
import {
    Flex, Text, HStack, Box, FormControl, Icon, Input, Button, Stack
} from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignIn = () => {

    const hostURL = "http://localhost:8000"

    const navigate = useNavigate();

    

    const handleSubmit = async (values) => {
        const response = await fetch(`${hostURL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email, password: values.password }),
        })
        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.authToken)
            navigate("/home");
        }
    }

    // Formit initialization the value
    const initialValues = {
        email: '',
        password: '',
    };

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    return (
        <Flex
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"100vh"}
            bg={"linear-gradient(90deg, #1CB5E0 0%, #000851 100%)"}
        >
            <Text fontSize={"40px"} color={"whitesmoke"} fontWeight={"900"} as={"h1"}>
                REMEMBER NOTEBOOK
            </Text>
            <HStack
                shadow={"0px 2px 20px 0px black;"}
                padding={"60px"}
                borderRadius={"30px"}
                display={"flex"}
                flexDirection={"column"}
                gap={"80px"}
                justifyContent={"space-between"}
                alignContent={"center"}
                bg={"linear-gradient(90deg, #d53369 0%, #daae51 100%)"}
            >
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Text color={"white"} fontSize={"50px"} textTransform={"uppercase"} fontWeight={"900"} borderRadius={"25px"} as={"h1"}>
                        LOG IN
                    </Text>
                    <Text fontSize={"15px"} fontWeight={"600"} color={"#ffffffbd"} as={"p"}>
                        Enter your credentials to access the account.
                    </Text>
                </Box>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <FormControl display={"flex"} flexDirection={"column"} gap={"25px"}>
                                <FormControl position={"relative"}>
                                    <Icon position={"absolute"} color={"white"} left={"5px"} top={"8px"} fontSize={"35px"} as={MdEmail} _focus={{ color: "blue" }} />
                                    <Field
                                        name="email"
                                        type="text"
                                        as={Input}
                                        color={"white"}
                                        width={"400px"}
                                        paddingLeft={"50px"}
                                        height={"50px"}
                                        borderRadius={"8px"}
                                        outline={"2px solid white"}
                                        border={"none"}
                                        fontSize={"20px"}
                                        fontWeight={"600"}
                                        zIndex={"1"}
                                        bg={"transparent"}
                                        placeholder={"EMAIL"}
                                        _placeholder={{ color: "whiteSmoke" }}
                                        _focus={{ outline: "3px solid black" }}
                                    />
                                    {errors.email && touched.email ? (
                                        <Text color="white" marginLeft={"30px"} marginTop={"5px"} fontSize="18px">{errors.email}</Text>
                                    ) : null}
                                </FormControl>

                                <FormControl position={"relative"}>
                                    <Icon position={"absolute"} color={"white"} left={"5px"} top={"8px"} fontSize={"35px"} as={RiLockPasswordFill} _focus={{ color: "blue" }} />
                                    <Field
                                        name="password"
                                        type="password"
                                        as={Input}
                                        color={"white"}
                                        width={"400px"}
                                        paddingLeft={"50px"}
                                        height={"50px"}
                                        borderRadius={"8px"}
                                        outline={"2px solid white"}
                                        border={"none"}
                                        fontSize={"20px"}
                                        fontWeight={"600"}
                                        zIndex={"1"}
                                        bg={"transparent"}
                                        placeholder={"PASSWORD"}
                                        _placeholder={{ color: "whiteSmoke" }}
                                        _focus={{ outline: "3px solid black" }}
                                    />
                                    {errors.password && touched.password ? (
                                        <Text color="white" marginLeft={"30px"} marginTop={"5px"} fontSize="18px">{errors.password}</Text>
                                    ) : null}
                                </FormControl>

                                <Stack display="flex" justifyContent={"center"} alignItems={"center"} gap={"20px"} width={"100%"}>
                                    <Button
                                        shadow={"-1px 4px 8px 0px #252525"}
                                        cursor={"pointer"}
                                        bg={"whiteSmoke"}
                                        color={"black"}
                                        width={"400px"}
                                        height={"40px"}
                                        transition="all 0.5s"
                                        borderRadius={"30px"}
                                        border={"none"}
                                        fontSize={"25px"}
                                        fontWeight={"700"}
                                        transform="scale(1)"
                                        _hover={{ transform: "scale(1.1)", transition: "all 0.5s" }}
                                        type="submit"
                                        isLoading={isSubmitting}
                                    >
                                        LOG IN
                                    </Button>
                                    <Link to={"/signUp"}>
                                        <Button
                                            shadow={"-1px 4px 8px 0px #252525"}
                                            cursor={"pointer"}
                                            bg={"black"}
                                            color={"white"}
                                            width={"400px"}
                                            height={"40px"}
                                            transition="all 0.5s"
                                            borderRadius={"30px"}
                                            border={"none"}
                                            fontSize={"25px"}
                                            fontWeight={"700"}
                                            transform="scale(1)"
                                            _hover={{ transform: "scale(1.1)", transition: "all 0.5s" }}
                                        >
                                            CREATE NEW ACCOUNT
                                        </Button>
                                    </Link>
                                </Stack>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
            </HStack>
        </Flex>
    );
};

export default SignIn;
