import React from 'react';

class CustomTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    let balance = document.getElementById('portfolio-balance');
    let balanceFlux = document.getElementById('portfolio-balance-flux');
    let neg = "+";

    if (!nextProps.payload || nextProps.payload.length === 0) return;

    if (this.props.active && nextProps.payload[0]) {
      let balanceFluxCalc = parseFloat(nextProps.payload[0].value - this.props.openBalance);
      let balanceFluxPercentageCalc = parseFloat(balanceFluxCalc * 100/this.props.openBalance);
      if (balanceFluxCalc < 0) { neg = "-" ;}
      let balanceFluxString = `${neg}$${Math.abs(balanceFluxCalc).formatMoney(2)} (${balanceFluxPercentageCalc.formatMoney(2)}%)`
      balance.innerHTML = `$${parseFloat(nextProps.payload[0].value).formatMoney(2)}`;
      balanceFlux.innerHTML = balanceFluxString;
    } else if (this.props.balanceFlux !== nextProps.balanceFlux) {
      balance.innerHTML = `$${this.props.balance}`;
      balanceFlux.innerHTML = `${nextProps.neg}$${nextProps.balanceFlux} (${nextProps.balanceFluxPercentage}%)`;
    } else {
      balance.innerHTML = `$${this.props.balance}`;
      balanceFlux.innerHTML = `${this.props.neg}$${this.props.balanceFlux} (${this.props.balanceFluxPercentage}%)`;
    }
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      if (payload && payload[0] && payload[0].payload) {
        return (
          <div className="custom-tooltip">
            {payload[0].payload.time}
          </div>
        );
      }
    }
    return null;
  }
}

export default CustomTooltip;
