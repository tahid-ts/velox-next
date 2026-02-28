/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../shared/container/Container";
import SignInForm from "./SignInForm";

const SignInSection = () => {
  return (
    <Container mainClassName="bg-artboard">
      <div className="grid lg:grid-cols-2 grid-cols-1 max-w-360 bg-white p-5 rounded-xl">
        <div>
          <img src="/image/log in/image.png" alt="" />
        </div>
        <div className="flex items-center justify-center">
          <SignInForm />
        </div>
      </div>
    </Container>
  );
};

export default SignInSection;
