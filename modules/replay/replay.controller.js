const {isValidObjectId} = require("mongoose");
const replayModel = require("./Replay.model");
const commentModel = require("./../comment/Comment.model");

exports.create = async (req, res) => {
    try {
        const {body} = req.body;
        const {id} = req.params;
        const {user} = req;

        const isValidCommentID = isValidObjectId(id);
        if (!isValidCommentID) return res.status(422).json({message: "invalid comment ID"});

        const comment = await commentModel.findOne({_id: id});
        if (!comment) return res.status(404).json({message: "comment not found"});

        const replay = await replayModel.create({
            body,
            course: comment.course,
            creator: user._id,
        });

        await commentModel.findOneAndUpdate({
            _id: id,
        }, {
            $push: {
                replays: replay._id,
            }
        });

        return res.status(201).json({
            message: "replay created successfully",
        });

    } catch (err) {
        console.log(`replay controller, create error => ${err}`);
        return res.status(500).json(err);
    }
};