import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { IoLocationOutline } from "react-icons/io5";
import { GiSmartphone } from "react-icons/gi";
import { TfiEmail } from "react-icons/tfi";
import backgroundImage from "../assets/contactUs.jpg";

const ContactSection = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_tumnxui',
      'template_fwbkuoa',
      form.current,
      'S9piUiR4uWC-trEJc'
    )
      .then(() => {
        alert("Message sent successfully!");
        form.current.reset();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -1 }}
      />
      <div className="fixed inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10">
        <div className="flex flex-col justify-center items-center text-white text-center h-screen">
          <h5 className="text-xs font-noah uppercase tracking-[0.9em] font-semibold">Location</h5>
          <h1 className="text-7xl font-libre-caslon p-4 rounded-lg">Contact Us</h1>
          <h2 className="text-3xl font-libre-caslon p-4 rounded-lg text-customColor">Get In Touch</h2>
        </div>

        <section className="bg-white py-10">
          <div className="flex justify-center p-28 gap-4">
            <div className="w-80 border-b-2 flex items-center gap-8 p-8 bg-[#E1DDD9]">
              <IoLocationOutline size={50} className="text-[#B3925A]" />
              <div>
                <h1 className="text-2xl font-libre-caslon text-[#1b1b1b] mb-2">Address</h1>
                <h2 className="font-noah text-[#777777] text-[13px]">Rue kadi Lass, Maarif</h2>
                <h2 className="font-c text-[#777777] text-[20px]">Morocco</h2>
              </div>
            </div>

            <div className="w-80 border-b-2 flex items-center gap-8 p-8 bg-[#E1DDD9]">
              <GiSmartphone size={50} className="text-[#B3925A]" />
              <div>
                <h1 className="text-2xl font-libre-caslon text-[#1b1b1b] mb-2">Phone</h1>
                <h2 className="font-noah text-[#B3925A] text-[20px]">+2125 28 54 62 48</h2>
              </div>
            </div>

            <div className="w-80 border-b-2 flex items-center gap-8 p-8 bg-[#E1DDD9]">
              <TfiEmail size={50} className="text-[#B3925A]" />
              <div>
                <h1 className="text-2xl font-libre-caslon text-[#1b1b1b] mb-2">Email</h1>
                <h2 className="font-noah text-[#777777] text-[13px]">bistrorestaurant@gmail.com</h2>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 m-8">
            <div className="w-1/3 h-36 flex flex-wrap">
              <h5 className="text-xs font-noah uppercase tracking-[0.5em] font-semibold text-customColor">Bistro Restaurant</h5>
              <h1 className="text-[48px] font-libre-caslon p-4">Get in touch</h1>
              <h4 className="font-noah text-[#777777] text-[15px] ml-4">Feel free to contact us! You have a piece of advice or a suggestion that you would like to share with us?</h4>
            </div>

            <form ref={form} onSubmit={sendEmail} className="w-2/5 bg-[#E1DDD9] flex flex-wrap justify-center gap-5 py-12 z-20">
              <input type="text" name="name" placeholder="Name" className="w-2/5 h-[50px] border placeholder-black p-2" required />
              <input type="text" name="phone" placeholder="Phone" className="w-2/5 h-[50px] border placeholder-black p-2" required />
              <input type="email" name="email" placeholder="Email" className="w-2/5 h-[50px] border placeholder-black p-2" required />
              <input type="text" name="subject" placeholder="Subject" className="w-2/5 h-[50px] border placeholder-black p-2" required />
              <textarea name="message" placeholder="Message" className="border w-[84%] placeholder-black p-2 h-28" required />
              <input type="submit" value="Send Message" className="text-xs font-noah uppercase tracking-[0.3em] font-semibold bg-customColor text-white w-[84%] h-[48px]" />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactSection;
