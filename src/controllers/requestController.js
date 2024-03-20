const Request = require("../models/request");

const createRequest = async (req, res) => {
    const request = new Request(req.body);
    try {
        const savedRequest = await request.save();
        res.status(200).json(savedRequest);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createRequest,
    getRequest,
    getAllRequests,
};

