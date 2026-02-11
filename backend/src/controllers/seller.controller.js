import productModel from "../models/product.model.js"; // import your Product model
import sellerModel from "../models/seller.model.js";

class SellerController {
  getCookieConfig = () => {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieDomain =
      process.env.COOKIE_DOMAIN ||
      (process.env.FRONTEND_URL
        ? new URL(process.env.FRONTEND_URL).hostname
        : undefined);

    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      ...(isProduction && cookieDomain && { domain: cookieDomain }),
    };
  };

  register = async (req, res) => {
    try {
      const { name, email, password, phone, address, contactName } = req.body;

      if (!name || !email || !password || !phone || !address || !contactName) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingSeller = await sellerModel.findOne({ email });
      if (existingSeller) {
        return res
          .status(400)
          .json({ message: "Food partner account already exists" });
      }

      const seller = await sellerModel.create({
        name,
        email,
        password,
        phone,
        address,
        contactName,
      });

      const token = seller.generateToken("7d");

      res.cookie("sellerToken", token, this.getCookieConfig());

      res.status(201).json({
        message: "Food partner registered successfully",
        seller: {
          _id: seller._id,
          name: seller.name,
          email: seller.email,
          phone: seller.phone,
          address: seller.address,
          contactName: seller.contactName,
        },
        token,
      });
    } catch (error) {
      console.error("Error in registerSeller ==>", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const seller = await sellerModel.findOne({ email });
      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }

      const isValidPassword = await seller.comparePass(password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = seller.generateToken("7d");

      res.cookie("sellerToken", token, this.getCookieConfig());

      return res.status(200).json({
        message: "Seller logged in successfully",
        seller: {
          _id: seller._id,
          name: seller.name,
          email: seller.email,
          phone: seller.phone,
          address: seller.address,
          contactName: seller.contactName,
        },
        token,
      });
    } catch (error) {
      console.error("Error in loginSeller ==>", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  logout = (req, res) => {
    const baseConfig = this.getCookieConfig();
    res.clearCookie("sellerToken", baseConfig);
    res.clearCookie("token", { ...baseConfig, path: "/" });
    return res.status(200).json({ message: "Logout successful" });
  };

  products = async (req, res) => {
    try {
      const { id } = req.params;
      const products = await productModel.find({ user_id: id });

      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for this seller" });
      }

      return res
        .status(200)
        .json({ message: "Products fetched successfully", products });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  verify = async (req, res) => {
    try {
      const seller = req.seller;
      if (!seller) return res.status(401).json({ message: "Not authenticated" });

      return res.status(200).json({
        message: "Seller session valid",
        seller: {
          _id: seller._id,
          name: seller.name,
          email: seller.email,
          phone: seller.phone,
          address: seller.address,
          contactName: seller.contactName,
        },
      });
    } catch (err) {
      console.error("Error in verifySeller:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

const sellerController = new SellerController();

export const registerSeller = sellerController.register;
export const loginSeller = sellerController.login;
export const logoutSeller = sellerController.logout;
export const sellerProducts = sellerController.products;
export const verifySeller = sellerController.verify;
