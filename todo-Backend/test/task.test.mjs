import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
import Task from "../models/Task";

const should = chai.should();

chai.use(chaiHttp);

describe("Tasks", () => {
  describe("/GET tasks", () => {
    it("it should GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST task", () => {
    it("it should POST a new task", (done) => {
      let task = {
        assignedTo: "Rahul Verma",
        status: "Not Started",
        dueDate: "2024-08-15",
        priority: "High",
        comments: ["Task created for testing"],
      };
      chai
        .request(server)
        .post("/api/tasks")
        .send(task)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("assignedTo").eql(task.assignedTo);
          res.body.should.have.property("status").eql(task.status);
          done();
        });
    });
  });

  describe("/PUT/:id task", () => {
    it("it should UPDATE a task given the id", (done) => {
      let task = new Task({
        assignedTo: "Rahul Verma",
        status: "In Progress",
        dueDate: "2024-08-15",
        priority: "Medium",
        comments: ["Updating task"],
      });
      task.save((err, task) => {
        chai
          .request(server)
          .put("/api/tasks/" + task.id)
          .send({
            assignedTo: "Rahul Verma Updated",
            status: "Completed",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql("Completed");
            done();
          });
      });
    });
  });

  describe("/DELETE/:id task", () => {
    it("it should DELETE a task given the id", (done) => {
      let task = new Task({
        assignedTo: "Rahul Verma",
        status: "Not Started",
        dueDate: "2024-08-15",
        priority: "High",
        comments: ["Deleting task"],
      });
      task.save((err, task) => {
        chai
          .request(server)
          .delete("/api/tasks/" + task.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Task successfully deleted");
            done();
          });
      });
    });
  });
});
