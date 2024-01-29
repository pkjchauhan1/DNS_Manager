import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

const uData = [0, 0, 0, 0, 0, 0];
const pData = [];
const tempLabel = [];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

function StackedBarChart() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: "pv", id: "pvId", stack: "total" },
        { data: uData, label: "uv", id: "uvId", stack: "total" },
      ]}
      xAxis={[{ data: tempLabel, scaleType: "band" }]}
    />
  );
}

function Test() {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);

  const fetchDNSData = () => {
    axios
      .get("http://localhost:3001/api/records/test")
      .then((res) => {
        console.log(res.data.data.result);
        let tempData = res.data.data.result;
        let num_A = 0;
        let num_AAAA = 0;
        let num_CAA = 0;
        let num_CNAME = 0;
        let num_MX = 0;
        let num_TXT = 0;

        for (let index = 0; index < tempData.length; index++) {
          if (!tempLabel.includes(tempData[index].type)) {
            tempLabel.push(tempData[index].type);
          }
          if (tempData[index].type == "A") {
            num_A++;
          }
          if (tempData[index].type == "AAAA") {
            num_AAAA++;
          }
          if (tempData[index].type == "CAA") {
            num_CAA++;
          }
          if (tempData[index].type == "CNAME") {
            num_CNAME++;
          }
          if (tempData[index].type == "MX") {
            num_MX++;
          }
          if (tempData[index].type == "TXT") {
            num_TXT++;
          }
        }

        uData[0] = num_A;
        uData[1] = num_AAAA;
        uData[2] = num_CAA;
        uData[3] = num_CNAME;
        uData[4] = num_MX;
        uData[5] = num_TXT;

        setData(res.data.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inputHandler = (e) => {
    let object = {};
    object[e.target.name] = e.target.value;
    setForm({ ...form, ...object });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/records/add", form)
      .then(() => {
        alert("success");
        fetchDNSData();
      })
      .catch((error) => {
        alert(error.message);
      });
    console.log(form);
  };

  useEffect(() => {
    fetchDNSData();
  }, []);

  return (
    <div>
      <h1>DNS Add</h1>

      <div class="container text-center">
        <div class="row">
          <div class="col">
            {" "}
            <form>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  onChange={inputHandler}
                  value={form?.type}
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="A, AAAA, MX"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={inputHandler}
                  value={form?.name}
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Content
                </label>
                <input
                  type="text"
                  name="content"
                  onChange={inputHandler}
                  value={form?.content}
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="192.168.1.1"
                />
              </div>
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="container">
            <div className="row">
              <div cobjectlassName="col-6">
                <StackedBarChart />
              </div>
            </div>
          </div>
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">Content</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((el) => {
                  return (
                    <tr>
                      <th scope="row">{el.type}</th>
                      <td>{el.name.split(".")[0]}</td>
                      <td>{el.content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
