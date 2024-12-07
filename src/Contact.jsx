import { useState } from "react";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact, //...contact takes all properties from the current contact state
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(contact);
  // };

  return (
    <>
      <section
        className="section-contact py-12 overflow-y-auto bg-gray-300"
        style={{ height: "100vh" }}
      >
        {/* Contact Page Main Section */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 ">
          {/* Left: Image */}
          <div className="contact-img">
            <img
              src="/images/network.jpg"
              alt="We are always ready to help"
              className="h-auto rounded-2xl object-cover"
              style={{
                width: "500px",
                height: "500px",
                marginTop: "8vh",
              }} // Increased image size
            />
          </div>

          {/* Right: Contact Form */}
          <div className="section-form bg-gray-300 p-5 ">
            {/* Main Heading */}
            <h1 className="mb-6 text-2xl font-semibold border-b-2 border-blue-600 inline-block">
              Contact Us
            </h1>
            <form action="https://formspree.io/f/mjkvbgav" method="POST">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        

        {/* Google Map Section */}
        <section className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6645995502563!2d80.62035802518955!3d16.4418519342929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a073957d%3A0xe79d66babc83e470!2sK%20L%20UNIVERSITY%2C%20Vaddeswaram%2C%20Andhra%20Pradesh%20522303!5e0!3m2!1sen!2sin!4v1728024656329!5m2!1sen!2sin"
            width="100%"
            height="500"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;