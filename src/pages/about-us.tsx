import Header from "../components/header";
import "../styles/aboutstyles.css";
import image from "../images/makeup.jpg";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="wrap">
        <div className="aboutwrapper">
          <img src={image} alt="" />
          <span>
            About us
            <br />
            FashionBox is the all-in-one smart shopping companion that transforms the chore of building lists into a vibrant, 
            interactive experience: imagine opening the app and being greeted by a carousel of richly detailed cards—each 
            displaying a crisp product photo, a concise description, price insights or even personalized style notes—that 
            you can add to your list with a single tap, tag with custom labels like “groceries,” “home essentials” or 
            “fashion finds,” set up sale or expiration reminders, and then swipe away once you’ve secured the item, just as you’d 
            tick off a task in your favorite planner. Seamlessly syncing across phone, tablet and desktop, FashionBox keeps your 
            household and lifestyle purchases in one place, whether it’s exotic coffee beans, pantry staples, cleaning supplies 
            or that limited-edition sneaker drop. Behind the scenes, an intelligent suggestion engine quietly learns your preferences 
            and occasionally surprises you with curated picks—cheeses, gadgets, wardrobe must-haves—so you never run out of inspiration. 
            Share lists with family or roommates, review your purchase history to stay on budget, and enjoy a clean, distraction-free 
            interface that feels more like a personal concierge than a mere to-do list. With FashionBox, every shopping mission becomes a 
            streamlined, delightful journey from discovery to checkout.
            <br />
            <br />
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
