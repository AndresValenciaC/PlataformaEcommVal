//import liraries
import React, { Component } from "react";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";

// create a component
class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    displayPosition: "right",
    periodoFecha: "",
    tituloChart: "",
  };

  render() {
    return (
      <div className="chart">
        <h2
          style={{
            fontSize: 60,
            fontFamily: "fantasy",
            marginTop: "20px",
          }}
        >
          Charts de la Aplicación
        </h2>
        <Bar
          data={this.state.chartData}
          width={100}
          height={250}
          options={{
            maintainAspectRatio: false,
            title: {
              display: this.props.displayTitle,
              text: this.props.tituloChart + "" + this.props.periodoFecha,
              fontSize: 35,
              legend: {
                display: this.props.displayLegend,
                position: this.props.displayPosition,
              },
            },
          }}
        />
      </div>
    );
  }
}

//make this component available to the app
export default Charts;
