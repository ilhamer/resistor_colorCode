// Manipulation elemnt 
const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white", "gold", "silver"];
const elementsToRemove = ["black", "orange", "yellow"];

const band1And2Colors = colors.slice(0, 10);
const bandMultiplierColors = colors;
const filteredColors = colors.filter(color => !elementsToRemove.includes(color));
const bandToleranceColors = filteredColors


function populateSelectOptions(selectId, colorArray) {
  const select = document.getElementById(selectId);
  colorArray.forEach(color => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    select.appendChild(option);
  });

  // Tambahkan event listener untuk menghubungkan pemilihan warna pada band 1, band 2, band multiplier, dan band tolerance
  select.addEventListener('change', function () {
    const selectedColor = this.value;
    switch (selectId) {
      case 'band-1':
        document.querySelector('.band1').style.backgroundColor = selectedColor;
        break;
      case 'band-2':
        document.querySelector('.band2').style.backgroundColor = selectedColor;
        break;
      case 'band-multiplier':
        document.querySelector('.band3').style.backgroundColor = selectedColor;
        break;
      case 'band-tolerance':
        document.querySelector('.band4').style.backgroundColor = selectedColor;
        break;
      default:
        break;
    }
  });
}

const selectColorArrays = {
  "band-1": band1And2Colors,
  "band-2": band1And2Colors,
  "band-multiplier": bandMultiplierColors,
  "band-tolerance": bandToleranceColors
};



Object.keys(selectColorArrays).forEach(id => {
  populateSelectOptions(id, selectColorArrays[id]);
});
// Daftar nilai resistor berdasarkan kode warna
const colorCodes = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
  gold: -1, // -1 untuk band multiplier gold (x0.1)
  silver: -2, // -2 untuk band multiplier silver (x0.01)
};

const collorCodeTolorerance = {
  white: 10,
  gold: 5,
  brown: 1,
  red: 2,
  green: 0.5,
  blue: 0.25,
  violet: 0.1,
  grey: 0.05,
  silver: 10
}

function calculateResistor() {
  const band1Color = document.getElementById('band-1').value;
  const band2Color = document.getElementById('band-2').value;
  const bandMultiplierColor = document.getElementById('band-multiplier').value;
  const bandToleranceColor = document.getElementById('band-tolerance').value;

  const band1Value = colorCodes[band1Color];
  const band2Value = colorCodes[band2Color];
  const bandMultiplierValue = colorCodes[bandMultiplierColor];
  const bandToleranceValue = collorCodeTolorerance[bandToleranceColor];

  // Periksa apakah semua band memiliki nilai yang valid (tidak ada yang tidak dipilih)
  if (band1Value === undefined || band2Value === undefined || bandMultiplierValue === undefined) {
    document.getElementById('result').innerText = 'Please select all bands.';
    return;
  }


  // Lakukan perhitungan nilai resistor sesuai aturan perhitungan gelang resistor
  const resistance = (band1Value * 10 + band2Value) * Math.pow(10, bandMultiplierValue);

  // Tampilkan hasil perhitungan di HTML
  document.getElementById('result').innerText = `The resistor value is ${resistance} ohms with a tolerance of ${bandToleranceValue}%`;
}

const clickCalculate = document.querySelector('.calculate')
clickCalculate.addEventListener('click', calculateResistor)

