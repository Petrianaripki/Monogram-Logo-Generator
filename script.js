function generateLogo() {
  const canvas = document.getElementById('logoCanvas');
  const ctx = canvas.getContext('2d');

  const initials = document.getElementById('initials').value.toUpperCase();
  const fullName = document.getElementById('fullname').value;
  const fontStyle = document.getElementById('font').value;
  const isStacked = document.getElementById('stacked').checked;

  const colorType = document.getElementById('colorType').value;
  const solidColor = document.getElementById('colorSolid').value;
  const gradientStart = document.getElementById('gradientStart').value;
  const gradientEnd = document.getElementById('gradientEnd').value;
  const gradientDirection = document.getElementById('gradientDirection').value;

  const logoSize = document.getElementById('logoSize').value;
  const shape = document.getElementById('shape').value;
  const spacing = parseInt(document.getElementById('spacing').value);

  // Ukuran font berdasarkan pilihan
  let fontSize;
  if (logoSize === 'small') fontSize = 80;
  else if (logoSize === 'large') fontSize = 160;
  else fontSize = 120; // default medium

  // Background putih
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Bentuk: bulat, rounded, atau kotak
  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    ctx.clip();
  } else if (shape === "rounded") {
    const radius = 60;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(canvas.width - radius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    ctx.lineTo(canvas.width, canvas.height - radius);
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
    ctx.lineTo(radius, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();
  }

  // Warna tulisan
  let fillStyle = solidColor;
  if (colorType === "gradient") {
    let x0 = 0, y0 = 0, x1 = 0, y1 = 0;
    if (gradientDirection === "horizontal") {
      x1 = canvas.width;
    } else if (gradientDirection === "vertical") {
      y1 = canvas.height;
    } else if (gradientDirection === "diagonal") {
      x1 = canvas.width;
      y1 = canvas.height;
    }
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);
    fillStyle = gradient;
  }

  ctx.fillStyle = fillStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  if (isStacked) {
    const offset = -30;
    for (let i = 0; i < initials.length; i++) {
      ctx.font = `bold ${fontSize}px ${fontStyle}`;
      ctx.fillText(initials[i], centerX + offset * i, centerY + offset * i - spacing);
    }
  } else {
    ctx.font = `bold ${fontSize}px ${fontStyle}`;
    ctx.fillText(initials, centerX, centerY - spacing);
  }

  if (fullName.trim() !== "") {
    ctx.font = `bold 28px ${fontStyle}`;
    ctx.fillText(fullName, centerX, centerY + fontSize / 2 + spacing / 2);
  }

  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = canvas.toDataURL("image/png");
}

function resetForm() {
  document.getElementById('initials').value = '';
  document.getElementById('fullname').value = '';
  document.getElementById('font').selectedIndex = 0;
  document.getElementById('stacked').checked = false;
  document.getElementById('colorType').value = 'solid';
  document.getElementById('colorSolid').value = '#000000';
  document.getElementById('gradientStart').value = '#FFD700';
  document.getElementById('gradientEnd').value = '#FFA500';
  document.getElementById('gradientDirection').value = 'horizontal';
  document.getElementById('logoSize').value = 'medium';
  document.getElementById('shape').value = 'square';
  document.getElementById('spacing').value = 20;

  document.getElementById('solidColorGroup').style.display = 'block';
  document.getElementById('gradientColorGroup').style.display = 'none';

  generateLogo();
}

document.addEventListener('DOMContentLoaded', function () {
  const inputs = [
    'initials', 'fullname', 'font', 'stacked',
    'colorType', 'colorSolid',
    'gradientStart', 'gradientEnd', 'gradientDirection',
    'logoSize', 'shape', 'spacing'
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', generateLogo);
    el.addEventListener('change', generateLogo);
  });

  document.getElementById('colorType').addEventListener('change', function () {
    const isGradient = this.value === 'gradient';
    document.getElementById('solidColorGroup').style.display = isGradient ? 'none' : 'block';
    document.getElementById('gradientColorGroup').style.display = isGradient ? 'block' : 'none';
    generateLogo();
  });

  document.getElementById('resetBtn').addEventListener('click', resetForm);

  generateLogo();
});
