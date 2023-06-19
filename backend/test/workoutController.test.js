// Import the chai library (which provides functions for assertions)
import chai from 'chai';
// Import the chai-http plugin (which provides functions for making HTTP requests in tests)
import chaiHttp from 'chai-http';
// Import the server app (so we can make requests to it)
import app from '../server.js';
// Import the Workout model (so we can interact with the database)
import Workout from '../models/workoutModel.js';
// Specify the assertion style to 'should' (chai provides three styles out of the box: should, expect, and assert)
chai.should();
// Use the chai-http plugin (it enables us to easily make HTTP requests)
chai.use(chaiHttp);

import dbConnect from '../dbConnect.js';

import mongoose from 'mongoose';

// describe() is a way to group our tests in Mocha. We can nest our tests in "suites" to keep them organized.
describe('Workout API', () => {

    beforeEach((done) => {
        dbConnect().then(() => done());
    });


    // Nested describe() for GET /api/workouts endpoint
    describe("GET /api/workouts", () => {
        // it() is used for an individual test case. This is where we do our testing.
        it("It should GET all the workouts", (done) => {
            // chai.request() is a method to make requests to our app
            chai.request(app)
                // We specify the HTTP verb and the path.
                .get("/api/workouts")
                // After sending the request, we use end() to make sure all the responses are back before doing assertions.
                .end((err, response) => {
                    // We expect the status code to be 200
                    response.should.have.status(200);
                    // We expect the response body to be an array
                    response.body.should.be.a('array');
                    // We indicate the end of this test spec by calling done() (helpful in asynchronous tests)
                    done();
                });
        });
    });

    // #1 In the first test, we create a new workout, save it to the database, and then try to retrieve it by its ID. We check that the status code of the response is 200 (OK), that the response body is an object, and that the workout details match what we initially saved.
    // Describe block for GET /api/workouts/:id endpoint tests
    describe("GET /api/workouts/:id", () => {
        // Test for successful GET by ID
        it("It should GET a workout by ID", (done) => {
            // Create a new workout object
            const workout = new Workout({ title: 'Test Workout', load: 100, reps: 10 });
            
            // Save the workout to the database
            workout.save().then((workout) => {
                // Make a request to the server to retrieve the workout by ID
                chai.request(app)
                    .get("/api/workouts/" + workout.id)
                    .end((err, response) => {
                        // Check that the server responded with status 200 (OK)
                        response.should.have.status(200);
                        // Check that the response body is an object (the workout data)
                        response.body.should.be.a('object');
                        // Check that the response body has a 'title' property
                        response.body.should.have.property('title');
                        // Check that the response body has a 'load' property
                        response.body.should.have.property('load');
                        // Check that the response body has a 'reps' property
                        response.body.should.have.property('reps');
                        // Check that the '_id' property of the response body is equal to the ID of the workout we saved
                        response.body.should.have.property('_id').eql(workout.id);
                        // Call the 'done' callback to signal the end of the test
                        done();
                    });
            });
        });

        // #2 In the second test, we try to retrieve a workout using an ID that we know does not correspond to any workout in the database. We check that the status code of the response is 404 (Not Found) and that the error message is as expected.
        // Test for unsuccessful GET by ID
        it("It should NOT GET a workout by ID", (done) => {
            // Generate a new MongoDB ID that we know doesn't correspond to any workout in the database
            const id = new mongoose.Types.ObjectId();
            
            // Make a request to the server to retrieve a workout by this ID
            chai.request(app)
                .get("/api/workouts/" + id)
                .end((err, response) => {
                    // Check that the server responded with status 404 (Not Found)
                    response.should.have.status(404);
                    // Check that the response body is an object (the error message)
                    response.body.should.be.a('object');
                    // Check that the 'message' property of the response body is 'Workout not found!'
                    response.body.should.have.property('message').eql('Workout not found!');
                    // Call the 'done' callback to signal the end of the test
                    done();
                });
        });
    });
});



    
