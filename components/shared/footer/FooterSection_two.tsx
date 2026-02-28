/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoIosSend } from "react-icons/io";
import Container from "../container/Container";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import Decoration from "../decoration/Decoration";

const FooterSection_two = () => {
  return (
    <Container
      mainClassName="bg-[#033428] pt-[120px] relative"
      controlPy={false}
    >
      <div className="flex lg:flex-row flex-col justify-between w-full  pb-18">
        <div className="grid  grid-cols-1 place-items-center lg:place-items-start gap-5">
          <div className="">
            <div className="relative w-61.5 mb-5.25">
              <input
                type="text"
                placeholder="Subscribe Newsletter"
                className="border-b outline-none text-white h-14 w-61.5"
              />
              <button className="w-11 h-11 bg-primary rounded-full flex items-center justify-center absolute right-0 bottom-5">
                <IoIosSend className="w-6 h-6" />
              </button>
            </div>
            <div>
              <div className="flex justify-between lg:gap-[28.67px]">
                <Link
                  href={"https://www.facebook.com/username"}
                  className="bg-primary/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-white cursor-pointer"
                >
                  <FaFacebookF className="group-hover:text-black text-white" />
                </Link>
                <Link
                  href={"https://www.linkedin.com/username"}
                  className="bg-primary/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-white cursor-pointer"
                >
                  <FaLinkedinIn className="group-hover:text-black text-white" />
                </Link>
                <Link
                  href={"https://www.instagram.com/username"}
                  className="bg-primary/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-white cursor-pointer"
                >
                  <FaInstagram className="group-hover:text-black text-white" />
                </Link>
                <Link
                  href={"https://x.com/username"}
                  className="bg-primary/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-white cursor-pointer"
                >
                  <BsTwitterX className="group-hover:text-black text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start lg:items-start">
          <p className="label-lg text-primary">London</p>
          <p className="label-lg text-primary">+ (123) 1800-567-8990</p>
          <p className="label-lg text-primary">Los Angeles, LA 90002</p>
        </div>
        <div className="flex flex-col gap-4 items-start lg:items-start">
          <p className="label-lg text-primary">New York</p>
          <p className="label-lg text-primary">+ (123) 1800-567-8990</p>
          <p className="label-lg text-primary">Los Angeles, LA 90002</p>
        </div>
        <div className="flex flex-col gap-4 items-start lg:items-start">
          <p className="label-lg text-primary">Contact</p>
          <p className="label-lg text-primary">+ (123) 1800-567-8990</p>
          <p className="label-lg text-primary">Los Angeles, LA 90002</p>
        </div>
        <div className="flex flex-col items-start gap-20">
          <div className="flex flex-col gap-4 items-start lg:items-end ">
            <div className="flex flex-col gap-4">
              <Link
                href={"/"}
                className="label-lg text-primary px-26.25 py-5 border border-gray-50 rounded-lg"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="label-lg text-primary px-26.25 py-5 border border-gray-50 rounded-lg"
              >
                Services
              </Link>
              <Link
                href={"/"}
                className="label-lg text-primary px-26.25 py-5 border border-gray-50 rounded-lg"
              >
                Pages
              </Link>
              <Link
                href={"/"}
                className="label-lg text-primary px-26.25 py-5 border border-gray-50 rounded-lg"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start p-5">
        <img src="/image/footer/Velox.png" alt="" />
      </div>
      <div className="flex lg:flex-row flex-col justify-between w-full  py-7.5 border-t border-t-white/50">
        <div>
          <p className="text-primary/50">© 2026 Velox. All Rights Reserved.</p>
        </div>
        <div className="lg:flex-row flex-col gap-5">
          <Link href={"/"} className="text-primary/50">
            Privacy Policy
          </Link>
          <Link href={"/"} className="text-primary/50">
            Terms Conditions
          </Link>
        </div>
      </div>
      <Decoration
        src="/image/footer/Ellipse 3.png"
        preset={"bottomLeft"}
        opacity="full"
      />
      <Decoration
        src="/image/footer/Ellipse 4.png"
        preset={"topRight"}
        opacity="full"
      />
    </Container>
  );
};

export default FooterSection_two;
