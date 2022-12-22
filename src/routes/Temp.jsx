import React from "react";
import { TbTemperatureCelsius } from "react-icons/tb";

const Temp = ({ temp, page }) => {
  if (page == "MyPage") {
    return (
      <div>
        <div className="mt-5 w-96">
          <div className="flex font-bold items-center justify-between">
            <span
              style={{
                fontSize: "1.1rem",
              }}
            >
              {" "}
              매너온도
            </span>
            {temp <= "20" ? (
              <div
                className="flex items-center"
                style={{
                  color: "black",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp > "20" && temp <= "32" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#7f22d7",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp > "32" && temp < "40" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#45a0f4",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp >= "40" && temp < "50" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#29cf71",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp >= "50" && temp < "60" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#efb609",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp >= "60" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#fc717c",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {/* 20이하 검정색 */}
            {temp <= "20" ? (
              <progress
                className="progress  w-96"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
            {/* 21~32 남색 */}
            {temp > "20" && temp <= "32" ? (
              <progress
                className="progress progress-primary  w-96"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
            {/* 33~39 파랑 */}
            {temp > "32" && temp < "40" ? (
              <progress
                className="progress progress-info w-96"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
            {/* 40~49 초록 */}
            {temp >= "40" && temp < "50" ? (
              <progress
                className="progress progress-success w-96 "
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}{" "}
            {/* 50~59 노랑 */}
            {temp >= "50" && temp < "60" ? (
              <progress
                className="progress progress-warning w-96"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}{" "}
            {/* 60 이상 */}
            {temp >= "60" ? (
              <progress
                className="progress progress-error  w-96"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="mt-5 w-52">
          <div className="flex font-bold items-center justify-end">
            {temp <= "20" ? (
              <div
                className="flex items-center"
                style={{
                  color: "black",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp > "20" && temp <= "32" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#7f22d7",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp > "32" && temp < "40" ? (
              <div
                className="flex items-center justify-end w-52"
                style={{
                  color: "#45a0f4",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp > "40" && temp < "50" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#29cf71",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp >= "50" && temp < "60" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#efb609",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {temp >= "60" ? (
              <div
                className="flex items-center"
                style={{
                  color: "#fc717c",
                }}
              >
                {" "}
                {temp}{" "}
                <TbTemperatureCelsius
                  style={{
                    fontSize: "1.2rem",
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {/* 20이하 검정색 */}
            {temp <= "20" ? (
              <progress
                className="progress  w-52"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
            {/* 21~32 남색 */}
            {temp > "20" && temp <= "32" ? (
              <progress
                className="progress progress-primary w-52"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
            {/* 33~39 파랑 */}
            {temp > "32" && temp < "40" ? (
              <progress
                className="progress progress-info w-52"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
            {/* 40~49 초록 */}
            {temp > "40" && temp < "50" ? (
              <progress
                className="progress progress-success w-52 "
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}{" "}
            {/* 50~59 노랑 */}
            {temp >= "50" && temp < "60" ? (
              <progress
                className="progress progress-warning w-52"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}{" "}
            {/* 60 이상 */}
            {temp >= "60" ? (
              <progress
                className="progress progress-error  w-52"
                value={temp}
                max="100"
              ></progress>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Temp;
