import chai, { expect, use } from "chai";
import moment from "moment-timezone";
import { response, request } from "express";
import chaiHttp from "chai-http";
import app from "../server.js";

chai.use(chaiHttp);

describe("Testing /user endpoint", async () => {
  let inputData = {
    email: "ggsuha@gmail.com",
    firstName: "Suhadak",
    lastName: "Akbar",
    birthDate: moment().subtract(20, "years").toDate(),
    cityId: 1,
  };

  describe("POST /", () => {
    it("send empty body - should throw invalid argument error validation", async () => {
      chai
        .request(app)
        .post("/user")
        .then(() => {
          throw new Error("⚠️ Unexpected success!");
        })
        .catch((err) => {
          expect(res).to.have.status(422);
        });
    });

    it("send valid body - should create user successfully", async () => {
      chai
        .request(app)
        .post("/user")
        .send(inputData)
        .then(() => {
          expect(res).to.have.status(201);
        })
        .catch((err) => {
          throw new Error("⚠️ Unexpected success!");
        });
    });

    it("send existing email - should throw invalid argument error validation", async () => {
      chai
        .request(app)
        .post("/user")
        .send(inputData)
        .then(() => {
          throw new Error("⚠️ Unexpected success!");
        })
        .catch((err) => {
          expect(res).to.have.status(422);
        });
    });
  });

  describe("PUT /", () => {
    inputData.lastName = "Budi";

    it("send empty body - should throw invalid argument error validation", async () => {
      chai
        .request(app)
        .put("/user" + 1) //1 is user ID, since we reset database at every beginning of test
        .then(() => {
          throw new Error("⚠️ Unexpected success!");
        })
        .catch((err) => {
          expect(res).to.have.status(422);
        });
    });

    it("send valid body - should update user detail successfully", async () => {
      chai
        .request(app)
        .put("/user")
        .send(inputData)
        .then(() => {
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw new Error("⚠️ Unexpected success!");
        });
    });
  });

  describe("DELETE /", () => {
    inputData.lastName = "Budi";

    it("wrong ID - should throw invalid argument error validation", async () => {
      chai
        .request(app)
        .delete("/user" + 2) //1 is user ID, since we reset database at every beginning of test
        .then(() => {
          throw new Error("⚠️ Unexpected success!");
        })
        .catch((err) => {
          expect(res).to.have.status(422);
        });
    });

    it("send valid ID - should delete user successfully", async () => {
      chai
        .request(app)
        .delete("/user" + 1) //1 is user ID, since we reset database at every beginning of test
        .then(() => {
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw new Error("⚠️ Unexpected success!");
        });
    });
  });
});
