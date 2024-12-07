import { FaLinkedin, FaGithub } from "react-icons/fa";

const Team = () => {
  return (
    <>
      <style jsx="true">{`
        /* General styles */
        body,
        html {
          margin: 0;
          padding: 0;
          font-family: "Arial", sans-serif;
          background-color: #000; /* Background color */
        }

        /* Scrollbar styles */
        main {
          height: 90vh; /* Increased height for more viewable area */
          overflow-y: scroll; /* Enable vertical scrolling */
          padding: 20px; /* Added padding for better spacing */
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0ef;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #000;
          border-radius: 20px;
          border: 2px solid #0ef;
        }

        /* Heading animation, hover, and underline */
        .about-heading {
          font-size: 3rem;
          color: #0ef;
          text-align: center;
          margin-top: 2rem;
          opacity: 0;
          animation: fade-in 2s forwards;
          transition: transform 0.3s ease-in-out;
          position: relative;
        }

        .about-heading::after {
          content: "";
          display: block;
          width: 80px;
          height: 4px;
          background-color: #0ef;
          margin: 0.5rem auto;
          transition: width 0.5s;
        }

        .about-heading:hover::after {
          width: 120px;
        }

        .about-heading:hover {
          transform: scale(1.1);
          color: #fff;
        }

        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }

        /* Team card styling */
        .team-card {
          background-color: #1a1a1a;
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 2rem; /* Added margin for spacing between cards */
          transition: transform 0.5s ease-in-out, box-shadow 0.5s;
        }

        .team-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
        }

        /* Heading styles */
        .team-card h3 {
          color: #0ef;
          font-size: 24px;
          margin-top: 1rem;
        }

        /* Name field styling */
        .team-card h4 {
          color: #ff1493;
          font-size: 20px;
          margin-top: 0.5rem;
        }

        .team-card p {
          color: white;
          font-size: 18px;
        }

        /* Profile image styling */
        .team-card img {
          border-radius: 50%;
          border: 4px solid #ff1493;
          transition: transform 0.5s ease;
        }

        .team-card img:hover {
          transform: scale(1.1);
        }

        /* Icon styling */
        .team-card a {
          color: #ff1493;
          transition: color 0.3s ease-in-out;
        }

        .team-card a:hover {
          color: #0ef;
        }

        /* Animation */
        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade {
          animation: fade 1.5s ease-in-out;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>

      <main className="bg-black">
        {/* Animated About Us Heading */}
        <h2 className="about-heading">About Us</h2>
        

        {/* Mentor Card */}
        <section className="container mx-auto px-4 md:px-8">
          <div className="team-card bg-black text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 animate-fade hover:animate-bounce">
            <img
              src="/images/su.jpg"
              alt="Mentor"
              className="w-40 h-40 rounded-full mx-auto border-4 border-[#66ffff] transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-2xl font-bold text-[#66ffff] mt-4">
              Project Mentor
            </h3>
            <h4 className="team-name">Mr.Jonnalagadda Surya Kiran</h4>
            <p className="text-lg text-white">Guiding the Team</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/suryakiran1993/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-[#66ffff] text-2xl hover:text-white" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub className="text-[#66ffff] text-2xl hover:text-white" />
              </a>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Team Member 1 */}
          <div className="team-card bg-black text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 animate-fade hover:animate-bounce">
            <img
              src="/images/m.jpg"
              alt="Frontend Developer"
              className="w-40 h-40 rounded-full mx-auto border-4 border-[#ff1493] transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-2xl font-bold text-[#66ffff] mt-4">
              Frontend Developer
            </h3>
            <h4 className="team-name">Mukesh</h4>

            <p className="text-lg text-white">Building Interfaces</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/team1"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-[#ff1493] text-2xl hover:text-[#66ffff]" />
              </a>
              <a
                href="https://github.com/kadamukesh"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="text-[#ff1493] text-2xl hover:text-[#66ffff]" />
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="team-card bg-black text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 animate-fade hover:animate-bounce">
            <img
              src="/images/s.jpg"
              alt="Backend Developer"
              className="w-40 h-40 rounded-full mx-auto border-4 border-[#ff1493] transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-2xl font-bold text-[#66ffff] mt-4">
              Backend Developer
            </h3>
            <h4 className="team-name">Sri krishna</h4>
            <p className="text-lg text-white">Managing Databases</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/garapati-srikrishna-a8b77828a/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-[#ff1493] text-2xl hover:text-[#66ffff]" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub className="text-[#ff1493] text-2xl hover:text-[#66ffff]" />
              </a>
            </div>
          </div>
          

          {/* Team Member 3 */}
          <div className="team-card bg-black text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 animate-fade hover:animate-bounce">
            <img
              src="/images/lali.jpg"
              alt="Full Stack Developer"
              className="w-40 h-40 rounded-full mx-auto border-4 border-[#ff1493] transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-2xl font-bold text-[#66ffff] mt-4">
              Full Stack Developer
            </h3>
            <h4 className="team-name">Lalitesh</h4>
            <p className="text-lg text-white">End-to-End Solutions</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/lalitesh04/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-[#ff1493] text-2xl hover:text-[#66ffff]" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <FaGithub className="text-[#ff1493] text-2xl hover:text-[#66ffff]" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Team;