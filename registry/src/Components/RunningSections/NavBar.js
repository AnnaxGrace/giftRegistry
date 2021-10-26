// import React, { useEffect, useState, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";

// import { firebaseAuth } from "../../provider/AuthProvider";

// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Row from "react-bootstrap/Row";

// import BubbleGum from "../../assets/bubblegumgif.gif";

// function NavBar() {
//   const [showGif, setShowGif] = useState({ gif: false, logo: "logo" });

//   const { currentUserType } = useContext(firebaseAuth);
//   const location = useLocation();

//   useEffect(() => {
//     //If our location is home run the show intervals
//     if (location.pathname === "/") {
//       setShowGif({ gif: true, logo: "hide" });
//       const logoInterval = setInterval(function () {
//         setShowGif({ gif: true, logo: "logo" });
//         clearInterval(logoInterval);
//       }, 2300);
//       const gifInterval = setInterval(function () {
//         setShowGif({ gif: false, logo: "logo" });
//         clearInterval(gifInterval);
//       }, 3500);
//     }
//   }, [location.pathname]);

//   return (
//     <Navbar className="navbar-override">
//       <Row>
//           {showGif.gif && <img src={BubbleGum} alt="gif of bubble gum being blown up then popped"></img>}
//           <Navbar.Brand id={showGif.logo} as={Link} to="/">
//             StickersbySimkaye
//           </Navbar.Brand>
//           <Nav>
//             <Nav.Link className="navbar-links" as={Link} to="/products">
//               Shop
//             </Nav.Link>
//             <Nav.Link className="navbar-links" as={Link} to="/faq">
//               FAQ
//             </Nav.Link>
//             {currentUserType === "staff" && (
//               <Nav.Link className="navbar-links" as={Link} to="/staff">
//                 Staff&nbsp;Portal
//               </Nav.Link>
//             )}
//           </Nav>
//       </Row>
//     </Navbar>
//   );
// }

// export default NavBar;
