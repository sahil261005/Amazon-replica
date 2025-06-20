import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2095) === "20.95") {
  console.log('Test passed: formatCurrency(2095) returns "20.95"');
} else {
  console.log("failed");
}

if (formatCurrency(2000.5) === "20.01") {
  console.log('Test passed: formatCurrency(2000.5) returns "20.01"');
} else {
  console.log('Test failed: formatCurrency(2000.5) did not return "20.01"');
}
