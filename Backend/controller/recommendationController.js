const recommendProductsController = (EventModel, ProductModel) => {
    return async (req, res) => {
      try {
        const { userId } = req.params;
  
        if (!userId) {
          return res.status(400).json({
            message: "User ID is required to fetch recommendations.",
          });
        }
  
        const recentEvents = await EventModel.find({ userId })
          .sort({ timestamp: -1 })
          .limit(10); 
  
        if (recentEvents.length === 0) {
          return res.status(404).json({
            message: "No events found for the user.",
          });
        }
  
        const preferences = recentEvents.reduce((acc, event) => {
          if (event.eventData.category) {
            acc[event.eventData.category] = (acc[event.eventData.category] || 0) + 1;
          }
          return acc;
        }, {});
  
        const preferredCategories = Object.keys(preferences).sort(
          (a, b) => preferences[b] - preferences[a]
        );
  
        if (preferences.length === 0) {
          return res.status(404).json({
            message: "No preferences found for the user.",
          });
        }
  
        const recommendedProducts = await ProductModel.find({
          category: { $in: preferredCategories },
        }).limit(5); 
  
        res.status(200).json({
          message: "Recommendations fetched successfully.",
          recommendations: recommendedProducts,
        });
      } catch (error) {
        console.error("Error in recommendProductsController:", error);
        res.status(500).json({ message: error.message });
      }
    };
  };
  
  module.exports = recommendProductsController;
  