import AddToCardModel from "../models/addTocord.model.js";
import ProductModel from "../models/product.model.js";

// Create or increment an item in user's cart
export const addToCart = async (req, res) => {
  try {
    const user = req.user; // set by auth middleware
    const { productId, quantity = 1 } = req.body;

    if (!productId) return res.status(400).json({ message: "productId required" });

    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // try find existing cart item for this user+product
    let cartItem = await AddToCardModel.findOne({ user: user._id, product: productId });
    if (cartItem) {
      cartItem.quantity = (cartItem.quantity || 0) + Number(quantity);
      cartItem.total = cartItem.quantity * (product.price || 0);
      await cartItem.save();
      return res.status(200).json(cartItem);
    }

    const priceObj = { amount: product.price || 0, currency: product.currency || "INR" };
    const total = Number(quantity) * (priceObj.amount || 0);

    cartItem = new AddToCardModel({ user: user._id, product: productId, quantity, price: priceObj, total });
    await cartItem.save();
    return res.status(201).json(cartItem);
  } catch (error) {
    console.error("addToCart error", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all cart items for current user
export const getCart = async (req, res) => {
  try {
    const user = req.user;
    const items = await AddToCardModel.find({ user: user._id }).populate("product");
    return res.status(200).json(items);
  } catch (error) {
    console.error("getCart error", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a cart item (quantity)
export const updateCartItem = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) return res.status(400).json({ message: "Invalid quantity" });

    const item = await AddToCardModel.findById(id).populate("product");
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    if (String(item.user) !== String(user._id)) return res.status(403).json({ message: "Not allowed" });

    item.quantity = Number(quantity);
    item.total = item.quantity * (item.product.price || 0);
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.error("updateCartItem error", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a cart item
export const deleteCartItem = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const item = await AddToCardModel.findById(id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    if (String(item.user) !== String(user._id)) return res.status(403).json({ message: "Not allowed" });

    await item.remove();
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("deleteCartItem error", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default { addToCart, getCart, updateCartItem, deleteCartItem };
