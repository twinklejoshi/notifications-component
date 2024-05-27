import { Header, MockDashboard } from "../shared";

/*
 * MockDashboard is sample highchart dashboard found on their official website.
 * it's main purpose here is just for the demo, in order to fill up body of the app with some relevant content
 */
/*
 * For the header,
 * title needs to be provided because I'll be using the same component that will be displayed when user click particular notification with specific metrics.
 * showNotificationBtn will be used in the welcome page and not on specific metrics page
 * Again this just for the demo.
 */
export const HomePage: React.FC = () => {
  return (
    <div>
      <Header title={"Customer usage metrics portal"} showNotificationBtn />
      <MockDashboard />
    </div>
  );
};

export default HomePage;
