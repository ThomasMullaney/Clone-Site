import { withUrqlClient } from "next-urql";
import React from "react";
import { Navbar } from "../components/navbar";
import { usePostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{data}] = usePostQuery();
  return (
    <>
      <Navbar />
      <div>Hello World</div>
      <br/>
      {!data ? (
         <div>loading...</div>
         ) : (
           data.posts.map((p) => <div key={p.id}>{p.title}</div>)
           )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
