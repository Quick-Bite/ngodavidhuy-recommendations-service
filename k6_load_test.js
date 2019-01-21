import http from "k6/http";
import { check } from "k6";

const getInt = (start, stop) => (Math.floor((Math.random() * (stop - start) + start)));

const bias = () => Math.random() < 0.9;

const id = (bias()) ? getInt(9999000, 10000000) : getInt(1, 10000000);

export let options = {
  vus: 150,
  duration: "300s"
};

export default function() {
  let res = http.get(`http://localhost:3005/restaurants/${id()}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
  });
};