import Header from "../components/header";
import "../styles/aboutstyles.css";
import image from "../images/party.jpg";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="wrap">
        <div className="aboutwrapper">
          <img src={image} alt="" />
          <span>
            Event Organizer is a website for managing events, created by
            Innopolis University student Petr Belyaev. The main goal of the
            project is to provide a convenient tool for planning and managing
            events, allowing users to add, edit, and view events with details
            such as date, location, and description. The website includes the
            following key features: Event Creation: Users can create events by
            specifying a title, date (with validation to ensure the date is not
            earlier than the current date), location, and description. Homepage
            Event List: The main page displays a list of all planned events with
            brief information about each, including the title, date, and
            location. Editing and Deleting Events: Users can modify details of
            previously added events or delete them entirely. Event Cover
            Selection: Users can choose a cover image for their events from a
            set of options, making each event more visually appealing. The
            project is designed for students and faculty who wish to organize
            academic events, as well as anyone planning parties, conferences,
            sports, or cultural events.<br></br>
            <a href="https://github.com/Darriyano">
              Link to the developer`s GitHub!
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
