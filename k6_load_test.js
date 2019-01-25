import http from "k6/http";
import { check } from "k6";

const getInt = (start, stop) => {
  return Math.floor((Math.random() * (stop - start) + start));
}

const bias = () => Math.random() < 0.6;

const id = () => {
  return (bias()) ? getInt(9999000, 10000000) : getInt(1, 10000000);
}

export let options = {
  vus: 50,
  duration: "300s"
};

export default function() {
  let res = http.get(`http://localhost:3005/restaurants/${id()}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
  });
};