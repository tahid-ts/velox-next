/* eslint-disable @next/next/no-img-element */
import React from "react";
import Container from "../shared/container/Container";
import { GrMapLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
import { RxTimer } from "react-icons/rx";
import SectionTitle from "../shared/ui/SectionTitle";
import Title from "../shared/ui/Title";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <Container mainClassName="bg-artboard">
      <div>
        <div className="bg-green rounded-xl py-11.5 px-25 flex lg:flex-row flex-col gap-17">
          <div className="flex gap-8">
            <div className="bg-white w-17 h-17 rounded-2xl flex items-center justify-center p-5">
              <GrMapLocation className="text-green w-7 h-7 " />
            </div>
            <div>
              <h1 className="heading-md text-white">Address</h1>
              <p className="text-white/70">
                1234 Market Street, San Francisco, CA 94103, USA
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="bg-white w-17 h-17 rounded-2xl flex items-center justify-center p-5">
              <FiPhoneCall className="text-green w-7 h-7" />
            </div>
            <div>
              <h1 className="heading-md text-white">Contact</h1>
              <p className="text-white/70">
                1234 Market Street, San Francisco, CA 94103, USA
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="bg-white w-17 h-17 rounded-2xl flex items-center justify-center p-5">
              <RxTimer className="text-green w-7 h-7" />
            </div>
            <div>
              <h1 className="heading-md text-white">Offer Hours</h1>
              <p className="text-white/70">
                1234 Market Street, San Francisco, CA 94103, USA
              </p>
            </div>
          </div>
        </div>
        <div className="lg:pt-30 pt-15 flex lg:flex-row flex-col gap-15.25">
          <div>
            <SectionTitle title="Contact Us" />
            <Title position="left" title={"We would Love to Hear\n From You"} />
            <p className="text-green mt-6 font-inter paragraph-md">
              Processing times can differ based on transfer routes. Please keep
              your transaction details handy so we can assist you more
              effectively.
            </p>
            <h1 className="pt-10 pb-6 heading-sm text-green">
              Our Availability
            </h1>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green rounded-full mb-2"></span>
                <span className="paragraph-md pb-2 text-green">
                  Monday - Friday, 8 AM - 6 PM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green rounded-full mb-2"></span>
                <span className="paragraph-md pb-2 text-green">
                  Saturday - Sunday, 10 AM - 9 PM
                </span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <h1 className="label-sm text-green">Social Media:</h1>
              <div className="flex justify-between lg:gap-[28.67px]">
                <Link
                  href={"https://www.facebook.com/username"}
                  className="bg-green/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-green cursor-pointer"
                >
                  <FaFacebookF className="group-hover:text-white text-green" />
                </Link>
                <Link
                  href={"https://www.linkedin.com/username"}
                  className="bg-green/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-green cursor-pointer"
                >
                  <FaLinkedinIn className="group-hover:text-white text-green" />
                </Link>
                <Link
                  href={"https://www.instagram.com/username"}
                  className="bg-green/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-green cursor-pointer"
                >
                  <FaInstagram className="group-hover:text-white text-green" />
                </Link>
                <Link
                  href={"https://x.com/username"}
                  className="bg-green/30 w-10 h-10 rounded-full flex items-center justify-center group hover:bg-green cursor-pointer"
                >
                  <BsTwitterX className="group-hover:text-white text-green" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/image/contact us/BG-img.png"
              className="max-w-250.75 hidden lg:block"
              alt=""
            />
            <div className="lg:absolute lg:-top-10 lg:left-2/7 lg:w-153.75 w-full">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="pt-39">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d38479.153473948914!2d-1.4757083976068843!3d52.931379608649365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1771228633783!5m2!1sen!2sbd"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
