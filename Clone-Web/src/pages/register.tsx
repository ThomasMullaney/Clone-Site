import React from "react";
import { Form, Formik } from "formik";
import { formatDiagnostic } from "typescript";
import {
    Box,
    Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username" 
            />
            <Box mt={4}>
            <InputField
              name="password"
              placeholder="password"
              label="password"
              type="password"
            />
            </Box>
            <Button 
            mt={4} 
            type='submit' 
            isLoading={isSubmitting} 
            variantcolor="teal"
            >
              Register
              </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
