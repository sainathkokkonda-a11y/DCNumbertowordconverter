const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function inWordsIndian(num) {
  if ((num = num.toString()).length > 9) return 'Number too large';
  let n = ('000000000' + num).substr(-9);
  let match = n.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!match) return '';
  let str = '';
  str += (Number(match[1]) !== 0) ? (a[Number(match[1])] || b[match[1][0]] + ' ' + a[match[1][1]]) + ' Crore ' : '';
  str += (Number(match[2]) !== 0) ? (a[Number(match[2])] || b[match[2][0]] + ' ' + a[match[2][1]]) + ' Lakh ' : '';
  str += (Number(match[3]) !== 0) ? (a[Number(match[3])] || b[match[3][0]] + ' ' + a[match[3][1]]) + ' Thousand ' : '';
  str += (Number(match[4]) !== 0) ? (a[Number(match[4])] || b[match[4][0]] + ' ' + a[match[4][1]]) + ' Hundred ' : '';
  str += (Number(match[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(match[5])] || b[match[5][0]] + ' ' + a[match[5][1]]) : '';
  return str.trim();
}

function inWordsInternational(num) {
  if (num === 0) return 'Zero';
  const units = ['', 'Thousand', 'Million', 'Billion'];
  let str = '';
  let unitIdx = 0;

  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      let chunkStr = '';
      let h = Math.floor(chunk / 100);
      let r = chunk % 100;

      if (h > 0) chunkStr += a[h] + ' Hundred ';
      if (r > 0) {
        if (r < 20) chunkStr += a[r] + ' ';
        else chunkStr += b[Math.floor(r / 10)] + ' ' + a[r % 10] + ' ';
      }
      str = chunkStr.trim() + ' ' + units[unitIdx] + ' ' + str;
    }
    num = Math.floor(num / 1000);
    unitIdx++;
  }
  return str.trim();
}

function convertNumber() {
  const numVal = document.getElementById('numberInput').value.trim();
  const format = document.getElementById('formatSelect').value;
  const output = document.getElementById('resultOutput');

  if (!numVal) {
    output.innerText = "Enter a number above to see the output...";
    return;
  }

  const num = parseInt(numVal, 10);
  if (isNaN(num) || num < 0) {
    output.innerText = "Please enter a valid positive number.";
    return;
  }

  if (num === 0) {
    output.innerText = "Zero Only";
    return;
  }

  let result = '';
  if (format === 'indian') {
    result = inWordsIndian(num);
  } else {
    result = inWordsInternational(num);
  }

  output.innerText = result ? result + " Only" : "Number too large";
}

function clearAll() {
  document.getElementById('numberInput').value = '';
  document.getElementById('resultOutput').innerText = "Enter a number above to see the output...";
}

function copyResult() {
  const text = document.getElementById('resultOutput').innerText;
  if (text.includes("Enter a number") || text.includes("valid")) return;
  navigator.clipboard.writeText(text).then(() => {
    alert("Words copied to clipboard!");
  });
}
