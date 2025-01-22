const Field = require("../model/ProductSchema");

const updateController = async (req, res) => {
  const { id } = req.params;

  try {
    const updateData = req.body;

    const updatedField = await Field.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } 
    );

    if (!updatedField) {
      return res.status(404).json({ message: "field not found" });
    }

    res.status(200).json({ field: updatedField });
  } catch (error) {
    console.error("Error updating field: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateController;
