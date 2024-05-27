import { useParams } from "react-router-dom";
import { Header, MockDashboard } from "../shared";

/*
 * This page uses exact contents oh home page
 * it's main purpose here is just for the demo, in order to fill up body of the app with some relevant content
 * It will be displayed when user click particular notification with specific metric
 * Title will be changed based on metrics that user clicked on
 */

export const UsageMetricsPage: React.FC = () => {
  const param = useParams()["metrics"]!;
  const metrics = param.charAt(0).toUpperCase() + param.slice(1);

  return (
    <div>
      <Header title={metrics} showNotificationBtn={false} />
      <MockDashboard />
    </div>
  );
};

export default UsageMetricsPage;
