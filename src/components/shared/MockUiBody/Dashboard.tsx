/*
 * MockDashboard is sample highchart dashboard found on their official website.
 * it's main purpose here is just for the demo, in order to fill up body of the app with some relevant content
 */
import "./Dashboard.css";
import Highcharts from "highcharts";
import Dashboards from "@highcharts/dashboards/es-modules/masters/dashboards.src";
import DataGrid from "@highcharts/dashboards/datagrid";
import { Board } from "@highcharts/dashboards";
import { useEffect } from "react";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { Notification, NotificationInfo } from "../../Notifications";

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const config: Board.Options = {
  dataPool: {
    connectors: [
      {
        id: "micro-element",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          columnNames: [
            "Log Management and Analytics",
            "HTTP Monitors",
            "Third-party vulnerabilities",
          ],
          data: [
            ["Ingest & Process", 6421, 6.5],
            ["Retain", 2122, 6.5],
            ["Query", 1350, 0.9],
            ["Real User Monitoring", 388, 1],
            ["Browser monitors", 214, 0.6],
          ],
        },
      },
    ],
  },
  editMode: {
    enabled: true,
    contextMenu: {
      enabled: true,
      items: ["editMode"],
    },
  },
  gui: {
    layouts: [
      {
        rows: [
          {
            cells: [
              {
                id: "kpi-wrapper",
                layout: {
                  rows: [
                    {
                      cells: [
                        {
                          id: "kpi-vitamin-a",
                        },
                        {
                          id: "kpi-iron",
                        },
                      ],
                    },
                  ],
                },
              },
              {
                id: "dashboard-col-0",
              },
              {
                id: "dashboard-col-1",
              },
            ],
          },
          {
            cells: [
              {
                id: "dashboard-col-2",
              },
            ],
          },
        ],
      },
    ],
  },
  components: [
    {
      type: "KPI",
      cell: "kpi-vitamin-a",
      value: 900,
      valueFormat: "{value}",
      title: "HTTP Monitors",
      subtitle: "measured in requests",
    },
    {
      type: "KPI",
      cell: "kpi-iron",
      value: 8,
      title: "Third-party vulnerabilities",
      valueFormat: "{value}",
      subtitle: "measured in requests",
    },
    {
      cell: "title",
      type: "HTML",
      elements: [
        {
          tagName: "h1",
          textContent: "Log Management and Analytics",
        },
      ],
    },
    {
      sync: {
        visibility: true,
        highlight: true,
        extremes: true,
      },
      connector: {
        id: "micro-element",
      },
      cell: "dashboard-col-0",
      type: "Highcharts",
      columnAssignment: {
        Food: "x",
        "Vitamin A": "value",
      },
      chartOptions: {
        xAxis: {
          type: "category",
          accessibility: {
            description: "Groceries",
          },
        },
        yAxis: {
          title: {
            text: "mcg",
          },
          plotLines: [
            {
              value: 900,
              zIndex: 7,
              dashStyle: "ShortDash",
              label: {
                text: "RDA",
                align: "right",
                style: {
                  color: "#B73C28",
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            marker: {
              radius: 6,
            },
          },
        },
        legend: {
          enabled: true,
          verticalAlign: "top",
        },
        chart: {
          animation: false,
          type: "column",
          spacing: [30, 30, 30, 20],
        },
        title: {
          text: "",
        },
        tooltip: {
          valueSuffix: " mcg",
          stickOnContact: true,
        },
        lang: {
          accessibility: {
            chartContainerLabel:
              "HTTP monitors can be created to check the availability of resources",
          },
        },
        accessibility: {
          description: `The chart is displaying the Http monitors`,
          point: {
            valueSuffix: " mcg",
          },
        },
      },
    },
    {
      cell: "dashboard-col-1",
      sync: {
        visibility: true,
        highlight: true,
        extremes: true,
      },
      connector: {
        id: "micro-element",
      },
      type: "Highcharts",
      columnAssignment: {
        Food: "x",
        Iron: "y",
      },
      chartOptions: {
        xAxis: {
          type: "category",
          accessibility: {
            description: "Groceries",
          },
        },
        yAxis: {
          title: {
            text: "mcg",
          },
          max: 8,
          plotLines: [
            {
              value: 8,
              dashStyle: "ShortDash",
              label: {
                text: "RDA",
                align: "right",
                style: {
                  color: "#B73C28",
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            marker: {
              radius: 6,
            },
          },
        },
        title: {
          text: "",
        },
        legend: {
          enabled: true,
          verticalAlign: "top",
        },
        chart: {
          animation: false,
          type: "column",
          spacing: [30, 30, 30, 20],
        },
        tooltip: {
          valueSuffix: " mcg",
          stickOnContact: true,
        },
        lang: {
          accessibility: {
            chartContainerLabel:
              "Third-party vulnerabilities pecific library or language runtime containing vulnerabilities.",
          },
        },
        accessibility: {
          description: `The chart is displaying the third party vulnerabilities`,
          point: {
            valueSuffix: " mcg",
          },
        },
      },
    },
    {
      cell: "dashboard-col-2",
      connector: {
        id: "micro-element",
      },
      type: "DataGrid",
      sync: {
        highlight: true,
        visibility: true,
      },
    },
  ],
};

interface MockDashboardProps {
  notification?: Notification;
}

export const MockDashboard = ({ notification }: MockDashboardProps) => {
  useEffect(() => {
    Dashboards.board("container", config);
  }, []);

  return (
    <div className="mockBody">
      {notification && (
        <div className="notification-banner">
          <NotificationInfo notification={notification} />
        </div>
      )}
      <div id="container">
        <Row>
          <div id="kpi-wrapper">
            <Cell id="kpi-vitamin-a" />
            <Cell id="kpi-iron" />
          </div>
          <Cell id="dashboard-col-0" />
          <Cell id="dashboard-col-1" />
        </Row>
        <Row>
          <Cell id="dashboard-col-2" />
        </Row>
      </div>
    </div>
  );
};

export default MockDashboard;
