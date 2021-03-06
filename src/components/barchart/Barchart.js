/**
 * @author Shyam Soni
 * @description displaying the barchart from recharts
 * used the componentDidMount life cycle method to fetch the data from the backend
 * from the dropdown menu we can select the Type which will show the count of the selected type
 * with there respective month
 */
import React, { Component, Fragment } from "react";
import { client } from "../../actions/index";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from "recharts";
import ClipLoader from "react-spinners/ClipLoader";
class Barchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartData: [],
      selectedType: "A",
      isLoading: true,
      test: [],
    };
  }
  handleSelect = (event) => {
    this.setState({
      selectedType: event.target.value,
    });
  };
  renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <Fragment>
        <text
          x={x + width / 2}
          y={y - radius}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8884d8"
        >
          {value}
        </text>
      </Fragment>
    );
  };
  componentDidMount() {
    client
      .get("/readCSV")
      .then((response) => {
      this.setState({
          barChartData: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  sortBy = (field) => {
    return function (a, b) {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    };
  };

  render() {
    const Barchart = (
      <div className="wrapper">
        <span className="row">Select Type</span>{" "}
        <select onChange={this.handleSelect}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
        <BarChart
          width={700}
          height={440}
          data={this.state.barChartData.sort(
            this.sortBy(this.state.selectedType)
          )}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={this.state.selectedType} fill="#8884d8">
            <LabelList
              name={this.state.selectedType}
              content={this.renderCustomizedLabel}
            />
          </Bar>
        </BarChart>
      </div>
    );
    const Spinner = (
      <div className="spinner">
        <ClipLoader size={100} />
      </div>
    );
    return <Fragment>{this.state.isLoading ? Spinner : Barchart}</Fragment>;
  }
}

export default Barchart;
