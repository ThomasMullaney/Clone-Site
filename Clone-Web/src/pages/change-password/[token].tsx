import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { InputField } from '../../components/inputField';
import { Wrapper } from '../../components/wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    return (<Wrapper variant="small">
    <Formik
      initialValues={{ newPassword }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login(values);
        console.log(response)
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
          // login worked
          console.log("here")
          router.push("/")
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="newPassword"
            placeholder="new password"
            label="New Password"
            type="password"
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
            type="submit"
            isLoading={isSubmitting}
            variantcolor="teal"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>);
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}

export default ChangePassword