// Get the input elements
const purchasePriceInput = document.getElementById("purchase-price");
const downPaymentInput = document.getElementById("down-payment");
const loanTermInput = document.getElementById("loan-term");
const interestRateInput = document.getElementById("interest-rate");
const propertyTaxInput = document.getElementById("property-tax");
const homeownersInsuranceInput = document.getElementById("homeowners-insurance");
const pmiInput = document.getElementById("pmi");
const hoaFeesInput = document.getElementById("hoa-fees");

// Create the chart
const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

const data = {
  labels: ['Mortgage Amount', 'Property Tax', 'Homeowner\'s Insurance', 'PMI', 'HOA Fees'],
  datasets: [{
    label: ' ',
    data: [0, 0 , 0 , 0 , 0 ],
    backgroundColor: [
      'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(153, 102, 255)'
    ]
  }]
};

const options = {
  responsive: false,
  maintainAspectRatio: true,
  rotation: 28.6 * Math.PI, // rotate by 90 degrees (in radians)
  plugins: {
    legend: {
      display: false,
      position: 'right',
    },
  }
};

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: options
});

// Add event listeners to the Desktop input elements
purchasePriceInput.addEventListener("input", calculateMortgage);
downPaymentInput.addEventListener("input", calculateMortgage);
loanTermInput.addEventListener("input", calculateMortgage);
interestRateInput.addEventListener("input", calculateMortgage);
propertyTaxInput.addEventListener("input", calculateMortgage);
homeownersInsuranceInput.addEventListener("input", calculateMortgage);
pmiInput.addEventListener("input", calculateMortgage);
hoaFeesInput.addEventListener("input", calculateMortgage);

function calculateMortgage() {
    const purchasePrice = parseFloat(purchasePriceInput.value);
    const downPayment = parseFloat(downPaymentInput.value);
    const loanTerm = parseFloat(loanTermInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const propertyTax = parseFloat(propertyTaxInput.value) || 0;
    const homeownersInsurance = parseFloat(homeownersInsuranceInput.value) || 0;
    const pmi = parseFloat(pmiInput.value) || 0;
    const hoaFees = parseFloat(hoaFeesInput.value) || 0;

    const principal = purchasePrice - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment = (principal * monthlyInterestRate) / (1 - (Math.pow(1/(1 + monthlyInterestRate), numberOfPayments)));
    const totalMonthlyPayment = monthlyPayment + (propertyTax/12) + homeownersInsurance + pmi + hoaFees;

    const resultsElement = document.getElementById("results");

    resultsElement.innerHTML = `
        <h2 class="rSize">Monthly<br>Payment</h2>
        <h2 class="rSize">$${totalMonthlyPayment.toFixed(2)}</h2>
        <p style="font-size: 10px;">(Including Optional Expenses)</p>
    `;

    // Update the chart data
    chart.data.datasets[0].data = [monthlyPayment, propertyTax/12, homeownersInsurance, pmi, hoaFees];
    chart.update();
}

// Calculate and display the default values on page load
window.addEventListener("load", function() {
    calculateMortgage();
});

