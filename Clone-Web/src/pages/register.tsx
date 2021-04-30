import {
  Box,
  Button,
  Flex,
  Link
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { MeQuery, MeDocument, useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link"

// import { withApollo } from "../utils/withApollo";

//       <Formik
//         initialValues={{email: "", username: "", password: "" }}
//         onSubmit={async (values, { setErrors }) => {
//           const response = await register({
//            variables: { options: values},
//            update: (cache, { data}) => {
//              cache.writeQuery<MeQuery>({
//                query: MeDocument,
//                data: {
//                  __typename: "Query",
//                  me: data?.register.user,
//                },
//              });
//            },
//           });

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values},
          //   update: (cache, { data }) => {
          //     cache.writeQuery<MeQuery>({
          //       query: MeDocument,
          //       data: {
          //         __typename: "Query",
          //         me: data?.register.user,
          //       },
          //     });
          //     cache.evict({ fieldName: "posts:{}" });
          //   },
          // });
          );
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              // worked
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient) (Register);


// < ------------------------------------------------------------------------------------------------fin
// interface registerProps {}

// export const Register: React.FC<registerProps> = ({}) => {
//   const router = useRouter();
//   const [register] = useRegisterMutation();
//   return (
//     <Wrapper variant="small">
//       <Formik
//         initialValues={{email: "", username: "", password: "" }}
//         onSubmit={async (values, { setErrors }) => {
//           const response = await register({
//            variables: { options: values},
//            update: (cache, { data}) => {
//              cache.writeQuery<MeQuery>({
//                query: MeDocument,
//                data: {
//                  __typename: "Query",
//                  me: data?.register.user,
//                },
//              });
//            },
//           });
//           console.log(response)
//           if (response.data?.register.errors) {
//             setErrors(toErrorMap(response.data.register.errors));
//           } else if (response.data?.register.user) {
//             // register worked
//             router.push("/")
//           }
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <InputField
//               name="username"
//               placeholder="username"
//               label="username"
//             />
//             <Box mt={4}>
//                <InputField
//               name="email"
//               placeholder="email"
//               label="email"
//             />
//             </Box>
//             <Box mt={4}>
//               <InputField
//                 name="password"
//                 placeholder="password"
//                 label="password"
//                 type="password"
//               />
//             </Box>
//             <Button
//               mt={4}
//               type="submit"
//               isLoading={isSubmitting}
//               variantColor="teal"
//             >
//               Register
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Wrapper>
//   );
// };

// export default withUrqlClient(createUrqlClient, { ssr: false}) (Register);
