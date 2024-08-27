const KEY = "97dbdbd1d3dcda5c52e36129";
const inp = document.querySelector(".form-control");
const form = document.forms[0];
const lists = document.querySelectorAll(".form-select");
const footer = document.querySelector("footer");
let currencyList = ["USD", "EGP", "EUR", "JPY", "BRL", "CNY", "INR"];
const getData = async (
  from = currencyList[0],
  to = currencyList[0],
  amount = 1
) => {
  let api = `https://v6.exchangerate-api.com/v6/${KEY}/pair/${from}/${to}/${amount}`;
  let res = await fetch(api).then((res) => res.json());
  return res;
};
form.onsubmit = async (e) => {
  e.preventDefault();
  let data = await getData(lists[0].value, lists[1].value, inp.value);
  console.log(data);
  footer.innerHTML = data.conversion_result
    ? data.conversion_result.toFixed(2) + " " + data.target_code
    : data.conversion_rate.toFixed(2) + " " + data.target_code;
};
// console.log(res);
window.onload = () => {
  lists.forEach((list) => {
    for (curr in currencyList) {
      let opt = document.createElement("option");
      opt.value = currencyList[curr];
      let optText = document.createTextNode(currencyList[curr]);
      opt.appendChild(optText);
      list.appendChild(opt);
    }
  });
};
