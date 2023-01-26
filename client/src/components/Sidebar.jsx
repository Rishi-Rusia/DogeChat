import "../pages/home.css";

import Navbar from "./Navbar";
import Chat from "./Chat";

export default function Sidebar(props) {
  // const [Responsive, setResponsive] = useState(false);

  // window.addEventListener("resize", () => {
  //   if (window.innerWidth <= 699) {
  //     setResponsive(true);
  //     console.log("Responsive");
  //     console.log(Responsive);
  //   } else {
  //     setResponsive(false);
  //     console.log("unResponsive");
  //     console.log(Responsive);
  //   }
  // });

  return (
    // sidebar-displaynone

    <div>
      <div className={`sidebar ${props.isOpen ? "" : "sidebar-displaynone"}`}>
        <Navbar></Navbar>
        <Chat></Chat>
      </div>
    </div>
  );
}
